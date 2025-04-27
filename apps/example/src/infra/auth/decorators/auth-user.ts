import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { TokenPayloadSchema } from "../strategies/jwt.strategy";

export const AuthUser = createParamDecorator(
	(_data: never, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest();

		return request.user as TokenPayloadSchema;
	},
);
