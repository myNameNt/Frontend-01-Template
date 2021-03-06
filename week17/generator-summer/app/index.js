var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.argument('appname', {type: String, required: true})
  }
  async prompting () {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'you need project title'
      }
    ])
  }
  writing (){
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      {
        title: this.answers.name
      }
    )
  }
  // installingLodash(){
  //   this.npmInstall(['lodash'], {'save-dev': true})
  // }
};