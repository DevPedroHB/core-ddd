import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { CNPJ } from "./cnpj";

describe("CNPJ", () => {
	it("should be able to create a CNPJ", () => {
		const cnpjGenerated = CNPJ.generate(true);
		const cnpj = CNPJ.create(cnpjGenerated);

		expect(cnpj).toBeInstanceOf(CNPJ);
		expect(cnpj.cnpj).toBe(cnpjGenerated);
	});

	it("should not be able to create a invalid CNPJ", () => {
		expect(() => {
			CNPJ.create("an-invalid-cnpj");
		}).toThrow(InvalidCredentialsError);
	});
});
