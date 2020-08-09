
export function enableGesture (body) {
  let contexts = Object.create(null)
  let MOUSE_SYMBOL = Symbol('mouse')

  // if (document.ontouchstart != null) { 判断是否为移动端 若为移动端不监听下面的方法
    body.addEventListener('mousedown', function (event) {
      contexts[MOUSE_SYMBOL] = Object.create(null)
      start(event, contexts[MOUSE_SYMBOL])
      let mousemove = (event) => {
        move(event, contexts[MOUSE_SYMBOL])
      }
      let mouseend = (event) => {
        end(event, contexts[MOUSE_SYMBOL])
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseend)
      }

      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseend)
    })
  // }


  body.addEventListener('touchstart', (event) => {
    for (let touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null)
      start(touch, contexts[touch.identifier])
    }
  })
  body.addEventListener('touchmove', (event) => {
    for (let touch of event.changedTouches) {
      move(touch, contexts[touch.identifier])
    }
  })

  body.addEventListener('touchend', (event) => {
    for (let touch of event.changedTouches) {
      end(touch, contexts[touch.identifier])
      delete contexts[touch.identifier]
    }
  })

  body.addEventListener('touchcancel', (event) => { // 这个事件是当touchmove的时候被打断了 就会触发这个事件 发生的情况是系统强任务被执行（setTimeout）
    cancel(touch, contexts[touch.identifier])
    delete contexts[touch.identifier]
  })


  let start = (point, context) => {
    body.dispatchEvent(new CustomEvent('start', {
      detail: {
        startX: point.clientX,
        startY: point.clientY,
        clientX: point.clientX,
        clientY: point.clientY
      }
    }))
    context.startX = point.clientX
    context.startY = point.clientY
    context.isTap = true
    context.isPan = false
    context.isPress = false
    context.moves = []
    console.log('tap')
    context.timeHandle = setTimeout(() => {
      if (context.isPan) {
        return
      }
      context.isTap = false
      context.isPan = false
      context.isPress = true
      body.dispatchEvent(new CustomEvent('pressstart', {}))
    }, 500);
  }

  let move = (point, context) => {
    let dx = point.clientX - context.startX
    let dy = point.clientY - context.startY

    if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      if (context.isPress) {
        body.dispatchEvent(new CustomEvent('presscancel', {}))
      }
      context.isTap = false
      context.isPan = true
      context.isPress = false
      body.dispatchEvent(new CustomEvent('panstart', {
        detail: {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY
        }
      }))
    }

    if (context.isPan) {
      context.moves.push({
        dx,
        dy,
        ts: Date.now()
      })
      context.moves = context.moves.filter(({ ts }) => Date.now() - ts < 300)
      body.dispatchEvent(new CustomEvent('pan', {
        detail: {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY
        }
      }))
    }
  }

  let end = (point, context) => {
    if (context.isPan) {
      let dx = point.clientX - context.startX
      let dy = point.clientY - context.startY
      const record = context.moves[0]
      let speed = Math.sqrt(((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.ts))
      const isFlick = speed > 4.5
      if (isFlick) {
        body.dispatchEvent(new CustomEvent('flick', {
          detail: {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY,
            speed,
            isFlick
          }
        }))
      }
      body.dispatchEvent(new CustomEvent('panend', {
        detail: {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY,
          speed,
          isFlick
        }
      }))
    }
    if (context.isTap) {
      body.dispatchEvent(new CustomEvent('tap', {}))
      console.log('tapEnd')
    }
    if (context.isPress) {
      body.dispatchEvent(new CustomEvent('pressend', {}))
    }
    clearTimeout(context.timeHandle)
  }
  let cancel = (point, context) => {
    body.dispatchEvent(new CustomEvent('canceled', {}))
    clearTimeout(context.timeHandle)
  }
}
