'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;
var pwd = path.resolve('./');


describe('generator', function() {

  beforeEach(function(cb) {
    var deps = ['../app'];

    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) return cb(err);
      this.generator = helpers.createGenerator('cfm:app', deps, null, { skipInstall: true });
      cb();
    }.bind(this));
  });

  afterEach(function() {
    process.chdir(pwd);
  });

  it('generates expected files', function(cb) {
    var expected = [
			'.editorconfig',
			'.gitattributes',
			'.gitignore',
			'.eslintrc',
			'.travis.yml',
      '.babelrc',
			'CHANGELOG.md',
			'LICENSE',
			'package.json',
			'README.md',
      path.join('src', 'index.js'),
      path.join('src', 'utils', 'index.js'),
      path.join('test', 'test.js'),
      path.join('examples', 'simple', 'index.html'),
      path.join('examples', 'simple', 'index.js'),
      path.join('examples', 'simple', 'server.js'),
      path.join('examples', 'simple', 'webpack.config.js'),
      path.join('examples', 'simple', 'package.json'),
      path.join('examples', 'simple', 'components', 'App.js')
		];

    helpers.mockPrompt(this.generator, {
			moduleName: 'test',
			githubUsername: 'test',
			website: 'test.com',
			flow: false
		});

    this.generator.run(function() {
      assert.file(expected);
      cb();
    });
  });

  it('flow option', function(cb) {
    helpers.mockPrompt(this.generator, {
			moduleName: 'test',
			githubUsername: 'test',
			website: 'test.com',
			flow: true
		});

    this.generator.run(function() {
      assert.file('.flowconfig');
      assert.fileContent('package.json', /"check":/);
      cb();
    });
  });
});
