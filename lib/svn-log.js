var svnexec = require('./svn-exec')
  , template
  , log;

template = function (context) {
  return [
    'log'
  , '--verbose'
  , '--xml'
  , '--password'
  , context.password
  , '--username'
  , context.username
  , context.url + context.username
  ];
};

log = function (context, cb) {
  svnexec(template(context), cb);
};

module.exports = log;
