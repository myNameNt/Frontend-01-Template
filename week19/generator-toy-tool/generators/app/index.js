var Generator = require('yeoman-generator')
module.exports = class extends Generator {
  constructor(args,opts){
    super(args,opts)
  }
  collecting(){
    this.log('collecting')
  }
  creating (){
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('public/package.json'),
      {name: 'app-name' }
    )
    this.fs.copyTpl(
      this.templatePath('createElement.js'),
      this.destinationPath('public/lib/createElement.js')
    )
    this.fs.copyTpl(
      this.templatePath('gesture.js'),
      this.destinationPath('public/lib/gesture.js')
    )
    this.fs.copyTpl(
      this.templatePath('animation.js'),
      this.destinationPath('public/lib/animation.js')
    )
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('public/src/main.js')
    )
    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('public/.babelrc')
    )
    this.fs.copyTpl(
      this.templatePath('.nycrc'),
      this.destinationPath('public/.nycrc')
    )
    this.fs.copyTpl(
      this.templatePath('main.test.js'),
      this.destinationPath('public/test/main.test.js')
    )
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('public/webpack.config.js')
    )
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      {title: 'app-name-title' }
    )
    this.npmInstall([
      'webpack',
      'webpack-cli',
      'webpack-dev-server',
      'babel-loader',
      '@babel/core',
      '@babel/preset-env',
      '@babel/plugin-transform-react-jsx',
      'mocha',
      'nyc',
      '@istanbuljs/nyc-config-babel',
      'babel-plugin-istanbul',
      'babel/register',
      'html-webpack-plugin'
    ],{'save-dev': true})
  }

}