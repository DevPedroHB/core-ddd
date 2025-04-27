import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { CPF } from "./cpf";

describe("CPF", () => {
	it("should be able to create a CPF", () => {
		const cpfGenerated = CPF.generate(true);
		const cpf = CPF.create(cpfGenerated);

		expect(cpf).toBeInstanceOf(CPF);
		expect(cpf.cpf).toBe(cpfGenerated);
	});

	it("should not be able to create a invalid CPF", () => {
		expect(() => {
			CPF.create("an-invalid-cpf");
		}).toThrow(InvalidCredentialsError);
	});
});
