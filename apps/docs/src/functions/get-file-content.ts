// lib/file-reader.ts
import fs from "node:fs";
import path from "node:path";

/**
 * Lê o conteúdo de um arquivo a partir de um caminho relativo
 * @param relativeFilePath Caminho relativo do arquivo (ex: "src/example/user-entity.ts")
 * @returns Conteúdo do arquivo como string
 */
export function getFileContent(relativeFilePath: string) {
	const filePath = path.join(process.cwd(), relativeFilePath);

	try {
		return fs.readFileSync(filePath, "utf8");
	} catch (error) {
		console.error("Erro ao ler o arquivo:", error);

		return "";
	}
}
