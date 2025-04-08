"use server";

import { npm } from "@/libs/ky";
import { NPMPackageInfo } from "@/types/npm-package-info-types";

export async function getPackageInfo() {
	const result = await npm.get("").json<NPMPackageInfo>();

	return result;
}
