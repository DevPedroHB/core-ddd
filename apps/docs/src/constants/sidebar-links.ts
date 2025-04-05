export const sidebarLinks = [
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
		label: "Exemplos",
		path: "examples",
		items: [
			{
				label: "Entidades",
				path: "entities",
			},
			{
				label: "Agregados",
				path: "aggregates",
			},
		],
	},
] as const;
