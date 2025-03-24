import { TestEntity } from "@tests/entities/test-entity";

let testEntity: TestEntity;

describe("Entity", () => {
	beforeEach(() => {
		testEntity = TestEntity.create({
			name: "John Doe",
			email: "example@email.com",
			password: "PSW@p4ssw0rd",
		});
	});

	it("should be able to create a entity", () => {
		expect(testEntity).toBeDefined();
		expect(testEntity.name).toBe("John Doe");
		expect(testEntity.email).toBe("example@email.com");
		expect(testEntity.password).toBe("PSW@p4ssw0rd");
	});

	it("should be able to update a entity", () => {
		testEntity.name = "John Doe Edited";
		testEntity.email = "example.edited@email.com";
		testEntity.password = "NEW@p4ssw0rd";

		expect(testEntity).toBeDefined();
		expect(testEntity.name).toBe("John Doe Edited");
		expect(testEntity.email).toBe("example.edited@email.com");
		expect(testEntity.password).toBe("NEW@p4ssw0rd");
	});

	it("should be able to compare two entities with the same id", () => {
		const testEntity2 = TestEntity.create(
			{
				name: "John Doe",
				email: "example@email.com",
				password: "PSW@p4ssw0rd",
			},
			testEntity.id,
		);

		expect(testEntity.equals(testEntity2)).toBeTruthy();
	});
});
