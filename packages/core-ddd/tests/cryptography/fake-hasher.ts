import { Hasher } from "@/cryptography/hasher";

export class FakeHasher implements Hasher {
	public static readonly hashString = "-hashed";

	public async hash(plain: string): Promise<string> {
		return plain.concat(FakeHasher.hashString);
	}

	public async compare(plain: string, hash: string): Promise<boolean> {
		return plain.concat(FakeHasher.hashString) === hash;
	}
}
