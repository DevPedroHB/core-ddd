import type { Config } from "jest";

const config: Config = {
	clearMocks: true,
	collectCoverage: true,
	coverageProvider: "v8",
	collectCoverageFrom: ["**/*.(t|j)s"],
	coverageDirectory: "./coverage",
	moduleFileExtensions: ["js", "json", "ts"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@tests/(.*)$": "<rootDir>/tests/$1",
	},
	rootDir: ".",
	testEnvironment: "node",
	testRegex: ".*\\.spec\\.ts$",
	transform: {
		"^.+\\.(t|j)s$": "ts-jest",
	},
};

export default config;
