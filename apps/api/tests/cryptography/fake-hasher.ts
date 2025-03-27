import { Hasher } from "@/domain/account/application/cryptography/hasher";

export class FakeHasher implements Hasher {
	private hashString = "-hashed";

	public async hash(plain: string): Promise<string> {
		return plain.concat(this.hashString);
	}

	public async compare(plain: string, hash: string): Promise<boolean> {
		return plain.concat(this.hashString) === hash;
	}
}
