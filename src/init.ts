import { pkInstallPath } from "./install.ts";

export const initHandler = () => {
	const installPath = pkInstallPath();
	console.log(`export PATH=$PATH:${installPath}`);
};
