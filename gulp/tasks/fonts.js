import gulp from 'gulp';
import config from '../config.js';

const fontsBuild = () => (
    gulp.src(`${config.src.fonts}/**/*`)
        .pipe(gulp.dest(config.dist.fonts))
);

export const assetsBuild = gulp.parallel(fontsBuild);

export const assetsWatch = () => {
    gulp.watch(`${config.src.fonts}/**/*`, fontsBuild);
};