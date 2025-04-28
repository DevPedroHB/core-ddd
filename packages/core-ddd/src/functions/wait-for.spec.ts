import { waitFor } from "./wait-for";

describe("waitFor", () => {
	it("should be able to resolves when assertion is successful within timeout", async () => {
		const assertions = jest.fn(() => {});

		await waitFor(assertions);

		expect(assertions).toHaveBeenCalledTimes(1);
	});

	it("should be able to rejects with error when assertion fails with timeout", async () => {
		const error = new Error("Test error");
		const assertions = jest.fn(() => {
			throw error;
		});

		await expect(waitFor(assertions)).rejects.toThrow(error);
	});

	it("should be able to resolves when assertion is successful with custom timeout and interval", async () => {
		const assertions = jest.fn(() => {});

		await waitFor(assertions, { timeout: 500, interval: 20 });

		expect(assertions).toHaveBeenCalledTimes(1);
	});

	it("should be able to rejects with error when assertion fails with custom timeout and interval", async () => {
		const error = new Error("Test error");
		const assertions = jest.fn(() => {
			throw error;
		});

		await expect(
			waitFor(assertions, { timeout: 500, interval: 20 }),
		).rejects.toThrow(error);
	});

	it("should be able to handles assertion function that returns a Promise", async () => {
		const assertions = jest.fn(() => Promise.resolve());

		await waitFor(assertions);

		expect(assertions).toHaveBeenCalledTimes(1);
	});

	it("should be able to handles assertion function that throws an error synchronously", async () => {
		const error = new Error("Test error");
		const assertions = jest.fn(() => {
			throw error;
		});

		await expect(waitFor(assertions)).rejects.toThrow(error);
	});

	it("should be able to handles assertion function that throws an error asynchronously", async () => {
		const error = new Error("Test error");
		const assertions = jest.fn(() => Promise.reject(error));

		await expect(waitFor(assertions)).rejects.toThrow(error);
	});
});
