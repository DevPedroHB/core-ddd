import { FakeEncrypter } from "@tests/cryptography/fake-encrypter";

let fakeEncrypter: FakeEncrypter;

describe("Encrypter", () => {
	beforeEach(() => {
		fakeEncrypter = new FakeEncrypter();
	});

	it("should be able to encrypt a payload", async () => {
		const payload = {
			key: "value",
		};

		const encryptedPayload = await fakeEncrypter.encrypt(payload);

		expect(encryptedPayload).toBe(JSON.stringify(payload));
	});
});
