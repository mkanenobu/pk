import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { initHandler } from "./init.ts";
import { installHandler } from "./install.ts";

export const cli = (argv: string[]) => {
	return yargs(hideBin(argv))
		.command(
			"install",
			"Install packages using Pkfile.json",
			(yargs) => yargs.option("pkfile", { type: "string" }),
			async (args) => {
				await installHandler(args);
			},
		)
		.command("init", "Configure shell environment", {}, () => {
			initHandler();
		})
		.demandCommand(1, "")
		.recommendCommands();
};
