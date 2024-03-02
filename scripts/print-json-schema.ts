import { zodToJsonSchema } from "zod-to-json-schema";
import { pkfileSchema } from "../src/pkfile.ts";

const main = async () => {
	const schema = zodToJsonSchema(pkfileSchema);

	Bun.write(Bun.stdout, JSON.stringify(schema, null, 2));
};

await main();
