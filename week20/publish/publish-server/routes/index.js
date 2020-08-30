var express = require('express');
var router = express.Router();
const fs = require('fs')
/* GET home page. */
router.get('/', function (request, res, next) {
  // let body = []
  // console.log('send--')
  // request.on('data', (chunk) => {
  //   body.push(chunk)
  // }).on('end', () => {
  //   body = Buffer.concat(body).toString()
  //   console.log(request.query.filename,'----filename')
    
  // })
  fs.writeFileSync(`../server/public/${request.query.filename}`, request.body.content)

  // res.render('index', { title: 'Express' });
});

module.exports = router;
