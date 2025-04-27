import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { ULID } from "./ulid";

describe("ULID", () => {
	it("should be able to create a ULID", () => {
		const ulidGenerated = ULID.generate();
		const ulid = ULID.create(ulidGenerated);

		expect(ulid).toBeInstanceOf(ULID);
		expect(ULID.isValid(ulid.ulid)).toBeTruthy();
	});

	it("should not be able to create a invalid ULID", () => {
		expect(() => {
			ULID.create("an-invalid-ulid");
		}).toThrow(InvalidCredentialsError);
	});
});
