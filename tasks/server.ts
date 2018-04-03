import { task, src, dest, parallel } from "gulp";
import { join } from "path";
import * as typescript from "gulp-typescript";

import { server } from "./paths";

let tsConfig = "tsconfig.json";
let serverp = typescript.createProject(tsConfig, { rootDir: server.source });

task("server:scripts", () => {
	return src(server.source.root + "/**/*.ts")
		.pipe(serverp())
		.js
		.pipe(dest(server.dest.root));
});

task("server", parallel("server:scripts"));