import fs from "node:fs/promises";
import { simpleGit } from "simple-git";
import { formatError, logError } from "./error-util.ts";
import { checkExists, createDirIfNotExists } from "./file-util.ts";
import { Pkfile, loadPkfile, searchPkFile } from "./pkfile.ts";

const tmpDir = "/tmp/pk";

export const pkInstallPath = () => {
	const home = Bun.env.HOME ?? "~";
	return `${home}/.pk`;
};

const installPackage = async (pkg: Pkfile["packages"][number]) => {
	console.log(`Installing ${pkg.name}...`);

	await createDirIfNotExists(tmpDir);

	const uuid = crypto.randomUUID();
	const workdir = `${tmpDir}/${uuid}`;

	// clone repo
	console.log(`Cloning ${pkg.gitUrl}...`);
	const git = simpleGit();
	await git.clone(pkg.gitUrl, workdir);

	// build
	console.log(`Building ${pkg.name}...`);
	const p = Bun.spawnSync(pkg.buildCommand.split(" "), {
		cwd: workdir,
		stdin: Bun.stdin,
		stdout: Bun.stdout,
		stderr: Bun.stderr,
	});

	if (p.exitCode !== 0) {
		throw new Error(`Failed to build ${pkg.name}, exit code: ${p.exitCode}`);
	}

	// check executable
	const executable = `${workdir}/${pkg.executablePath}`;
	if (!(await checkExists(executable))) {
		throw new Error(`Executable not found: ${executable}`);
	}

	const installPath = pkInstallPath();
	await createDirIfNotExists(installPath);
	// copy executable
	const pkBinPath = `${installPath}/${pkg.name}`;
	console.log(`Copy executable to ${pkBinPath}...`);
	await fs.cp(executable, pkBinPath);
	console.log(`Installed ${pkg.name}`);
};

export const installPackages = async (pkfile: Pkfile) => {
	const errors: Record<string, Error> = {};
	for (const pkg of pkfile.packages) {
		await installPackage(pkg).catch((error) => {
			logError(`Failed to install ${pkg.name}`, error);
			errors[pkg.name] = error;
		});
	}
	console.log("Installation complete");
	await fs.rm(`${tmpDir}/*`, { recursive: true }).catch(() => {
		// Do nothing
	});
};

export const installHandler = async (args: { pkfile: string | undefined }) => {
	const pkfileFile = await searchPkFile(process.cwd(), args.pkfile).catch(
		(error) => {
			console.error("Failed to search Pkfile:", formatError(error));
			process.exit(1);
		},
	);

	const pkfile = await loadPkfile(pkfileFile);

	await installPackages(pkfile);
};
