/**
 * Opções de configuração para geração de slug.
 */
export interface SlugOptions {
	/**
	 * Caractere usado como separador entre palavras no slug.
	 *
	 * @default "-"
	 */
	separator?: string;
	/**
	 * Define se o slug deve ficar em minúsculas ou maiúsculas.
	 *
	 * @default "lower"
	 */
	case?: "lower" | "upper";
	/**
	 * Se true, converte camelCase em palavras separadas antes de slugificar.
	 *
	 * @default true
	 */
	decamelize?: boolean;
	/**
	 * Substituições personalizadas antes da normalização Unicode.
	 * Cada tupla [de, para] é aplicada sequencialmente.
	 */
	customReplacements?: ReadonlyArray<[string, string]>;
	/**
	 * Caracteres que devem ser preservados (não removidos) no slug.
	 */
	preserveCharacters?: string[];
}

/**
 * Value Object responsável por gerar e encapsular um slug a partir de uma string de entrada.
 */
export class Slug {
	/**
	 * Valor do slug gerado.
	 */
	public readonly slug: string;

	/**
	 * Construtor privado que gera o slug de acordo com as opções informadas.
	 *
	 * @param {string} input - Texto de entrada a ser convertido em slug.
	 * @param {SlugOptions} [options={}] - Opções de configuração para a geração do slug.
	 */
	private constructor(input: string, options: SlugOptions = {}) {
		this.slug = Slug.slugify(input, options);
	}

	/**
	 * Converte uma string em slug conforme as regras definidas em SlugOptions.
	 *
	 * @param {string} input - Texto de entrada a ser convertido em slug.
	 * @param {SlugOptions} [options={}] - Opções para controlar formatação, separador e caracteres preservados.
	 * @returns {string} Texto convertido em slug.
	 */
	public static slugify(input: string, options: SlugOptions = {}) {
		const {
			separator = "-",
			case: letterCase = "lower",
			decamelize = true,
			customReplacements = [],
			preserveCharacters = [],
		} = options;

		let str = input;

		// 1. Decamelize: separa camelCase em palavras
		if (decamelize) {
			str = str.replace(/([a-z0-9])([A-Z])/g, `$1${separator}$2`);
		}

		// 2. Substituições personalizadas antes de remover acentos
		for (const [from, to] of customReplacements) {
			str = str.split(from).join(to);
		}

		// 3. Normaliza e remove acentos (diacríticos)
		str = str.normalize("NFD").replace(/[̀-ͯ]/g, "");

		// 4. Construir padrão regex para preservação de caracteres
		const preserveEscaped = preserveCharacters.map((ch) => `\\${ch}`).join("");
		const preservePattern = preserveEscaped
			? `A-Za-z0-9${preserveEscaped}`
			: "A-Za-z0-9";

		// 5. Substituir caracteres não permitidos por separador
		const invalidCharsRegex = new RegExp(`[^${preservePattern}]+`, "g");
		str = str.replace(invalidCharsRegex, separator);

		// 6. Aplicar case (minúsculas ou maiúsculas)
		str = letterCase === "lower" ? str.toLowerCase() : str.toUpperCase();

		// 7. Colapsar separadores duplicados
		const duplicateSepRegex = new RegExp(`${separator}{2,}`, "g");
		str = str.replace(duplicateSepRegex, separator);

		// 8. Remover separadores no início e fim
		const trimSepRegex = new RegExp(`^${separator}|${separator}$`, "g");
		str = str.replace(trimSepRegex, "");

		return str;
	}

	/**
	 * Cria uma instância de Slug validando e aplicando as opções.
	 *
	 * @param {string} input - Texto de entrada para gerar o slug.
	 * @param {SlugOptions} [options] - Opções de geração de slug.
	 * @returns {Slug} Instância de Slug contendo o slug gerado.
	 */
	public static create(input: string, options?: SlugOptions) {
		return new Slug(input, options);
	}
}
