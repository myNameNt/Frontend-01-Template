
import {Carousel} from './carousel.view'

function createElement (Cls, attributes, ...children) {
  let o
  if (typeof Cls === 'string') {
    o = new Warper(Cls)
  } else {
    o = new Cls({ timer: { time: 1000 } })
  }
  for (let name in attributes) {
    o.setAttribute(name, attributes[name])
  }
  for (let child of children) {
    if (typeof child === 'string') {
      child = new Text(child)
    }
    o.appendChild(child)
  }
  return o
}
class Text {
  constructor (text) {
    this.children = []
    this.root = document.createTextNode(text)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}
class Warper {
  constructor(type) {
    this.children = []
    this.root = document.createElement(type)
  }
  set class (v) {
    console.log("Parent::class", v)
  }
  setAttribute (name, value) {
    this.root.setAttribute(name, value)
  }
  mountTo (parent) {
    parent.appendChild(this.root)
    for (child of this.children) {
      child.mountTo(this.root)
    }
  }
  appendChild (child) {
    this.children.push(child)
  }
}
class MyComponent {
  constructor(config) {
    this.children = []
    this.attributes = new Map()
    this.properties = new Map()
    this.properties.set('title', '--')
  }
  set class (v) {
    console.log("Parent::class", v)
  }
  setAttribute (name, value) {
    this.attributes.set(name,value)
    
  }
  set title (value) {
    this.properties.set('title',value)
  }
  mountTo (parent) {
    this.slot = <div></div>
   
    for (child of this.children) {
      this.slot.appendChild(child)
    }
    this.render().mountTo(parent)
  }
  appendChild (child) {
    this.children.push(child)
  }
  render () {

    return <article>
      <p>{this.properties.get('title')}</p>
      <header>i`m header</header>
      {this.slot}
      <footer>i`m footer</footer>
    </article>
  }
}


// class Child {
//   constructor(config) {
//     this.root = document.createElement('div')
//   }
//   set class (v) {
//     console.log("Parent::class", v)
//   }
//   setAttribute (name, value) {
//     this.root.setAttribute(name, value)
//   }
//   mountTo (parent) {
//     parent.appendChild(this.root)
//   }
//   appendChild (Child) {
//     Child.mountTo(this.root)
//   }
// }

let component = <MyComponent id="box" class="box" attr="hello" >
  <div class="item"></div>
  <p class="item">我是大魔王</p>
</MyComponent>
component.title = '哈哈'




component.mountTo(document.body)

