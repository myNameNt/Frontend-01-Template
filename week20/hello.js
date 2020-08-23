var page = require('webpage').create()
page.open('http://www.baidu.com', function (status){
  console.log('Status:', status)
  if (status === 'success') {
    // 不支持let 等语法 es6
    var body = page.evaluate(function(){
      var toString = function (pad,element){
        var children = element.childNodes

      }
    })
    // var title = page.evaluate(function(){
    //   return document.title
    // })
    // console.log(title)
  }
  phantom.exit()
})