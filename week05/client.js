const net = require('net')

class Request {

}

class Response {

}

// net.connect({
//     address: 'location',
//     port: '8888',
//     onread: {
//         buffer: Buffer.alloc(4*1024),
//         callback: function (nread, buf) {
//             console.log(buf.toString('utf8',0,nread))
//         }
//     }
// })
let client = net.createConnection({port: 8888,host: '127.0.0.1'}, ()=>{
    console.log('connect to server')
    client.write('world \r \n')
})
client.on('data', (data)=>{
    console.log(data.toString())
    client.end()
})

client.on('end', function(){
    console.log('disconnected from server')
})