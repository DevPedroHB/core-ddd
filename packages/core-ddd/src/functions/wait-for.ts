/**
 * Aguarda até que a função de asserções seja bem-sucedida
 * ou até que o tempo máximo seja atingido.
 *
 * @param assertions Função que deve lançar erro enquanto a condição não for atendida. Pode retornar Promise.
 * @param options Configurações opcionais:
 *   - timeout: tempo máximo em milissegundos (padrão: 1000)
 *   - interval: intervalo entre tentativas em milissegundos (padrão: 10)
 * @returns Promise que resolve assim que `assertions()` passar sem erro,
 *   ou rejeita com o último erro após estourar o timeout.
 */
export async function waitFor(
	assertions: () => void | Promise<void>,
	options: { timeout?: number; interval?: number } = {},
) {
	const { timeout = 1000, interval = 10 } = options;
	const start = performance.now();

	return new Promise<void>((resolve, reject) => {
		const tryAssert = async () => {
			try {
				await assertions();

				resolve();
			} catch (err) {
				const elapsed = performance.now() - start;

				if (elapsed >= timeout) {
					reject(err);
				} else {
					setTimeout(tryAssert, interval);
				}
			}
		};

		tryAssert();
	});
}
