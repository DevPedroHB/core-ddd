import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { CUID } from "./cuid";

describe("CUID", () => {
	it("should be able to create a CUID", () => {
		const cuidGenerated = CUID.generate();
		const cuid = CUID.create(cuidGenerated);

		expect(cuid).toBeInstanceOf(CUID);
		expect(CUID.isValid(cuid.cuid)).toBeTruthy();
	});

	it("should not be able to create a invalid CUID", () => {
		expect(() => {
			CUID.create("an-invalid-cuid");
		}).toThrow(InvalidCredentialsError);
	});
});
