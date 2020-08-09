let css = require('css')

module.exports = function (source,map) {
  let stylesheet = css.parse(source)
  let name = this.resourcePath.match(/([^/]+).css$/)[1]
  for (let rule of stylesheet.stylesheet.rules) {
    rule.selector = rule.selectors.map((selector)=>{
      selector.match(new RegExp(`^.${name}`)) ? selector : `.${name} ${selector}`
    })
  }
  return `
  let styleElement = document.createElement('style')
  styleElement.innerHTML = ${JSON.stringify(css.stringify(stylesheet))}
  document.body.appendChild(styleElement)
  `
}