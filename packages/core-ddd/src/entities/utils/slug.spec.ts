import { fakerPT_BR as faker } from "@faker-js/faker";
import { Slug } from "./slug";

describe("Slug", () => {
	it("should be able to create a slug", () => {
		const sentence = faker.string.sample({ min: 16, max: 32 });
		const slug = Slug.create(sentence);

		expect(slug).toBeInstanceOf(Slug);
		expect(slug.slug).toBe(Slug.slugify(sentence));
	});
});
