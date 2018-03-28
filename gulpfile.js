const gulp = require("gulp");
const sass = require("gulp-sass");
const path = require("path");

let paths = {};
paths.source =  path.join(__dirname, "source");
paths.pages =   path.join(paths.source, "pages");
paths.media =   path.join(paths.source, "media");
paths.styles =  path.join(paths.source, "styles");

paths.final = {};
paths.final.root =      path.join(__dirname, "public");
paths.final.pages =     path.join(paths.final.root, "pages");
paths.final.media =     path.join(paths.final.root, "media");
paths.final.styles =    path.join(paths.final.root, "styles");

gulp.task("build", ["build::copy", "build::styles"]);

gulp.task("build::copy", () => {
    let stream = gulp.src(paths.pages + '/**/*.html')
        .pipe(gulp.dest(paths.final.pages));

    let media = gulp.src(paths.media + "/**/*")
        .pipe(gulp.dest(paths.final.media));
  });

gulp.task("build::styles", () => {
  let stream = gulp.src(paths.styles + '/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(paths.final.styles));

  return stream;
});