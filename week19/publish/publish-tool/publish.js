const http = require('http')
const queryString = require('querystring')
const { fstat } = require('fs')
const fs = require('fs')
const archiver = require('archiver')
let filename = 'package.zip'

let packageName = './package'
// fs.stat(filename, (error, stat) => {

  const options = {
    host: 'localhost',
    port: 8081,
    path: '/?filename=' + filename,
    method: 'POST',
    headers: {
      "Content-Type": "application/octet-stream"
    }
  }
  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
  })


  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`)
  })

  var archive = archiver('zip',{
    zlib: {level: 9}
  })
  archive.directory(packageName, false)
  archive.finalize()
  archive.pipe(req)
  archive.on('end',()=>{
    req.end()
  })

  // let readStream = fs.createReadStream("./timg.jpg")
  // readStream.pipe(req)
  // readStream.on('end', () => {
  //   req.end()
  // })


// })

