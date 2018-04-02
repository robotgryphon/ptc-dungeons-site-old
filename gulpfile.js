const gulp          = require("gulp");
const sass          = require("gulp-sass");
const path          = require("path");
const typescript    = require("gulp-typescript");
const del           = require("del");

let source = {};
source.root =  "source";

source.client =  path.join(source.root, "client");
source.pages =   path.join(source.client, "pages");
source.media =   path.join(source.client, "media");
source.styles =  path.join(source.client, "/styles");

source.server =  path.join(source.root, "server");

built = {};
built.root =      path.join(__dirname, "build");

built.client =    path.join(built.root, "client");
built.pages =     path.join(built.client, "pages");
built.media =     path.join(built.client, "media");
built.styles =    path.join(built.client, "styles");

built.server =    path.join(built.root, "server");

let tsProject = typescript.createProject(path.join(__dirname, "tsconfig.json"));
let serverp = typescript.createProject("tsconfig.json", { rootDir: source.server });

gulp.task("clean", () => {
    return del(built.root);
})

let styles = gulp.task("build::styles", () => {
  return gulp.src(source.styles + '/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(built.styles));
});

gulp.task("build::server", () => {
    return gulp
        .src(source.server + "/**/*.ts")
        .pipe(serverp())
        .js.pipe(gulp.dest(built.server));
});

gulp.task("copy::pages", () => {
    return gulp.src(source.client + '/**/*.html')
        .pipe(gulp.dest(built.client));
});

gulp.task("copy::media", () => {
    return gulp.src(source.media + "/**/*")
        .pipe(gulp.dest(built.media));
});

// build: copies pages over and builds media and styles
gulp.task("build", gulp.series("clean", gulp.parallel("copy::pages", "copy::media", "build::styles", "build::server")));