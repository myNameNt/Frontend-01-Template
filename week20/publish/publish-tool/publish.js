const http = require('http')
const queryString = require('querystring')
const { fstat } = require('fs')
const fs = require('fs')
const archiver = require('archiver')
const child_process = require('child_process')
let filename = 'package.zip'

let packageName = './package'
// fs.stat(filename, (error, stat) => {
  const redirect_uri = encodeURIComponent('http://localhost:8081/auth')
  child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.96937abd1cce7fe7&redirect_uri=${redirect_uri}&scope=read%2Fuse&state=haha`)

  const server = http.createServer((request,response)=>{
    let token = request.url.match(/token=([^&]+)/)[1]
    console.log('real publish')
    const options = {
      host: 'localhost',
      port: 8081,
      path: '/?filename=' + filename,
      method: 'POST',
      headers: {
        "token": token,
        "Content-Type": "application/octet-stream"
      }
    }

    const req = http.request(options,(res)=>{
      console.log(`STATUS: ${res.statusCode}`)
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
    })
  })

  req.on('error',(e)=>{
    console.error(`problem with request: ${e.message}`)
  })
  var archive = archiver('zip',{
    zlib: {level: 9}
  })
  archive.directory(packageName,false)

  archive.finalize()

  archive.pipe(req)
  archive.on('end',()=>{
    req.end()
    console.log('publish success')
    server.close()
  })
  server.listen(8080)
  // const options = {
  //   host: 'localhost',
  //   port: 8081,
  //   path: '/?filename=' + filename,
  //   method: 'POST',
  //   headers: {
  //     "Content-Type": "application/octet-stream"
  //   }
  // }
  // const req = http.request(options, (res) => {
  //   console.log(`STATUS: ${res.statusCode}`)
  //   console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
  // })


  // req.on('error', (e) => {
  //   console.error(`problem with request: ${e.message}`)
  // })

  // var archive = archiver('zip',{
  //   zlib: {level: 9}
  // })
  // archive.directory(packageName, false)
  // archive.finalize()
  // archive.pipe(req)
  // archive.on('end',()=>{

  //   req.end()
  //   const redirect_uri = encodeURIComponent('http://localhost:8081/auth')
  //   child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.96937abd1cce7fe7&redirect_uri=${redirect_uri}&scope=read%2Fuse&state=haha`)
  // })

  // let readStream = fs.createReadStream("./timg.jpg")
  // readStream.pipe(req)
  // readStream.on('end', () => {
  //   req.end()
  // })


// })

