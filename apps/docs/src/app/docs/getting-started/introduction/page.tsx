import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Introdução",
};

export default function Introduction() {
	return (
		<section id="introduction">
			<h2>Introdução</h2>
			<div className="flex gap-2">
				<img
					src="https://img.shields.io/npm/v/@pedrohb/core-ddd.svg"
					alt="npm version"
				/>
				<img
					src="https://img.shields.io/npm/l/@pedrohb/core-ddd.svg"
					alt="license"
				/>
			</div>
			<p>
				O <code>@pedrohb/core-ddd</code> é uma biblioteca TypeScript para
				implementação de Domain-Driven Design (DDD) em aplicações Node.js. A
				biblioteca fornece estruturas essenciais para construir aplicações
				baseadas em DDD de forma clara e consistente.
			</p>
			<p>
				DDD é uma abordagem de desenvolvimento de software que prioriza o
				domínio do problema e conecta a implementação com um modelo em evolução,
				focando na complexidade do negócio em vez da complexidade técnica.
			</p>
			<p>
				Esta biblioteca oferece componentes fundamentais para implementar os
				padrões DDD, como Entidades, Value Objects, Agregados, Repositórios,
				Eventos de Domínio e casos de uso.
			</p>
		</section>
	);
}
