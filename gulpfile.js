const { series } = require('gulp');
const gulp = require('gulp');
const browserSync = require('browser-sync').create(); // подключили пакет browser-sync для настройки автомат перезагрузки страниц
const pug = require('gulp-pug');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');

/*build - запускаем когда пишем проект с нуля*/

function sassF() {
  return gulp.src('./src/sass/*.scss') //функция для выбора файла
    .pipe(sass().on('error', sass.logError)) // pipe() задача, которую мы будем выполнять с этим файлом
    .pipe(gulp.dest('./build/css')) // gulp.dest- помещение результата куда-то
    .pipe(browserSync.stream());
}

function pugDist(){
    return gulp.src('./src/pug/pages/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./build'));
}

function sassBuild(){
    return gulp.src('./src/sass/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./build/css'));
}

function pugBuild(){
    return gulp.src('./src/pug/pages/*.pug')
            .pipe(pug())
            .pipe(gulp.dest('./build'))
            .pipe(browserSync.stream());
}

function watchBuild(){
    browserSync.init({
        server: {
            baseDir: "./build"
        },
        browser: 'chrome'
    });

    gulp.watch('./src/pug/**/*.pug', pugBuild);
    gulp.watch('./src/sass/**/*.scss', sassF);
}


exports.watch = watchBuild; //сборка проекта
exports.build = series(pugDist, sassBuild); // запуститься фоновая задача. Чтобы снять - в консоле ctrl c
//exports.build_too = build2;