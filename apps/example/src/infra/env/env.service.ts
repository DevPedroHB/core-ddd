import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvSchema } from "@pedrohb/env";

@Injectable()
export class EnvService {
	constructor(private readonly configService: ConfigService<EnvSchema, true>) {}

	public get<T extends keyof EnvSchema>(key: T) {
		return this.configService.get(key, {
			infer: true,
		});
	}
}
