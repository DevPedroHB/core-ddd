import { User } from "@/examples/user-entity";
import { getFileContent } from "@/functions/get-file-content";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { Metadata } from "next";
import { DocsCode } from "../../_components/docs-code";

export const metadata: Metadata = {
	title: "Entidade",
};

export default function Entities() {
	const exampleEntity = getFileContent("src/examples/user-entity.ts");
	const name = faker.person.fullName();
	const user = User.create({
		name,
		email: faker.internet.email({
			firstName: name.split(" ")[0],
			lastName: name.split(" ")[1],
			allowSpecialCharacters: true,
		}),
		password: faker.internet.password(),
	});

	return (
		<section id="entities">
			<h2>Entidades</h2>
			<p>
				Entidades são objetos que possuem uma identidade única e continuam
				existindo ao longo do tempo, mesmo quando seus atributos mudam.
			</p>
			<h3>Características</h3>
			<ul>
				<li>Possuem identidade única (ID)</li>
				<li>São mutáveis (seus atributos podem mudar)</li>
				<li>Implementam regras de negócio relacionadas</li>
			</ul>
			<h3>Exemplo de uso:</h3>
			<DocsCode language="typescript">{exampleEntity}</DocsCode>
			<div>
				<strong>Dica:</strong> Use o método estático <code>create</code> para
				instanciar novas entidades. Isso permite validar as propriedades antes
				da criação.
			</div>
			<h3>Exemplo de entidade:</h3>
			<DocsCode language="json">{JSON.stringify(user, null, 2)}</DocsCode>
		</section>
	);
}
