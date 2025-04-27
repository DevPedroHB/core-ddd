import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { UUID } from "./uuid";

describe("UUID", () => {
	it("should be able to create a UUID v1", () => {
		const uuid = UUID.create(UUID.generate("v1"));

		expect(uuid).toBeInstanceOf(UUID);
		expect(uuid.version).toBe(1);
	});

	it("should be able to create a UUID v3", () => {
		const namespace = UUID.generate();
		const uuid = UUID.create(UUID.generate("v3", "example.com.br", namespace));

		expect(uuid).toBeInstanceOf(UUID);
		expect(uuid.version).toBe(3);
	});

	it("should be able to create a UUID v4", () => {
		const uuid = UUID.create(UUID.generate("v4"));

		expect(uuid).toBeInstanceOf(UUID);
		expect(uuid.version).toBe(4);
	});

	it("should be able to create a UUID v5", () => {
		const namespace = UUID.generate();
		const uuid = UUID.create(UUID.generate("v5", "example.com.br", namespace));

		expect(uuid).toBeInstanceOf(UUID);
		expect(uuid.version).toBe(5);
	});

	it("should be able to create a UUID v6", () => {
		const uuid = UUID.create(UUID.generate("v6"));

		expect(uuid).toBeInstanceOf(UUID);
		expect(uuid.version).toBe(6);
	});

	it("should be able to create a UUID v7", () => {
		const uuid = UUID.create(UUID.generate("v7"));

		expect(uuid).toBeInstanceOf(UUID);
		expect(uuid.version).toBe(7);
	});

	it("should not be able to create a invalid UUID", () => {
		expect(() => {
			UUID.create("an-invalid-uuid");
		}).toThrow(InvalidCredentialsError);
	});
});
