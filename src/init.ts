import { pkInstallPath } from "./install.ts";

export const init = () => {
	const installPath = pkInstallPath();
	console.log(`export PATH=$PATH:${installPath}`);
};
