/**
 * Bun's console.error is not print stack trace
 */
export const formatError = (error: Error) => {
	let formatted = "";
	if (error.stack) {
		formatted += `${error.stack}`;
	}
	if (error.cause) {
		formatted += `\nCaused by: ${JSON.stringify(error.cause, undefined, 2)}`;
	}

	if (!formatted) {
		formatted += `${error.name}: ${error.message}`;
	}

	return formatted;
};

export const logError = (msg: string, error: Error) => {
	console.error(msg);
	console.error(formatError(error));
};
