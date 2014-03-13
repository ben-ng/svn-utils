/* globals describe, it, before */
var log = require('../lib/svn-log')
  , list = require('../lib/svn-list')
  , assert = require('assert')
  , read = require('read')
  , context = {
      url: 'https://subversion.ews.illinois.edu/svn/sp14-cs242/'
    , username: 'kbng2'
    , password: process.env.SVN_PASSWORD
    };

describe('svn', function () {

  // Get password before running tests
  before(function (next) {
    // If password was provided as an env var, just keep going
    if(context.password != null)
      return next();

    read({
      prompt: 'Enter password for kbng2:'
    , silent: true
    }, function (err, res, isDefault) {
      if(err)
        throw err;

      if(isDefault)
        throw new Error('I need a password to test this');

      context.password = res;

      next();
    });
  });

  it('svn log kbng2 should work', function (done) {
    log(context, function (err, data) {
      assert.ifError(err);
      assert.ok(data);
      done();
    });
  });

  it('svn list kbng2 should work', function (done) {
    this.timeout(120000);

    list(context, function (err, data) {
      assert.ifError(err);
      assert.ok(data);
      done();
    });
  });

});
