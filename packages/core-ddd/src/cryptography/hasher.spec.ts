import { FakeHasher } from "@tests/cryptography/fake-hasher";

const plain = "test";
let fakeHasher: FakeHasher;
let hashed: string;

describe("Hasher", () => {
	beforeEach(async () => {
		fakeHasher = new FakeHasher();

		hashed = await fakeHasher.hash(plain);
	});

	it("should be able to hash a string", async () => {
		expect(hashed).toEqual(plain.concat(FakeHasher.hashString));
	});

	it("should be able to compare a string with a hash", async () => {
		const compared = await fakeHasher.compare(plain, hashed);

		expect(compared).toBe(true);
	});
});
