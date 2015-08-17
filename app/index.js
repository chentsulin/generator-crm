'use strict';

var normalizeUrl = require('normalize-url');
var path = require('path');
var humanizeUrl = require('humanize-url');
var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');


module.exports = yeoman.generators.Base.extend({
	init: function() {
    var cb = this.async();

    this.prompt([{
			name: 'moduleName',
			message: 'What do you want to name your module?',
			default: this.appname.replace(/\s/g, '-'),
			filter: function(val) {
				return _s.slugify(val);
			}
		}, {
			name: 'githubUsername',
			message: 'What is your GitHub username?',
			store: true,
			validate: function(val) {
				return val.length > 0 ? true : 'You have to provide a username';
			}
		}, {
			name: 'website',
			message: 'What is the URL of your website?',
			store: true,
			validate: function(val) {
        return val.length > 0 ? true : 'You have to provide a website URL';
			},
			filter: function(val) {
        return normalizeUrl(val);
			}
		}, {
      name: 'flow',
      message: 'Do you need to use flow type?',
      type: 'confirm',
      default: false
    }],
    function(props) {
      var asyncCount = 0;
      this.moduleName = props.moduleName;
      this.camelModuleName = _s.camelize(props.moduleName);
      this.githubUsername = props.githubUsername;
      this.name = this.user.git.name();
      this.email = this.user.git.email();
      this.website = props.website;
      this.humanizedWebsite = humanizeUrl(this.website);
      this.flow = props.flow;


      this.template('editorconfig', '.editorconfig');
      this.template('gitattributes', '.gitattributes');
      this.template('gitignore', '.gitignore');
      this.template('eslintrc', '.eslintrc');
      this.template('travis.yml', '.travis.yml');
      this.template('index.js');
      this.template('LICENSE');
      this.template('CHANGELOG.md');
      // needed so npm doesn't try to use it and fail
      this.template('_package.json', 'package.json');
      this.template('README.md');
      this.template('babelrc', '.babelrc');


      function decreaseCount() {
        asyncCount--;
        if (asyncCount === 0) cb();
      }

      asyncCount++;
      mkdirp('src/utils', function(err) {
        if (err) console.error(err);
        this.template('index.js', path.join('src', 'index.js'));
        this.template('index.js', path.join('src', 'utils', 'index.js'));
        decreaseCount();
      }.bind(this));


      asyncCount++;
      mkdirp('test', function(err) {
        if (err) console.error(err);
        this.template('test.js', path.join('test', 'test.js'));
        decreaseCount();
      }.bind(this));

      asyncCount++;
      mkdirp('examples/simple/components', function(err) {
        if (err) console.error(err);
        this.template(
          path.join('example', 'components', 'App.js'),
          path.join('examples', 'simple', 'components', 'App.js')
        );
        this.template(
          path.join('example', 'index.html'),
          path.join('examples', 'simple', 'index.html')
        );
        this.template(
          path.join('example', 'index.js'),
          path.join('examples', 'simple', 'index.js')
        );
        this.template(
          path.join('example', 'server.js'),
          path.join('examples', 'simple', 'server.js')
        );
        this.template(
          path.join('example', 'webpack.config.js'),
          path.join('examples', 'simple', 'webpack.config.js')
        );
        this.template(
          path.join('example', '_package.json'),
          path.join('examples', 'simple', 'package.json')
        );
        decreaseCount();
      }.bind(this));

    }.bind(this));
	},
	install: function() {
    this.installDependencies({ bower: false });
  }
});
