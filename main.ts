import { cli } from "./src/cli.ts";

const main = async () => {
	cli(Bun.argv).parse();
};

await main();
