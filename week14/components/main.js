function createElement (Cls, attributes, ...children) {
  var o = new Cls({ timer: { time: 1000 } })
  for (let name in attributes) {
    o.setAttribute(name, attributes[name])
  }
  for (let child of children) {
    o.appendChild(child)
  }
  return o
}
class Parent {
  constructor(config) {
    this.children = []
    this.root = document.createElement('div')
  }
  set class (v) {
    console.log("Parent::class", v)
  }
  setAttribute (name, value) {
    this.root.setAttribute(name, value)
  }
  mountTo (parent) {
    parent.appendChild(this.root)
  }
  appendChild (child) {
    child.mountTo(this.root)
  }
}
class Child {
  constructor(config) {
    this.root = document.createElement('div')
  }
  set class (v) {
    console.log("Parent::class", v)
  }
  setAttribute (name, value) {
    this.root.setAttribute(name, value)
  }
  mountTo (parent) {
    parent.appendChild(this.root)
  }
  appendChild (Child) {
    Child.mountTo(this.root)
  }
}

let component = <Parent id="box" class="box" attr="hello" >
  <Child class="item"></Child>
  <Child class="item"></Child>
  <Child class="item"></Child>
</Parent>
component.mountTo(document.body)
console.log(component, '--component')