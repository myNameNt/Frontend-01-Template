import { TimeLine, Animation, ease, linear } from './animation'
import { createElement } from "./createElement";
export class Carousel {
  constructor() {
    this.root = null
    this.data = null
    this.position = 0
  }
  setAttribute (name, value) {
    this[name] = value;
  }
  appendChild (child) {
    this.children.push(child)
  }
  render () {
    let timeLine = new TimeLine
    timeLine.start()
    let nextPicStopHandler = null

    let children = this.data.map((url, currentPosition) => {
      let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length
      let nextPosition = (currentPosition + 1) % this.data.length

      let offset = 0
      let onStart = () => {
        timeLine.pause()
        clearTimeout(nextPicStopHandler)
        let currentElement = children[currentPosition]
        let currentTransformValue = currentElement.style.transform ? Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]) : 0
        offset = currentTransformValue + 200 * currentPosition

      }

      let onPan = (event) => {
        let lastElement = children[lastPosition]
        let currentElement = children[currentPosition]
        let nextElement = children[nextPosition]

        let dx = event.detail.clientX - event.detail.startX
        let currentTransformValue = -200 * currentPosition + offset + dx
        let lastTransformValue = -200 - 200 * lastPosition + offset + dx
        let nextTransformValue = 200 - 200 * nextPosition + offset + dx


        currentElement.style.transform = `translateX(${currentTransformValue}px)`
        lastElement.style.transform = `translateX(${lastTransformValue}px)`
        nextElement.style.transform = `translateX(${nextTransformValue}px)`
      }

      let onPanend = (event) => {
        let lastElement = children[lastPosition]
        let currentElement = children[currentPosition]
        let nextElement = children[nextPosition]
        let direction = 0
        let dx = event.detail.clientX - event.detail.startX

        console.log(event.detail)
        if (dx + offset > 100 || dx > 0 && event.detail.isFlick) {
          direction = 1
        } else if (dx + offset < -100 || dx < 0 && event.detail.isFlick) {
          direction = -1
        }
        timeLine.reset()
        timeLine.start()
        const lastStart = -200 - 200 * lastPosition + offset + dx
        const currentStart = -200 * currentPosition + offset + dx
        const nextStart = 200 - 200 * nextPosition + offset + dx

        const lastEnd = -200 - 200 * lastPosition + direction * 200
        const currentEnd = -200 * currentPosition + direction * 200
        const nextEnd = 200 - 200 * nextPosition + direction * 200
        let lastAnimation = new Animation(lastElement.style, 'transform', lastStart, lastEnd, 500, 0, linear, v => `translateX(${v}px)`)
        let currentAnimation = new Animation(currentElement.style, 'transform', currentStart, currentEnd, 500, 0, linear, v => `translateX(${v}px)`)
        let nextAnimation = new Animation(nextElement.style, 'transform', nextStart, nextEnd, 500, 0, linear, v => `translateX(${v}px)`)

        timeLine.add(lastAnimation)
        timeLine.add(currentAnimation)
        timeLine.add(nextAnimation)
      }
      let element = <img src={url} onStart={() => onStart()} onPan={onPan} onPanend={onPanend} enableGesture={true} />
      element.addEventListener('dragstart', function (event) { event.preventDefault() })
      return element
    })


    let nextPic = () => {
      let nextPosition = (this.position + 1) % this.data.length
      let current = children[this.position]
      let next = children[nextPosition]
      let currentAnimation = new Animation(current.style, 'transform', -100 * this.position, -100 - 100 * this.position, 500, 0, linear, v => `translateX(${2 * v}px)`)
      let nextAnimation = new Animation(next.style, 'transform', 100 - 100 * nextPosition, -100 * nextPosition, 500, 0, linear, v => `translateX(${2 * v}px)`)
      timeLine.add(currentAnimation)
      timeLine.add(nextAnimation)

      this.position = nextPosition
      nextPicStopHandler = setTimeout(nextPic, 3000)
    }
    nextPicStopHandler = setTimeout(nextPic, 3000)
    return <div class="carousel">
      {children}
    </div>
  }
  mountTo (parent) {
    this.render().mountTo(parent);
  }
}