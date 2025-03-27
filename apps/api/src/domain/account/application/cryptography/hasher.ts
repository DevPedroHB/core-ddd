export abstract class Hasher {
	public abstract hash(plain: string): Promise<string>;
	public abstract compare(plain: string, hash: string): Promise<boolean>;
}
