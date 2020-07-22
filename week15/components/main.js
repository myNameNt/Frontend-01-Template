
import {createElement} from "./createElement";

class Carousel {
  constructor() {
    this.root = null
    this.data = null
    this.position = 0
  }
  setAttribute(name, value) {
    this[name] = value;
  }
  init () {
    // this.data = data
    this.root = document.getElementById('box')
    this.root.classList.add('carousel')
    for (let d of this.data) {
      let element = document.createElement('img')
      element.src = d
      element.addEventListener('dragstart', function (event){event.preventDefault()})
      this.root.appendChild(element)
    }
    this.render()
  }
  render() {
    let nextPic = () => {
      let nextPosition = (this.position + 1) % this.data.length
      let current = this.root.children[this.position]
      let next = this.root.children[nextPosition]

      current.style.transition = ''
      next.style.transition = ''

      current.style.transform = `translateX(${ - 100 * this.position}%)`
      next.style.transform = `translateX(${100 -100 * nextPosition}%)`
      // 上面是初始化位置
      setTimeout(() => {
        // 下面这里是因为 在初始化位置之后  改变transition不会生效 需要使用 setTimeout 
        current.style.transition = 'ease 1s'
        next.style.transition = 'ease 1s'

        current.style.transform = `translateX(${-100 -100 * this.position}%)`
        next.style.transform = `translateX(${-100 * nextPosition}%)`
        this.position = nextPosition
      }, 16)


      setTimeout(nextPic,3000)
    }
    this.root.addEventListener('mousedown', event => {
      let startX = event.clientX;
      let nextPosition = (this.position + 1) % this.data.length
      let lastPosition = (this.position - 1 + this.data.length) % this.data.length

      let current = this.root.children[this.position]
      let next = this.root.children[nextPosition]
      let last = this.root.children[lastPosition]
      console.log(this.position)
      current.style.transition = 'ease 0s'
      next.style.transition = 'ease 0s'
      last.style.transition = 'ease 0s'
      
      current.style.transform = `translateX(${- 200 * this.position}px)`
      next.style.transform = `translateX(${ 200 - 200 * nextPosition}px)`
      last.style.transform = `translateX(${ - 200 - 200 * lastPosition}px)`

      let move = (event) => {
        current.style.transform = `translateX(${event.clientX - startX - 200 * this.position}px)`
        next.style.transform = `translateX(${event.clientX - startX + 200 - 200 * nextPosition}px)`
        last.style.transform = `translateX(${event.clientX - startX - 200 -200 * lastPosition}px)`
      }
      let up = (event)=>{
        let offset = 0
        if (event.clientX - startX > 100) {
          offset = 1
        } else if(event.clientX - startX < -100){
          offset = -1
        }
        
        current.style.transition = 'ease 1s'
        next.style.transition = 'ease 1s'
        last.style.transition = 'ease 1s'

        current.style.transform = `translateX(${ offset * 200 - 200 * this.position}px)`
        next.style.transform = `translateX(${ offset * 200 + 200 - 200 * nextPosition}px)`
        last.style.transform = `translateX(${ offset * 200 - 200 -200 * lastPosition}px)`
        console.log((this.position - offset + this.data.length) % this.data.length, 'up')
        this.position = (this.position - offset + this.data.length) % this.data.length
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    })
  }
  mountTo(parent) {
    this.init()
    // this.render().mountTo(parent);
  }
}
let component = <Carousel data={[
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]}/>

component.mountTo(document.body);