export const docsSidebarLinks = [
	{
		label: "Começando",
		path: "getting-started",
		items: [
			{
				label: "Introdução",
				path: "introduction",
			},
			{
				label: "Instalação",
				path: "installation",
			},
		],
	},
	{
		label: "Conceitos de DDD",
		path: "ddd-concepts",
		items: [
			{
				label: "Entidades",
				path: "entities",
			},
			{
				label: "Value Objects",
				path: "value-objects",
			},
			{
				label: "Agregados",
				path: "aggregates",
			},
			{
				label: "Repositórios",
				path: "repositories",
			},
			{
				label: "Domínio e Serviços",
				path: "domain-services",
			},
		],
	},
	{
		label: "Guias Práticos",
		path: "guides",
		items: [
			{
				label: "Criando Entidades",
				path: "creating-entities",
			},
			{
				label: "Implementando Repositórios",
				path: "implementing-repositories",
			},
			{
				label: "Gerenciando Agregados",
				path: "managing-aggregates",
			},
			{
				label: "Eventos de Domínio",
				path: "domain-events",
			},
		],
	},
	{
		label: "Exemplos",
		path: "examples",
		items: [
			{
				label: "Aplicação Completa",
				path: "complete-application",
			},
			{
				label: "Testes de Domínio",
				path: "domain-testing",
			},
		],
	},
	{
		label: "API de Referência",
		path: "api-reference",
		items: [
			{
				label: "Core",
				path: "core",
			},
			{
				label: "Entidades",
				path: "entities-api",
			},
			{
				label: "Value Objects",
				path: "value-objects-api",
			},
			{
				label: "Repositórios",
				path: "repositories-api",
			},
		],
	},
] as const;
