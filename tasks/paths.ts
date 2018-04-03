import { join } from "path";

let sourceRoot =		join("source");
let destRoot =			join("build");

let clientSource: any = { };
clientSource.root =		join(sourceRoot, "client");
clientSource.pages =	join(clientSource.root, "pages");
clientSource.media =	join(clientSource.root, "media");
clientSource.styles =	join(clientSource.root, "styles");
clientSource.scripts =	join(clientSource.root, "scripts");

let clientBuilt: any = {};
clientBuilt.root =		join(destRoot, "client");
clientBuilt.pages =		join(clientBuilt.root, "pages");
clientBuilt.media =		join(clientBuilt.root, "media");
clientBuilt.styles =	join(clientBuilt.root, "styles");
clientBuilt.scripts =	join(clientBuilt.root, "scripts");

let client = {
	source: clientSource,
	dest: clientBuilt
};


// Server
let serverSource: any = { };
serverSource.root =		join(sourceRoot, "server");

let serverDest: any = { };
serverDest.root =		join(destRoot, "server");

let server = {
	source: serverSource,
	dest: serverDest
};

export { sourceRoot, destRoot, client, server };