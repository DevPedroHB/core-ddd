import { Module } from "@nestjs/common";
import { CacheRepository } from "@pedrohb/core-ddd";
import { EnvModule } from "../env/env.module";
import { RedisCacheRepository } from "./redis/redis-cache-repository";
import { RedisService } from "./redis/redis.service";

@Module({
	imports: [EnvModule],
	providers: [
		{
			provide: CacheRepository,
			useClass: RedisCacheRepository,
		},
		RedisService,
	],
	exports: [CacheRepository, RedisService],
})
export class CacheModule {}
