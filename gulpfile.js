var envfile = require('envfile'),
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  nodemon = require('gulp-nodemon'),
  watch = require('gulp-watch'),
  image = require('gulp-image'),
  clean = require('gulp-clean');

gulp.task('clean', function () {
  return gulp.src(['build/css/*', 'build/js/*'], {read: false})
    .pipe(clean());
});

gulp.task('image', function () {
  gulp.src('./src/img/**/**')
    .pipe(image())
    .pipe(gulp.dest('./build/img'));

  gulp.src('./favicon.ico')
    .pipe(gulp.dest('./build'));
});

gulp.task('js-deps', function () {
  gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    './src/js/TweenMax.min.js',
    './src/js/jquery.gsap.min.js',
    './src/js/Draggable.min.js',
    ])
    .pipe(concat('deps.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('css-deps', function () {
  gulp.src([
    'node_modules/swiper/dist/css/swiper.min.css',
    ])
    .pipe(concat('deps.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('html', function () {
  gulp.src(
    './index.html'
    )
    .pipe(gulp.dest('./build'));
});

gulp.task('css', function () {
  gulp.src([
      './src/css/font.css',
      './src/css/main.css',
    ])
    .pipe(gulp.dest('./build/css'));
});

gulp.task('fonts', function () {
  gulp.src([
      './src/fonts/**/*.*'
    ])
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task('js', function () {
  gulp.src([
      './src/js/application.js',
      './src/js/script.js',
    ])
    .pipe(gulp.dest('./build/js'));
});

gulp.task('serve', function () {
  var env = envfile.parseFileSync('.env');
  nodemon({
    script: './index.js',
    ext: 'html js',
    ignore: ['build/**/*.*', 'src/**/*.*', 'node_modules'],
    tasks: [],
    env: env
  }).on('restart', function () {
    console.log('server restarted....');
  });
});

gulp.task('watch', function () {
  watch(['./src/js/*.js', './src/js/**/*.js'], function () {
    gulp.start('js');
  });

  watch('./src/css/*.css', function () {
    gulp.start('css');
  });

  watch('./index.html', function () {
    gulp.start('html');
  });
});

gulp.task('default', ['clean', 'js-deps', 'css-deps', 'html', 'css', 'js', 'watch', 'serve', 'fonts']);
