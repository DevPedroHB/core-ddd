import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["./src/**/*.ts"],
	clean: true,
	dts: true,
	sourcemap: true,
	format: ["cjs", "esm"],
	outDir: "dist",
});
