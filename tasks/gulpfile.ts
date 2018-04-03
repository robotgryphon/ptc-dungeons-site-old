import { task, series, parallel } from "gulp";
import * as del from "del";

import "./client";
import "./server";

import { destRoot } from "./paths";

task("clean", () => {
	return del(destRoot);
});

task("build", series("clean", parallel("client", "server")));