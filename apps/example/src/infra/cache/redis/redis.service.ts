import { EnvService } from "@/infra/env/env.service";
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService
	extends Redis
	implements OnModuleInit, OnModuleDestroy
{
	constructor(env: EnvService) {
		super({
			host: env.get("REDIS_HOST"),
			port: env.get("REDIS_PORT"),
			password: env.get("REDIS_PASSWORD"),
			db: env.get("REDIS_DB"),
		});
	}

	public onModuleInit() {
		this.connect();
	}

	public onModuleDestroy() {
		this.disconnect();
	}
}
