/**
 * Gera um CPF válido (11 dígitos numéricos) sem máscara.
 */
export function generateCpf() {
	// 1) gera 9 dígitos aleatórios
	const randomDigits = Array.from({ length: 9 }, () =>
		Math.floor(Math.random() * 10),
	);

	// 2) função auxiliar para calcular cada dígito verificador
	const calcCheckDigit = (digits: number[], factorStart: number) => {
		const sum = digits.reduce(
			(acc, digit, idx) => acc + digit * (factorStart - idx),
			0,
		);

		const remainder = sum % 11;

		return remainder < 2 ? 0 : 11 - remainder;
	};

	// 3) calcula o primeiro dígito verificador (peso 10 a 2)
	const firstCheck = calcCheckDigit(randomDigits, 10);

	// 4) calcula o segundo dígito verificador (peso 11 a 2, incluindo primeiro dígito)
	const secondCheck = calcCheckDigit([...randomDigits, firstCheck], 11);

	// 5) retorna os 11 dígitos concatenados
	return [...randomDigits, firstCheck, secondCheck].join("");
}
