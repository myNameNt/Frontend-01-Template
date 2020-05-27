let css = require('css')
let obj = css.parse('body { font-size: 12px; }', options)
css.stringify(obj, options)