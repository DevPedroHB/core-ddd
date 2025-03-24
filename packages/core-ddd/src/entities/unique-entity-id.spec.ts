import { UniqueEntityId } from "./unique-entity-id";

let uniqueEntityId: UniqueEntityId;

describe("Unique entity id", () => {
	beforeEach(() => {
		uniqueEntityId = new UniqueEntityId();
	});

	it("should be able to create a unique entity id", () => {
		expect(uniqueEntityId.id).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
		);
	});

	it("should be able to compare two unique entity ids", () => {
		const uniqueEntityId2 = new UniqueEntityId(uniqueEntityId.id);

		expect(uniqueEntityId.equals(uniqueEntityId2)).toBeTruthy();
	});
});
