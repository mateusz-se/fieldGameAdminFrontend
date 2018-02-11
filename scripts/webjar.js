(function () {
  var fs = require('fs');
  var archiver = require('archiver');

  var OUT_DIR = __dirname + '/../out';
  fs.mkdir(OUT_DIR, function(){});

  var output = fs.createWriteStream(OUT_DIR + '/app.war');
  var archive = archiver('zip', {
    zlib: {level: 9}
  });
  

  archive.pipe(output);
  archive.directory('dist/', false);
  archive.finalize();
})();