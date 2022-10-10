import gulp from 'gulp';
import config from '../config.js';

const html = () => (
    gulp.src(`${config.src.html}/**/*`)
        .pipe(gulp.dest(config.dist.html))
);

export const htmlBuild = gulp.parallel(html);

export const htmlWatch = () => {
    gulp.watch(`${config.src.html}/**/*`, html);
};