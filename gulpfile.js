var gulp = require('gulp'),
    gutil = require('gulp-util'),
    path = require('path'),
    argv = require('yargs')
       .alias('p', 'port')
       .alias('s', 'server')
       .argv;

var devServer = {
  port: argv.port || getRandomPortBasedOnPath(31337),
  server: argv.server || '0.0.0.0',
  livereload: getRandomPortBasedOnPath(35000),
  root: './dist'
};

var paths = {
  scripts: ['src/**/*.*'],
  markup: ['src/*.html'],
  styles: { paths: [ path.join(__dirname, 'src/styles') ] }
};

gulp.task('default', ['build', 'start static server', 'watch changes']);
gulp.task('build', ['make dist', 'run browserify', 'copy dist', 'compile less']);

gulp.task('run browserify', runBrowserify);
gulp.task('compile less', compileLess);
gulp.task('make dist', makeDist);
gulp.task('copy dist', copyDist);
gulp.task('watch changes', watchChanges);
gulp.task('start static server', startStaticServer);

function runBrowserify() {
  var fs = require('fs');

  var bundle = require('browserify')()
    .add('./src/index.js')
    .transform('babelify', { presets: ['es2015'] })
    .bundle()
    .on('error', function (err) {
        gutil.log(gutil.colors.red('Failed to browserify'), gutil.colors.yellow(err.message));
    });
  bundle.pipe(fs.createWriteStream(path.join(__dirname + '/dist/bundle.js')));
}

function compileLess() {
  var less = require('gulp-less')(paths.styles);
  less.on('error', function (err) {
    gutil.log(gutil.colors.red('Failed to compile less: '), gutil.colors.yellow(err.message));
  });

  gulp.src('src/styles/style.less')
    .pipe(less)
    .pipe(gulp.dest('dist/styles'));
}

function makeDist() {
  var fs = require('fs');
  if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist');
  }
  if (!fs.existsSync('./dist/data')) {
    fs.mkdirSync('./dist/data');
  }
  if (!fs.existsSync('./dist/textures')) {
    fs.mkdirSync('./dist/textures');
  }
}

function copyDist() {
  var concat = require('gulp-concat');

  gulp.src('./src/index.html')
      .pipe(gulp.dest('./dist'));
  gulp.src('./src/img/*')
      .pipe(gulp.dest('./dist/img'));
}

function watchChanges() {
  gulp.watch(paths.scripts, ['run browserify']);
  gulp.watch('src/styles/*.less', ['compile less']);
  gulp.watch(paths.markup, ['copy dist']);
  gulp.watch('dist/**').on('change', notifyLivereload);
}

var lr;
function startStaticServer() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: devServer.livereload }));
  app.use(express.static(devServer.root));
  app.listen(devServer.port, devServer.server, function () {
    gutil.log("opened server on http://" + devServer.server + ":" + devServer.port);
  });

  const SpotifyWebApi = require('spotify-web-api-node')
  const scopes = ['user-read-private', 'user-read-email']
  const redirectUri = '/spotiCallback'

  const spotify = new SpotifyWebApi({
    clientId : '9fab72d81931467e887b1b4b8c12732f',
    clientSecret : '56ffaa4c427440d89ee96afff745efe2',
    redirectUri : 'https://example.com/callback'
  });

  app.get('/spotifyToken', (req, res) => {
    spotify.clientCredentialsGrant()
    .then(data => {
      res.json({
        access_token: data.body['access_token']
      })
    })
    .then(() => start())
  })

  lr = require('tiny-lr')();
  lr.listen(devServer.livereload);
}

function notifyLivereload(event) {
  var fileName = require('path').relative(devServer.root, event.path);
  lr.changed({ body: { files: [fileName] } });
  var serverName = devServer.server === '0.0.0.0' ? '127.0.0.1' : devServer.server;
  gutil.log("Notified live reload for http://" + serverName + ":" + devServer.port);
}

function getRandomPortBasedOnPath(seed) {
  var sillyHash = getHash(__dirname);
  return Math.round(seed + sillyHash);
}

function getHash(str) {
  var result = 0;
  for (var i = 0; i < str.length; ++i) {
    result += str.charCodeAt(i);
  }

  return result;
}
