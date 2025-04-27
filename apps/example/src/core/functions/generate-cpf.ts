export function generateCpf() {
	const randomDigits = Array.from({ length: 9 }, () =>
		Math.floor(Math.random() * 10),
	);

	const calcCheckDigit = (digits: number[], factorStart: number) => {
		const sum = digits.reduce(
			(acc, digit, idx) => acc + digit * (factorStart - idx),
			0,
		);

		const remainder = sum % 11;

		return remainder < 2 ? 0 : 11 - remainder;
	};

	const firstCheck = calcCheckDigit(randomDigits, 10);

	const secondCheck = calcCheckDigit([...randomDigits, firstCheck], 11);

	return [...randomDigits, firstCheck, secondCheck].join("");
}
