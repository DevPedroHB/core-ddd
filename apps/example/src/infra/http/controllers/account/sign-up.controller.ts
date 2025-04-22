import { Controller, Get } from "@nestjs/common";

@Controller({ path: "/sign-up", version: "v1" })
export class SignUpController {
	@Get()
	public async handle() {
		return {
			message: "Hello World!",
		};
	}
}
