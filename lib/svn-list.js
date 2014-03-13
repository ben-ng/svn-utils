var svnexec = require('./svn-exec')
  , template
  , list;

template = function (context) {
  return [
    'list'
  , '--xml'
  , '--recursive'
  , '--password'
  , context.password
  , '--username'
  , context.username
  , context.url + context.username
  ];
};

list = function (context, cb) {
  svnexec(template(context), cb);
};

module.exports = list;
