import * as fs from "node:fs/promises";

export const createDirIfNotExists = async (dir: string) => {
	if (!(await fs.exists(dir))) {
		await fs.mkdir(dir, { recursive: true });
	}
};

export const checkExists = async (path: string) => {
	return await Bun.file(path).exists();
};
