// import gulp from "gulp";
// const { src, dest, watch, series, parallel } = gulp;

// import imagemin from "gulp-imagemin";
// import autoprefixer from "gulp-autoprefixer";
// import csso from "gulp-csso";
// import clean from "gulp-clean";
// import * as dartSass from "sass";
// import gulpSass from "gulp-sass";
// const sass = gulpSass(dartSass);

// import bsc from "browser-sync";
// const browserSync = bsc.create();

// const htmlTaskHandler = () => {
//   return src("./src/*.html").pipe(dest("./dist"));
// };

// const cssTaskHandler = () => {
//   return src("./src/scss/main.scss")
//     .pipe(sass().on("error", sass.logError))
//     .pipe(autoprefixer())
//     .pipe(csso())
//     .pipe(dest("./dist/css"))
//     .pipe(browserSync.stream());
// };

// // const imagesTaskHandler = () => {
// //   return src("./src/images/**/*.*")
// //     .pipe(imagemin())
// //     .pipe(dest("./dist/images"))
// //     .pipe(browserSync.stream());
// // };

// const imagesTaskHandler = () => {
//   return src("./src/images/**/*.*") // Беремо всі файли
//     .pipe(
//       imagemin([
//         imagemin.mozjpeg({ quality: 75, progressive: true }), // Стискаємо тільки JPEG
//         imagemin.optipng({ optimizationLevel: 5 }), // Стискаємо PNG
//         imagemin.svgo({
//           // Налаштування для SVG
//           plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
//         }),
//       ])
//     )
//     .pipe(dest("./dist/images")) // Кладемо у dist
//     .pipe(browserSync.stream());
// };

// const fontTaskHandler = () => {
//   return src("./src/fonts/**/*.*").pipe(dest("./dist/fonts"));
// };

// const cleanDistTaskHandler = () => {
//   return src("./dist", { read: false, allowEmpty: true }).pipe(
//     clean({ force: true })
//   );
// };
// const jsTaskHandler = () => {
//   return src("./src/js/main.js").pipe(dest("./dist/js"));
// };
// const browserSyncTaskHandler = () => {
//   browserSync.init({
//     server: {
//       baseDir: "./dist",
//     },
//   });
//   watch("./src/scss/**/*.scss").on(
//     "all",
//     series(cssTaskHandler, browserSync.reload)
//   );
//   watch("./src/*.html").on(
//     "change",
//     series(htmlTaskHandler, browserSync.reload)
//   );
//   watch("./src/images/**/*").on(
//     "all",
//     series(imagesTaskHandler, browserSync.reload)
//   );
//   watch("./src/js/**/*.js").on(
//     "change",
//     series(jsTaskHandler, browserSync.reload)
//   );
// };

// export const cleaning = cleanDistTaskHandler;
// export const html = htmlTaskHandler;
// export const css = cssTaskHandler;
// export const font = fontTaskHandler;
// export const images = imagesTaskHandler;

// export const build = series(
//   cleanDistTaskHandler,
//   parallel(
//     htmlTaskHandler,
//     cssTaskHandler,
//     fontTaskHandler,
//     imagesTaskHandler,
//     jsTaskHandler
//   )
// );
// export const dev = series(build, browserSyncTaskHandler);
// export default dev;
// Імпортуємо всі необхідні модулі

import gulp from "gulp";
const { src, dest, watch, series, parallel } = gulp;

import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import imagemin from "gulp-imagemin";
import del from "del";
import bsc from "browser-sync";
const browserSync = bsc.create();

// Шляхи до файлів
const paths = {
  html: {
    src: "./src/*.html",
    dest: "./dist/",
  },
  styles: {
    src: "./src/scss/**/*.scss",
    dest: "./dist/css/",
  },
  scripts: {
    src: "./src/js/**/*.js",
    dest: "./dist/js/",
  },
  images: {
    src: "./src/images/**/*.*",
    dest: "./dist/images/",
  },
  fonts: {
    src: "./src/fonts/**/*.*",
    dest: "./dist/fonts/",
  },
};

// Задача для очищення папки dist
const cleanDist = () => del(["./dist"]);

// Задача для HTML
const html = () =>
  src(paths.html.src).pipe(dest(paths.html.dest)).pipe(browserSync.stream());

// Задача для стилів
const styles = () => {
  return src(paths.styles.src, { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(dest(paths.styles.dest, { sourcemaps: "." }))
    .pipe(browserSync.stream());
};

// Задача для скриптів
const scripts = () =>
  src(paths.scripts.src)
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());

// Задача для зображень
const images = () => {
  return src(paths.images.src)
    .pipe(imagemin()) // Використовуємо стабільну версію
    .pipe(dest(paths.images.dest))
    .pipe(browserSync.stream());
};

// Задача для шрифтів
const fonts = () => src(paths.fonts.src).pipe(dest(paths.fonts.dest));

// Задача для відстеження змін
const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
  watch(paths.html.src, html);
  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.images.src, images);
};

// Визначаємо основні сценарії
const build = series(cleanDist, parallel(html, styles, scripts, images, fonts));
const dev = series(build, watchFiles);

// Експортуємо задачі для виклику з командного рядка
export { build, dev };
export default dev;
