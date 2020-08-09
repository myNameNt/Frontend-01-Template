import { enableGesture } from './gesture';

export function createElement (Cls, attributes, ...children) {
  // console.log(arguments);
  let o;

  if (typeof Cls === 'string') {
    o = new Wrapper(Cls);
  } else {
    o = new Cls({
      timer: null
    });
  }

  for (let name in attributes) {
    o.setAttribute(name, attributes[name]);
  }
  let visit = (children) => {
    for (let child of children) {

      if (child instanceof Array) {
        visit(child);
        continue;
      }

      if (typeof child === 'string') {
        child = new Text(child);
      }

      o.appendChild(child);
    }
  }

  visit(children);

  return o;
}

export class Text {
  constructor(text) {
    this.root = document.createTextNode(text);
  }
  getAttribute(name){
    return 
  }
  set innerText(text){
    return this.root.innerText = text
  }
  mountTo (parent) {
    parent.appendChild(this.root);
  }
}

export class Wrapper {
  constructor(type) {  // config
    this.children = [];
    this.root = document.createElement(type);
  }
  classList(){
    return this.root.classList
  }
  getAttribute(name){
    return this.root.getAttribute(name)
  }
  setAttribute (name, value) {    // attribute
    this.root.setAttribute(name, value);
    if (name.match(/^on([\s\S]+)$/)) {
      let eventName = RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase());
      this.addEventListener(eventName, value)
    }
    if (name === 'enableGesture') {
      enableGesture(this.root);
    }
  }

  appendChild (child) {   // children
    // console.log('Parent::appendChild', child);
    this.children.push(child);
    // child.mountTo(this.root);    // 这里不要直接 moute
  }

  addEventListener () {
    this.root.addEventListener(...arguments);
  }

  get style () {
    return this.root.style;
  }
  set innerText(text){
    return this.root.innerText = text
  }
  mountTo (parent) {
    parent.appendChild(this.root);
    for (let child of this.children) {
      if (typeof child === 'string') {
        child = new Text(child);
      }
      child.mountTo(this.root);
    }
  }
}