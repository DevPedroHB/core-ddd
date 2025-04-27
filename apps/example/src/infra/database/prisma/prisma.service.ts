import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@pedrohb/database";

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor() {
		super({
			log: ["error", "warn"],
		});
	}

	public onModuleInit() {
		return this.$connect();
	}

	public onModuleDestroy() {
		return this.$disconnect();
	}
}
