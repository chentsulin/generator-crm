'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const pwd = path.resolve('./');


describe('generator', () => {
  let generator;

  beforeEach((done) => {
    const deps = ['../app'];

    helpers.testDirectory(path.join(__dirname, 'temp'), (err) => {
      if (err) return done(err);
      generator = helpers.createGenerator('cfm:app', deps, null, { skipInstall: true });
      done();
    });
  });

  afterEach(() => {
    process.chdir(pwd);
  });

  it('generates expected files', (done) => {
    const expected = [
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.eslintrc',
      '.eslintignore',
      '.travis.yml',
      '.babelrc',
      'CHANGELOG.md',
      'LICENSE',
      'package.json',
      'README.md',
      'webpack.config.development.js',
      'webpack.config.production.js',
      path.join('src', 'index.js'),
      path.join('src', 'utils', 'index.js'),
      path.join('test', 'test.js'),
      path.join('examples', 'simple', 'index.html'),
      path.join('examples', 'simple', 'index.js'),
      path.join('examples', 'simple', 'server.js'),
      path.join('examples', 'simple', 'webpack.config.js'),
      path.join('examples', 'simple', 'package.json'),
      path.join('examples', 'simple', '.babelrc'),
      path.join('examples', 'simple', 'components', 'App.js'),
    ];

    helpers.mockPrompt(generator, {
      moduleName: 'test',
      githubUsername: 'test',
      website: 'test.com',
      flow: false,
    });

    generator.run(() => {
      assert.file(expected);
      done();
    });
  });

  it('flow option', (done) => {
    helpers.mockPrompt(generator, {
      moduleName: 'test',
      githubUsername: 'test',
      website: 'test.com',
      flow: true,
    });

    generator.run(() => {
      assert.file('.flowconfig');
      assert.fileContent('package.json', /"check":/);
      done();
    });
  });
});
