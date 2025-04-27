import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";

/**
 * Value Object para CNPJ (Cadastro Nacional de Pessoa Jurídica).
 * Encapsula a lógica de limpeza, formatação, validação e geração de CNPJs.
 */
export class CNPJ {
	/**
	 * Valor do CNPJ formatado no padrão ##.###.###/####-##.
	 */
	public readonly cnpj: string;

	/**
	 * Construtor privado que valida e formata o CNPJ informado.
	 *
	 * @param {string} cnpj - CNPJ em formato bruto ou já formatado.
	 * @throws {InvalidCredentialsError} Caso o CNPJ seja inválido após validação.
	 */
	private constructor(cnpj: string) {
		const stripped = CNPJ.strip(cnpj);

		if (!CNPJ.isValid(stripped)) {
			throw new InvalidCredentialsError("CNPJ fornecido é inválido.");
		}

		this.cnpj = CNPJ.format(stripped);
	}

	/**
	 * Remove todos os caracteres não numéricos do CNPJ.
	 *
	 * @param {string} cnpj - CNPJ em formato bruto ou formatado.
	 * @returns {string} Sequência de 14 dígitos sem formatação.
	 */
	public static strip(cnpj: string) {
		return cnpj.replace(/\D/g, "");
	}

	/**
	 * Formata uma sequência de 14 dígitos no padrão brasileiro.
	 *
	 * @param {string} cnpj - Sequência de 14 dígitos sem formatação.
	 * @returns {string} CNPJ formatado como ##.###.###/####-##.
	 */
	public static format(cnpj: string) {
		return cnpj.replace(
			/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
			"$1.$2.$3/$4-$5",
		);
	}

	/**
	 * Verifica se um CNPJ é válido de acordo com regras de dígitos verificadores.
	 *
	 * @param {string} cnpj - Sequência de 14 dígitos sem formatação.
	 * @returns {boolean} True se o CNPJ for válido, false caso contrário.
	 */
	public static isValid(cnpj: string) {
		// Deve ter 14 dígitos
		if (!/^[0-9]{14}$/.test(cnpj)) {
			return false;
		}

		// Não pode ser sequência de dígitos iguais
		if (/^(\d)\1{13}$/.test(cnpj)) {
			return false;
		}

		/**
		 * Calcula dígito verificador usando pesos específicos.
		 *
		 * @param digits - Dígitos usados no cálculo (base ou base+primeiro dígito).
		 * @param weights - Pesos aplicados a cada posição.
		 * @returns Dígito verificador calculado.
		 */
		const calcDigit = (digits: string, weights: number[]): number => {
			const sum = digits
				.split("")
				.map((d, i) => Number.parseInt(d, 10) * weights[i])
				.reduce((a, b) => a + b, 0);
			const mod = sum % 11;

			return mod < 2 ? 0 : 11 - mod;
		};

		// Base de cálculo (12 primeiros dígitos)
		const base = cnpj.substr(0, 12);
		const digit1 = calcDigit(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
		const digit2 = calcDigit(
			base + digit1,
			[6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
		);

		return cnpj.endsWith(`${digit1}${digit2}`);
	}

	/**
	 * Gera um CNPJ válido aleatório.
	 *
	 * @param {boolean} [formatted=false] - Se true, retorna o CNPJ formatado.
	 * @returns {string} CNPJ gerado, formatado ou sem formatação.
	 */
	public static generate(formatted = false) {
		// Gera 12 dígitos aleatórios
		const randomDigits = Array.from({ length: 12 }, () =>
			Math.floor(Math.random() * 10),
		).join("");

		/**
		 * Calcula dígito verificador para geração.
		 *
		 * @param digits - String de dígitos base.
		 * @param weights - Pesos para cálculo.
		 */
		const calcDigit = (digits: string, weights: number[]): number => {
			const sum = digits
				.split("")
				.map((d, i) => Number.parseInt(d, 10) * weights[i])
				.reduce((a, b) => a + b, 0);
			const mod = sum % 11;

			return mod < 2 ? 0 : 11 - mod;
		};

		const d1 = calcDigit(randomDigits, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
		const d2 = calcDigit(
			`${randomDigits}${d1}`,
			[6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
		);
		const full = `${randomDigits}${d1}${d2}`;

		return formatted ? CNPJ.format(full) : full;
	}

	/**
	 * Cria uma instância de CNPJ validada.
	 *
	 * @param {string} cnpj - CNPJ em formato bruto ou formatado.
	 * @returns {CNPJ} Instância contendo o CNPJ validado e formatado.
	 * @throws {InvalidCredentialsError} Caso o CNPJ seja inválido.
	 */
	public static create(cnpj: string) {
		return new CNPJ(cnpj);
	}
}
