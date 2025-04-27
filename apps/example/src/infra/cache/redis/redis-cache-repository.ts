import { Injectable } from "@nestjs/common";
import { CacheRepository } from "@pedrohb/core-ddd";
import { RedisService } from "./redis.service";

@Injectable()
export class RedisCacheRepository implements CacheRepository {
	constructor(private readonly redis: RedisService) {}

	public async get(key: string): Promise<string | null> {
		return await this.redis.get(key);
	}

	public async set(key: string, value: string): Promise<void> {
		await this.redis.set(key, value, "EX", 60 * 30); // 30 minutes
	}

	public async del(key: string): Promise<void> {
		await this.redis.del(key);
	}
}
