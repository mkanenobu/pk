import { cli } from "./src/cli-options.ts";
import { formatError } from "./src/error-util.ts";
import { installPackages } from "./src/install.ts";
import { loadPkfile, searchPkFile } from "./src/pkfile.ts";

const main = async () => {
	cli(Bun.argv).parse();
};

await main();
