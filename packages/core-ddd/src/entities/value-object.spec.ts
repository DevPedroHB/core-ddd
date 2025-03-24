import { TestValueObject } from "../../tests/entities/test-value-object";

let testValueObject: TestValueObject;

describe("Entity", () => {
	beforeEach(() => {
		testValueObject = TestValueObject.create({
			name: "John Doe",
			email: "example@email.com",
			password: "PSW@p4ssw0rd",
		});
	});

	it("should be able to create a value object", () => {
		expect(testValueObject).toBeDefined();
		expect(testValueObject.name).toBe("John Doe");
		expect(testValueObject.email).toBe("example@email.com");
		expect(testValueObject.password).toBe("PSW@p4ssw0rd");
	});

	it("should be able to update a value object", () => {
		testValueObject.name = "John Doe Edited";
		testValueObject.email = "example.edited@email.com";
		testValueObject.password = "NEW@p4ssw0rd";

		expect(testValueObject).toBeDefined();
		expect(testValueObject.name).toBe("John Doe Edited");
		expect(testValueObject.email).toBe("example.edited@email.com");
		expect(testValueObject.password).toBe("NEW@p4ssw0rd");
	});
});
