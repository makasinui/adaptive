import gulp from 'gulp';
import config from './gulp/config.js';
import clean from './gulp/tasks/clean.js';
import server from './gulp/tasks/server.js';
import { htmlBuild, htmlWatch } from './gulp/tasks/html.js';
import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts.js';
import { stylesBuild, stylesWatch } from './gulp/tasks/styles.js';
import { assetsBuild, assetsWatch } from './gulp/tasks/fonts.js';
import { imagesBuild, imagesWatch } from './gulp/tasks/images.js';

config.setEnv();

export const build = gulp.series(
	clean,
	gulp.parallel(
		htmlBuild,
		scriptsBuild,
		stylesBuild,
		assetsBuild,
		imagesBuild,
	),
);

export const watch = gulp.series(
	build,
	server,
	gulp.parallel(
		htmlWatch,
		scriptsWatch,
		stylesWatch,
		assetsWatch,
		imagesWatch,
	),
);