import type { BunFile } from "bun";
import { z } from "zod";

export const pkfileSchema = z.object({
	$schema: z.string().optional(),
	packages: z.array(
		z.object({
			name: z.string(),
			gitUrl: z.string(),
			gitTag: z.string().optional(),
			buildCommand: z.string(),
			executablePath: z.string(),
		}),
	),
});

export type Pkfile = z.infer<typeof pkfileSchema>;

const defaultPkfileName = "Pkfile.json";

export const searchPkFile = async (
	cwd: string,
	pkfile?: string,
): Promise<BunFile> => {
	const pkfileUrl = pkfile
		? Bun.pathToFileURL(pkfile)
		: Bun.pathToFileURL(`${cwd}/${defaultPkfileName}`);

	const f = Bun.file(pkfileUrl);
	if (await f.exists()) {
		return f;
	}
	throw new Error(`${Bun.fileURLToPath(pkfileUrl)} not found`);
};

export const loadPkfile = async (f: BunFile): Promise<Pkfile> => {
	const json = await f.json();
	return pkfileSchema.parse(json);
};
