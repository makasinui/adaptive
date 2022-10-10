import browserSync from 'browser-sync';
import config from '../config.js';

const server = (callback) => {
    browserSync.create().init({
        server: {
            baseDir: config.dist.root,
        },
        files: [
            `${config.dist.html}/*.html`,
            `${config.dist.css}/*.css`,
            `${config.dist.js}/*.js`,
            {
                match: `${config.dist.images}/**/*`,
                fn() {
                    this.reload();
                },
            },
        ],
        open: true,
        notify: false,
    });

    callback();
};

export default server;