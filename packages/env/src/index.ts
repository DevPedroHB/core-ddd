import { z } from "zod";

export const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
	PORT: z.coerce.number().default(3333),
	JWT_PRIVATE_KEY: z.string(),
	JWT_PUBLIC_KEY: z.string(),
	DATABASE_URL: z.string().url(),
	REDIS_HOST: z.string(),
	REDIS_PORT: z.coerce.number().default(6379),
	REDIS_PASSWORD: z.string(),
	REDIS_DB: z.coerce.number().default(0),
	NPM_URL: z.string().url(),
});

export type EnvSchema = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
