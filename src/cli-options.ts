import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { installHandler } from "./install.ts";

export const cli = (argv: string[]) => {
	return yargs(hideBin(argv)).command(
		"install",
		"Install packages",
		(yargs) => yargs.option("pkfile", { type: "string" }),
		async (args) => {
			await installHandler(args);
		},
	);
};
