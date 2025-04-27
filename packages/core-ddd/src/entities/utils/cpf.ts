import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";

/**
 * Value Object para CPF (Cadastro de Pessoa Física).
 * Encapsula a lógica de limpeza, formatação, validação e geração de CPFs.
 */
export class CPF {
	/**
	 * Valor do CPF formatado no padrão ###.###.###-##.
	 */
	public readonly cpf: string;

	/**
	 * Construtor privado que valida e formata o CPF informado.
	 *
	 * @param {string} cpf - CPF em formato bruto ou já formatado.
	 * @throws {InvalidCredentialsError} Caso o CPF seja inválido após validação.
	 */
	private constructor(cpf: string) {
		const strippedCpf = CPF.strip(cpf);

		if (!CPF.isValid(strippedCpf)) {
			throw new InvalidCredentialsError("CPF fornecido é inválido.");
		}

		this.cpf = CPF.format(strippedCpf);
	}

	/**
	 * Remove todos os caracteres não numéricos do CPF.
	 *
	 * @param {string} cpf - CPF em formato bruto ou formatado.
	 * @returns {string} Sequência de 11 dígitos sem formatação.
	 */
	public static strip(cpf: string) {
		return cpf.replace(/\D+/g, "");
	}

	/**
	 * Formata uma sequência de 11 dígitos no padrão brasileiro.
	 *
	 * @param {string} cpf - Sequência de 11 dígitos.
	 * @returns {string} CPF formatado como ###.###.###-##.
	 */
	public static format(cpf: string) {
		return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
	}

	/**
	 * Verifica se um CPF é válido de acordo com regras de dígitos verificadores.
	 *
	 * @param {string} cpf - Sequência de 11 dígitos sem formatação.
	 * @returns {boolean} True se o CPF for válido, false caso contrário.
	 */
	public static isValid(cpf: string) {
		// Deve ter 11 dígitos
		if (!/^[0-9]{11}$/.test(cpf)) {
			return false;
		}

		// Não pode ser sequência de dígitos iguais
		if (/^([0-9])\1{10}$/.test(cpf)) {
			return false;
		}

		const digits = cpf.split("").map((d) => Number.parseInt(d, 10));

		/**
		 * Calcula o dígito verificador
		 *
		 * @param count - Quantidade de dígitos a considerar
		 * @param weightStart - Peso inicial para cálculo
		 */
		const calcCheck = (count: number, weightStart: number): number => {
			let sum = 0;

			for (let i = 0; i < count; i++) {
				sum += digits[i] * (weightStart - i);
			}

			const mod = sum % 11;

			return mod < 2 ? 0 : 11 - mod;
		};

		const d1 = calcCheck(9, 10);

		if (d1 !== digits[9]) {
			return false;
		}

		const d2 = calcCheck(10, 11);

		if (d2 !== digits[10]) {
			return false;
		}

		return true;
	}

	/**
	 * Gera um CPF válido aleatório.
	 *
	 * @param {boolean} [formatted=false] - Se true, retorna o CPF formatado.
	 * @returns {string} CPF gerado, formatado ou sem formatação.
	 */
	public static generate(formatted = false) {
		const randomDigits = Array.from({ length: 9 }, () =>
			Math.floor(Math.random() * 10),
		);

		const calcCheck = (digits: number[], weightStart: number): number => {
			const sum = digits.reduce(
				(acc, d, idx) => acc + d * (weightStart - idx),
				0,
			);
			const mod = sum % 11;

			return mod < 2 ? 0 : 11 - mod;
		};

		const d1 = calcCheck(randomDigits, 10);
		const d2 = calcCheck([...randomDigits, d1], 11);
		const full = [...randomDigits, d1, d2].join("");

		return formatted ? CPF.format(full) : full;
	}

	/**
	 * Cria uma instância de CPF validada.
	 *
	 * @param {string} cpf - CPF em formato bruto ou formatado.
	 * @returns {CPF} Instância contendo o CPF validado e formatado.
	 * @throws {InvalidCredentialsError} Caso o CPF seja inválido.
	 */
	public static create(cpf: string) {
		return new CPF(cpf);
	}
}
