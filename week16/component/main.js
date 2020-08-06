
import { createElement } from "./createElement";
import { enableGesture } from './geusture'
import { TimeLine, Animation, ease } from './animation'
enableGesture(document.body)
class Carousel {
  constructor() {
    this.root = null
    this.data = null
    this.position = 0
  }
  setAttribute (name, value) {
    this[name] = value;
  }
  init () {
    // this.data = data
    this.root = document.getElementById('box')
    this.root.classList.add('carousel')
    for (let d of this.data) {
      let element = document.createElement('img')
      element.src = d
      element.addEventListener('dragstart', function (event) { event.preventDefault() })
      this.root.appendChild(element)
    }
    this.render()
  }
  render () {
    let timeLine = new TimeLine
    timeLine.start()
    let nextPic = () => {
      let nextPosition = (this.position + 1) % this.data.length
      let current = this.root.children[this.position]
      let next = this.root.children[nextPosition]
      let currentAnimation = new Animation(current.style, 'transform', -100 * this.position, -100 - 100 * this.position, 500, 0, ease, v => `translateX(${v}%)`)
      let nextAnimation = new Animation(next.style, 'transform', 100 - 100 * nextPosition, -100 * nextPosition, 500, 0, ease, v => `translateX(${v}%)`)
      timeLine.add(currentAnimation)
      timeLine.add(nextAnimation)
      
      this.position = nextPosition
      setTimeout(nextPic, 3000)
    }
    setTimeout(nextPic, 3000)
    this.root.addEventListener('mousedown', event => {
      let startX = event.clientX;
      let nextPosition = (this.position + 1) % this.data.length
      let lastPosition = (this.position - 1 + this.data.length) % this.data.length

      let current = this.root.children[this.position]
      let next = this.root.children[nextPosition]
      let last = this.root.children[lastPosition]
      current.style.transition = 'ease 0s'
      next.style.transition = 'ease 0s'
      last.style.transition = 'ease 0s'

      current.style.transform = `translateX(${- 200 * this.position}px)`
      next.style.transform = `translateX(${200 - 200 * nextPosition}px)`
      last.style.transform = `translateX(${- 200 - 200 * lastPosition}px)`

      let move = (event) => {
        current.style.transform = `translateX(${event.clientX - startX - 200 * this.position}px)`
        next.style.transform = `translateX(${event.clientX - startX + 200 - 200 * nextPosition}px)`
        last.style.transform = `translateX(${event.clientX - startX - 200 - 200 * lastPosition}px)`
      }
      let up = (event) => {
        let offset = 0
        if (event.clientX - startX > 100) {
          offset = 1
        } else if (event.clientX - startX < -100) {
          offset = -1
        }

        current.style.transition = 'ease 1s'
        next.style.transition = 'ease 1s'
        last.style.transition = 'ease 1s'

        current.style.transform = `translateX(${offset * 200 - 200 * this.position}px)`
        next.style.transform = `translateX(${offset * 200 + 200 - 200 * nextPosition}px)`
        last.style.transform = `translateX(${offset * 200 - 200 - 200 * lastPosition}px)`
        console.log((this.position - offset + this.data.length) % this.data.length, 'up')
        this.position = (this.position - offset + this.data.length) % this.data.length
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    })
  }
  mountTo (parent) {
    this.init()
    // this.render().mountTo(parent);
  }
}
let component = <Carousel data={[
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]} />

component.mountTo(document.body);