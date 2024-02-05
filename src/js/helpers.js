import { TIMEOUT_SECONDS } from "./config";

async function getJSON(url) {
	const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
	const data = await response.json();

	// Handling the possible status errors
	if (!response.ok) throw new Error(`${data.message} (${response.status})`);

	return data;
}

function sleep(seconds) {
	return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

function timeout(seconds) {
	return new Promise((_, reject) =>
		setTimeout(() => reject(new Error(`Request took too long! Timeout after ${seconds} seconds`)), seconds * 1000)
	);
}

export { getJSON, sleep, timeout };
