import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import autoprefixer from "gulp-autoprefixer";
import gcmq from "gulp-group-css-media-queries";
import rename from "gulp-rename";
import gulpif from "gulp-if";
import sassGlob from "gulp-sass-glob";
import config from "../config.js";

const sassBuild = () =>
  gulp
    .src(
      [
        `${config.src.sass}/main.sass`,
        `${config.src.sass}/loans.sass`,
        `${config.src.sass}/admin.sass`,
      ],
      { sourcemaps: config.isDev }
    )
    .pipe(sassGlob())
    .pipe(
      sass({
        includePaths: ["./node_modules"],
      })
    )
    .pipe(gulpif(config.isProd, gcmq()))
    .pipe(
      gulpif(
        config.isProd,
        autoprefixer(["last 15 versions", "> 1%", "ie 9", "ie 10", "ie 11"])
      )
    )
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest(config.dist.css, { sourcemaps: config.isDev }));

export const stylesBuild = gulp.series(sassBuild);

export const stylesWatch = () => {
  gulp.watch(`${config.src.sass}/**/*.sass`, sassBuild);
};
