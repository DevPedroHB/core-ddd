import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "@pedrohb/env";
import { AuthModule } from "./auth/auth.module";
import { EnvModule } from "./env/env.module";
import { HttpModule } from "./http/http.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
		EnvModule,
		AuthModule,
		HttpModule,
	],
})
export class AppModule {}
