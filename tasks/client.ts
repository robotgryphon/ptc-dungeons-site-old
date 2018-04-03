
import { task, src, dest, parallel, series } from "gulp";
import * as browserify from "browserify";
import { join } from "path";
import * as sass from "gulp-sass";
import * as source from "vinyl-source-stream";

import { client } from "./paths";

task("client:scripts", () => {
	let entry = join(client.source.scripts, "app.ts");
	return browserify({ entries: [entry] })
		.plugin("tsify", { target: "commonjs" })
		.bundle()
		.pipe(source("app.js"))
		.pipe(dest(client.dest.scripts));
});

task("client:pages", () => {
	return src(client.source.root + '/**/*.html')
		.pipe(dest(client.dest.root));
});

task("client:media", () => {
	return src(client.source.media + "/**/*")
		.pipe(dest(client.dest.media));
});

task("client:styles", () => {
	return src(client.source.styles + '/**/*.scss')
		.pipe(sass())
		.pipe(dest(client.dest.styles));
});

task("client", parallel("client:scripts", "client:pages", "client:media", "client:styles"));