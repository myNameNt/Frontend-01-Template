import { createElement } from "./createElement";
export class TabPanel {
  constructor() {
    this.title = "this is panel"
    this.children = []
    this.childViews = []
    this.titleView = []
  }
  setAttribute (name, value) {
    this[name] = value;
  }
  appendChild (child) {
    this.children.push(child)
  }
  select (i) {
    for (let view of this.childViews){
      view.style.display = 'none'
    }
    this.childViews[i].style.display = ''

    for (let view of this.titleViews){
      view.classList.remove = 'selected'
    }
    this.titleViews[i].classList.add = 'selected'
  }
  render () {
    this.childViews = this.children.map((child) => <div style="padding:10px;background-color: aqua;margin-bottom: 10px;min-height: 300px">{child}</div>)
    this.titleViews = this.children.map((child, i) => <div onClick={()=> {this.select(i)}} style="padding:10px;background-color: aqua;margin-bottom: 6px;width: 200px;display:inline-block;margin-right:5px">{child.getAttribute('title')}</div>)
    setTimeout(() => {
      this.select(0)
    }, 16);
    return <div class="tab-panel">
      <div>{this.titleViews}</div>
      <div>{this.childViews}</div>
    </div>
  }
  mountTo (parent) {
    this.render().mountTo(parent);
  }
}