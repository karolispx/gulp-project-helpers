/*
|----------------------------------------------------------
|       Karolis Pliauskys (k.pliauskys@gmail.com)
|            https://github.com/karolispx
|----------------------------------------------------------
*/

// IMPORT DEPENDENCIES.
const gulp = require('gulp')
const server = require('gulp-server-livereload')

const concat = require("gulp-concat")
const htmlmin = require('gulp-htmlmin')
const terser = require('gulp-terser')
const rename = require("gulp-rename")
const clean = require('gulp-clean')
const gulpinject = require('gulp-inject')

const gulpsass = require('gulp-sass')
gulpsass.compiler = require('node-sass')


// CONFIGURATION VARIABLES.
const JS_MAIN_FILE_NAME = 'scripts.min.js'

const PUBLIC_FOLDER_PATH = 'public'
const PUBLIC_FILE_PATH = './html/index.html'

const SRC_PATH = './src/'
const DEST_PATH = './public/'

const footerScripts = [
    './public/vendor/js/jquery-3.4.1.slim.min.js',
    './public/vendor/js/bootstrap.bundle.min.js',
    './public/js/scripts.min.js',
]

const headerStyles = [
    './public/vendor/css/bootstrap.min.css',
    './public/css/style.min.css',
]


// HELPER: GET DIRECTORY PATH.
const getFolderPath = (type, resource) => {
    return (resource === 'src') ? SRC_PATH + type + '/*' : DEST_PATH + type + '/'
}



/*
|----------------------------------------------------------
| TASK: COMPILE SASS FILES INTO CSS FILES & MINIFY THEM.
|----------------------------------------------------------
|   # TRIGGER THIS TASK BY RUNNING: 'gulp sass'.
|----------------------------------------------------------
*/
const processSASS = () => {
    return gulp.src(getFolderPath('sass', 'src'), { sourcemaps: true })
        .pipe(gulpsass({ outputStyle: 'compressed' }).on('error', gulpsass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(getFolderPath('css', 'dest'), { sourcemaps: true }))
}

module.exports.sass = processSASS



/*
|----------------------------------------------------------
| TASK: MINIFY & CONCATENATE JS FILES.
|----------------------------------------------------------
|   # TRIGGER THIS TASK BY RUNNING: 'gulp js'.
|----------------------------------------------------------
*/
const processJS = () => {
    return gulp.src(getFolderPath('js', 'src'), { sourcemaps: true })
        .pipe(terser())
        .pipe(rename({ suffix: '.min' }))
        .pipe(concat(JS_MAIN_FILE_NAME))
        .pipe(gulp.dest(getFolderPath('js', 'dest'), { sourcemaps: true }))
}

module.exports.js = processJS



/*
|----------------------------------------------------------
| TASK: MINIFY HTML FILES.
|----------------------------------------------------------
|   # TRIGGER THIS TASK BY RUNNING: 'gulp html'.
|----------------------------------------------------------
*/
const processHTML = () => {
    return gulp.src(getFolderPath('html', 'src'))
        .pipe(htmlmin({ collapseWhitespace: false }))
        .pipe(gulp.dest(getFolderPath('html', 'dest')))
}

module.exports.html = processHTML


/*
|----------------------------------------------------------
| TASK: MOVE VENDOR ASSETS FROM SOURCE TO PUBLIC DIRECTORY.
|----------------------------------------------------------
|   # TRIGGER THIS TASK BY RUNNING: 'gulp vendor'.
|----------------------------------------------------------
*/
const moveVendorAssets = () => {
    return gulp.src('./src/vendor/**/*.*', { base: './src' })
        .pipe(gulp.dest('./public'))
}

module.exports.vendor = moveVendorAssets



/*
|----------------------------------------------------------
| TASK: INJECT CSS & JS RESOURCES INTO HTML FILES.
|----------------------------------------------------------
|   # TRIGGER THIS TASK BY RUNNING: 'gulp inject'.
|----------------------------------------------------------
*/
const injectResources = () => {
    return gulp.src('./public/html/*.html')
        .pipe(gulpinject(gulp.src(footerScripts, {read: true}), {relative: true, starttag: '<!-- inject:footer -->'}))
        .pipe(gulpinject(gulp.src(headerStyles, {read: true}), {relative: true, starttag: '<!-- inject:header -->'}))
        .pipe(gulp.dest('./public/html'))
}

module.exports.inject = injectResources



/*
|----------------------------------------------------------
| TASK: DELETE PUBLIC DIRECTORY.
|----------------------------------------------------------
|   # TRIGGER THIS TASK BY RUNNING: 'gulp clean'.
|----------------------------------------------------------
*/
const runCleaner = () => {
    return gulp.src(PUBLIC_FOLDER_PATH, { allowEmpty: true }).pipe(clean())
}

module.exports.clean = runCleaner



/*
|----------------------------------------------------------
| TASK: REBUILD PUBLIC DIRECTORY.
|----------------------------------------------------------
|   # TRIGGER THIS TASK BY RUNNING: 'gulp clean'.
|----------------------------------------------------------
*/
const runBuilder = (done) => {
    //  Run SASS, JS & HTML tasks to recreate everything.
    gulp.series(
        moveVendorAssets,
        processHTML,
        processSASS, 
        processJS, 
        injectResources
    )(done)
}

module.exports.build = runBuilder


/*
|----------------------------------------------------------
| TASK: DEFAULT TASK THAT STARTS LOCAL WEBSERVER.
|----------------------------------------------------------
|   # TRIGGER THIS TASK BY RUNNING: 'gulp'.
|----------------------------------------------------------
*/
const runServer = (done) => {
    // Run cleaner & builder before it strats the webserver.
    gulp.series(runCleaner, runBuilder, serverCallback)(done)
}

const serverCallback = () => {
    gulp.src(PUBLIC_FOLDER_PATH).pipe(server({
        livereload: true,
        defaultFile: PUBLIC_FILE_PATH
    }))    
}

module.exports.default = runServer



/*
|----------------------------------------------------------
| TASK: WATCHES FOR CHANGES IN SASS/JS & HTML DIRECTORIES.
|----------------------------------------------------------
|   # TRIGGER THIS TASK BY RUNNING: 'gulp watch'.
|----------------------------------------------------------
*/
const runWatcher = () => {
    // Run cleaner & builder before it starts watching source files.
    gulp.series(runCleaner, runBuilder)

    // Watch for changes to source files.
    gulp.watch(getFolderPath('sass', 'src'), processSASS)
    gulp.watch(getFolderPath('js', 'src'), processJS)
    gulp.watch(getFolderPath('html', 'src'), gulp.series(processHTML, injectResources))
}

module.exports.watch = runWatcher
