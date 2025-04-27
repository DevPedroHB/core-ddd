import { CacheRepository } from "@/repositories/cache-repository";

export class InMemoryCacheRepository implements CacheRepository {
	public items: Map<string, string> = new Map();

	public async get(key: string): Promise<string | null> {
		const item = await this.items.get(key);

		if (!item) {
			return null;
		}

		return item;
	}

	public async set(key: string, value: string): Promise<void> {
		await this.items.set(key, value);
	}
	public async del(key: string): Promise<void> {
		await this.items.delete(key);
	}
}
