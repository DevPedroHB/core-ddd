import { z } from "zod";

export const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
	NPM_URL: z.string().url(),
});

export type EnvSchema = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
