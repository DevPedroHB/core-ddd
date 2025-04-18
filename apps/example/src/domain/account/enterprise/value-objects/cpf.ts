import { InvalidCredentialsError } from "@pedrohb/core-ddd";

export class CPF {
	private readonly _cpf: string;

	private constructor(cpf: string) {
		const normalizedCPF = this.normalize(cpf);

		if (
			!this.hasValidLength(normalizedCPF) ||
			this.hasAllEqualDigits(normalizedCPF)
		) {
			throw new InvalidCredentialsError(
				"CPF inválido: número de dígitos incorreto ou dígitos repetidos",
			);
		}

		if (!this.isValidCPF(normalizedCPF)) {
			throw new InvalidCredentialsError(
				"CPF inválido: dígitos verificadores não conferem",
			);
		}

		this._cpf = this.format(normalizedCPF);
	}

	get cpf() {
		return this._cpf;
	}

	private normalize(cpf: string) {
		return cpf.replace(/\D/g, "");
	}

	private hasValidLength(cpf: string) {
		return cpf.length === 11;
	}

	private hasAllEqualDigits(cpf: string) {
		return /^(\d)\1{10}$/.test(cpf);
	}

	private format(cpf: string) {
		return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
	}

	private isValidCPF(cpf: string) {
		const digits = cpf.split("").map(Number);

		const calcDigit = (factor: number, count: number): number => {
			let total = 0;

			for (let i = 0; i < count; i++) {
				total += digits[i] * factor--;
			}

			const remainder = total % 11;

			return remainder < 2 ? 0 : 11 - remainder;
		};

		const firstVerifier = calcDigit(10, 9);
		const secondVerifier = calcDigit(11, 10);

		return firstVerifier === digits[9] && secondVerifier === digits[10];
	}

	public static create(cpf: string) {
		return new CPF(cpf);
	}
}
