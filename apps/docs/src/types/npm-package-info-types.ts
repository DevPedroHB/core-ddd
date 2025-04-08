export interface NPMPackageInfo {
	name: string;
	description?: string;
	"dist-tags": {
		[tag: string]: string;
	};
	versions: {
		[version: string]: NPMPackageVersion;
	};
	time: NPMPackageTime;
	maintainers: Array<{
		name: string;
		email: string;
	}>;
	author?: {
		name: string;
		email?: string;
		url?: string;
	};
	repository?: {
		type: string;
		url: string;
	};
	bugs?: {
		url: string;
	};
	homepage?: string;
	readme?: string;
}

export interface NPMPackageVersion {
	name: string;
	version: string;
	description?: string;
	main?: string;
	scripts?: {
		[scriptName: string]: string;
	};
	dependencies?: {
		[dependency: string]: string;
	};
	devDependencies?: {
		[dependency: string]: string;
	};
	peerDependencies?: {
		[dependency: string]: string;
	};
}

export interface NPMPackageTime {
	created: string;
	modified: string;
	[version: string]: string;
}
