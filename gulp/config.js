const srcPath = 'src';
const distPath = 'dist';

const config = {
  src: {
    root: srcPath,
    sass: `${srcPath}/sass`,
    js: `${srcPath}/js`,
    fonts: `${srcPath}/assets/fonts`,
    images: `${srcPath}/assets/images`,
    html: `${srcPath}/pages`,
  },

  dist: {
    root: distPath,
    css: `${distPath}/css`,
    js: `${distPath}/js`,
    fonts: `${distPath}/fonts`,
    images: `${distPath}/images`,
    html: distPath,
  },

  setEnv() {
    this.isProd = process.argv.includes('--prod');
    this.isDev = !this.isProd;
  },
};

export default config;