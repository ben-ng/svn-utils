var spawn = require('child_process').spawn
  , parseXML = require('xml2js').parseString
  , svnexec;

svnexec = function (args, cb) {
  var svnProc
    , stdout = []
    , stderr = [];

  svnProc = spawn.apply(this, ['svn', args]);

  svnProc.stdout.on('data', function (data) {
    stdout.push(data);
  });

  svnProc.stderr.on('data', function (data) {
    stderr.push(data);
  });

  svnProc.on('close', function (code) {
    if(code !== 0)
      return cb(new Error('svn exited with code: ' + code + '\n' + stderr.join('')));

    parseXML(stdout.join(''), cb);
  });
};

module.exports = svnexec;
