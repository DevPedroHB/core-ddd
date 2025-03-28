import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["./src/**/*.ts", "!./src/**/*.spec.ts", "!./src/**/*.e2e-spec.ts"],
	clean: true,
	dts: true,
	sourcemap: true,
	format: ["cjs", "esm"],
	outDir: "dist",
	tsconfig: "./tsconfig.json",
});
