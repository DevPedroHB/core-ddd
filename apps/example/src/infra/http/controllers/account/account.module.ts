import { Module } from "@nestjs/common";
import { SignUpController } from "./sign-up.controller";

@Module({
	controllers: [SignUpController],
})
export class AccountModule {}
