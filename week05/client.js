const net = require('net')

class Request {
  // method url = host + port + path
  // body = k/v
  // headers
  constructor(options) {
    this.method = options.method || 'GET'
    this.host = options.host;
    this.port = options.host || 80
    this.path = options.path || '/'
    this.body = options.body || {}
    this.headers = options.headers || {}
    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = 'application/x-www-form-urlencoded'
    }

    if (this.headers["Content-Type"] === 'application/json') {
      this.bodyText = JSON.stringify(this.body)
    } else if (this.headers["Content-Type"] === 'application/x-www-form-urlencoded') {
      this.bodyText = Object.keys(this.body).map(key => {
        return `${key}=${encodeURIComponent(this.body[key])}`
      }).join('&')
    }
    this.headers['Content-Length'] = this.bodyText.length
  }
  toString () {
    return [
      `${this.method} ${this.path} HTTP/1.1`,
      `${Object.entries(this.headers).map(([k, v]) => `${k}: ${v}`).join('\r\n')}`,
      '',
      `${this.bodyText}`
    ].join('\r\n');
  }
  send (connection) {
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser;
      if (connection) {
        connection.write(this.toString())
      } else {
        connection = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          connection.write(this.toString())
        })
      }

      connection.on('data', (data) => {
        parser.receive(data.toString())
        // resolve(data.toString())
        console.log(parser.headers, 'statusLine')
        connection.end()
      })
      connection.on('error', (error) => {
        reject(error)
      })

    })

  }
}

class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_NAME_END = 3;
    this.WAITING_HEADER_SPACE = 4;
    this.WAITING_HEADER_VALUE = 5;
    this.WAITING_HEADER_LINE_END = 6;
    this.WAITING_HEADER_BLOCK_END = 7;
    this.WAITING_BODY = 8;

    this.current = this.WAITING_STATUS_LINE
    this.statusLine = []
    this.headers = {}
    this.headerName = ''
    this.headerValue = ''
  }
  receive (string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i))
    }
  }
  receiveChar (char) {
    if (this.current === this.WAITING_STATUS_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_STATUS_LINE_END
      } else {
        this.statusLine += char;
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      this.current = this.WAITING_HEADER_NAME;
    } else if (this.current === this.WAITING_HEADER_NAME) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_BLOCK_END
      } else if (char === ':') {
        this.current = this.WAITING_HEADER_SPACE;
      } else {
        this.headerName += char;
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) {
      this.current = this.WAITING_HEADER_VALUE
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue;
        this.headerName = '';
        this.headerValue = '';
      } else {
        this.headerValue += char;
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      this.current = this.WAITING_HEADER_NAME
    } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      this.current = this.WAITING_BODY
      if (this.headers['Transfer-Encoding'] === 'chunked') {
        this.bodyParser = new TrunkedBodyParser()
      }
    } else if (this.current === this.WAITING_BODY) {
      this.bodyParser.receiveChar(char)
    }
  }
}
class TrunkedBodyParser {
  constructor() {
    this.WAITING_LENGTH = 0
    this.WAITING_LENGTH_LINE_END = 1
    this.READING_TRUNK = 2

    this.WAITING_NEW_LINE = 3
    this.WAITING_NEW_LINE_END = 4
    this.length = 0
    this.content = []
    this.isFinished = false
    this.current = this.WAITING_LENGTH
  }
  receiveChar(char) {
    if (this.current === this.WAITING_LENGTH) {
      if (char === '\r') {
        if (this.length === 0) {
          this.isFinished = true
        }
        this.current = this.WAITING_LENGTH_LINE_END
      } else {
        this.length *= 10
        this.length += char.charCodeAt(0) - '0'.charCodeAt(0)
      }
    } else if (this.current === this.WAITING_LENGTH_LINE_END) {
      if (char === '\n') {
        this.current = this.READING_TRUNK
      }
    } else if (this.current === this.READING_TRUNK) {
      this.content.push(char)
      this.length--
      if (this.length === 0) {
        this.current = this.WAITING_NEW_LINE
      }
    } else if (this.current === this.WAITING_NEW_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_NEW_LINE_END
      }
    } else if (this.current === this.WAITING_NEW_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_LENGTH
      }
    }
  }
}
let client = net.createConnection({ port: 8888, host: '127.0.0.1' }, () => {

  void async function () {
    let request = new Request({
      method: 'GET',
      host: '127.0.0.1',
      port: '8888',
      path: '/',
      body: {
        name: 'ha'
      }
    })
    let response = await request.send(client)
    console.log(response)
  }()

})


client.on('end', function () {
  console.log('disconnected from server')
})