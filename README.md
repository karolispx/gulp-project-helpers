# Automating project tasks using [Gulp.js](https://gulpjs.com).

The purpose of this project was to learn more about [Gulp.js](https://gulpjs.com) & all the new features in version 4! 
This project has been build using HTML, SASS, Bootstrap & jQuery just to keep it simple.

Feel free to use these scripts in your own projects!

---

## You will need to have [Gulp.js](https://gulpjs.com/docs/en/getting-started/quick-start) & [Node.js](https://nodejs.org) installed to run this project.

---


## Scripts/features included in this project:

* Minify, rename & concatenate files. 
* Move, remove & regenerate directories.
* Inject CSS & JS links to header and footer.
* Compile SASS into CSS.
* Enable/disable `sourcemaps`. 
* `gulp-server-livereload` package is included in the project which allows spinning up development server in less that a second!
* `livereloader` is also included in `gulp-server-livereload` package. It automatically refreshes browser window once it detects that there's changes made to `public` files.
* `watcher` task can be ran which monitors source files continuously, once it detects changes made to source files - i.e. SASS file changed - it run `sass` task to compile SASS into CSS.
* Both the `watcher` & `gulp-server-livereload` work together nicely. The `watcher` detects changes made source files so it does its thing, compiles SASS, minifies JS etc. Once it does that - it makes changes to the `public` directory, which is being watched by `livereloader` - which reloads the webpage immediately!
  

---


## Getting Started:

* Clone or **[`DOWNLOAD`](https://github.com/karolispx/gulp-project-helpers/archive/master.zip)** this repository.
* Open this project in your terminal.
* Run `npm install` which which install all dependencies.
* Run `gulp` in one terminal window which will start a webserver with `livereloader`.
* Run `gulp watch` in another terminal window which will be watching `./src/` directory & will automatically run appropriate tasks if changes are made to SASS/JS or HTML files. 


---


## Available Commands:

#### `gulp sass`
* Compiles all SASS files from `./src/sass/` directory.
* Generates ONE `style.min.css` file containing minified CSS code & source maps.
* Saves this new CSS file in `./public/css/` directory.

#### `gulp js`
* Minifies all JS files from `./src/js/` directory.
* Generates ONE `scripts.min.js` file containing minified JS code & source maps.
* Saves this new JS file in `./public/js/` directory.

#### `gulp html`
* Minifies all HTML files from `./src/html/` directory.
* Generates appropriate HTML files containing minified HTML code.
* Saves all new HTML files in `./public/html/` directory.

#### `gulp clean`
* Deletes `./public/` directory with all the resources.

#### `gulp build`
* Regenerates `./public/` directory with all resources by running `gulp sass`, `gulp js` & `gulp html` tasks.

#### `gulp watch`
* Runs `gulp clean` & `gulp build` tasks beforehand to ensure that all files are in place before it starts watching source files. 
* Monitors source files in `./src/sass/`, `./src/js/` & `./src/html/` directory continuously.
* Triggers appropriate task from above (`gulp sass`, `gulp js` or `gulp html`) if changes have been detected in either of the directories.
* You can safely stop this watcher by pressing `CTRL + C` / `CMD + C` keys at the same time.

#### `gulp inject`
* Injects links to CSS & JS resources in all HTML files in `./public/html/` directory.
* It runs right after `gulp html` task and injects links to CSS and JS resources.

#### `gulp vendor`
* Process vendor assets - move the whole `./src/vendor/` folder to `./public/vendor/` directory.

#### `gulp`
* Runs `gulp clean` & `gulp build` tasks beforehand to ensure that all files are in place before it starts serving content.
* Starts a webserver & enables `livereloader` which will automatically refresh your browser window once it detects changes made to resources in `./public/` directory.


---


## Application's Structure:


* **public** - public directory of the project.
  * *You should never have to make any changes to resources in this directory as this directory gets regenerated all the time.*
* **[`src`](https://github.com/karolispx/gulp-project-helpers/tree/master/src)** - source directory of the project - this is where SASS/JS/HTML changes are made.
* **[`src/html`](https://github.com/karolispx/gulp-project-helpers/tree/master/src/html)** - directory for HTML files.
* **[`src/js`](https://github.com/karolispx/gulp-project-helpers/tree/master/src/js)** - directory for JS files.
* **[`src/sass`](https://github.com/karolispx/gulp-project-helpers/tree/master/src/sass)** - directory for SASS files.
* **[`gulpfile.js`](https://github.com/karolispx/gulp-project-helpers/blob/master/gulpfile.js)** - main file of the project containing all tasks and logic.


---


## Development Dependencies:

* **[`gulp`](https://www.npmjs.com/package/gulp)** - gulp toolkit.
* **[`gulp-clean`](https://www.npmjs.com/package/gulp-clean)** - used for deleting resources.
* **[`gulp-concat`](https://www.npmjs.com/package/gulp-concat)** - concatenates several files into one file.
* **[`gulp-htmlmin`](https://www.npmjs.com/package/gulp-htmlmin)** - used for minifying HTML.
* **[`gulp-rename`](https://www.npmjs.com/package/gulp-rename)** - allows renaming files - adding suffix to minified JS/CSS files.
* **[`gulp-sass`](https://www.npmjs.com/package/gulp-sass)** & **[`node-sass`](https://www.npmjs.com/package/node-sass)** - used for compiling SASS to CSS.
* **[`gulp-terser`](https://www.npmjs.com/package/gulp-terser)** - used for minifying/uglifying JS.
* **[`gulp-server-livereload`](https://www.npmjs.com/package/gulp-server-livereload)** - used for spinning up a webserver for local development.
* **[`gulp-inject`](https://www.npmjs.com/package/gulp-inject)** - used for injecting CSSS/JS tags into HTML code.


---


## Creating New Tasks:

### Here's a few very simple examples that you can paste into the **[`gulpfile.js`](https://github.com/karolispx/gulp-project-helpers/blob/master/gulpfile.js)** to see how easy it is to write new tasks!


___


**Display `HELLO WORLD :)` in terminal** 
   - *Trigger this task by running: `gulp hello`.*
```js
const helloTaskCallback = () => {
    console.log('HELLO WORLD :)')
}

module.exports.hello = helloTaskCallback
```

---


**Display`(: WORLD HELLO` in terminal** 
   - *Trigger this task by running: `gulp world`.*
```js
module.exports.world = () => {
    console.log('(: WORLD HELLO')
}
```
