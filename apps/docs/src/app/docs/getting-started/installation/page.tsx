import { Metadata } from "next";
import { DocsCode } from "../../_components/docs-code";

export const metadata: Metadata = {
	title: "Instalação",
};

export default function Installation() {
	return (
		<section id="installation">
			<h2>Instalação</h2>
			<p>Instale o pacote usando npm:</p>
			<DocsCode language="bash">npm install @pedrohb/core-ddd</DocsCode>
			<p>Ou utilizando pnpm:</p>
			<DocsCode language="bash">pnpm add @pedrohb/core-ddd</DocsCode>
			<p>Ou utilizando yarn:</p>
			<DocsCode language="bash">yarn add @pedrohb/core-ddd</DocsCode>
		</section>
	);
}
