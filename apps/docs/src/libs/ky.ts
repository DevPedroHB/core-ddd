import { env } from "@pedrohb/env";
import ky from "ky";

export const npm = ky.create({
	prefixUrl: env.NPM_URL,
});
