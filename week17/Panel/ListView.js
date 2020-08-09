import { createElement } from "./createElement";
export class ListView {
  constructor() {
    this.title = "this is panel"
    this.children = []

  }
  setAttribute (name, value) {
    this[name] = value;
  }
  getAttribute (name) {
    return this[name]
  }
  appendChild (child) {
    this.children.push(child)
  }
  render () {
    let data = this.getAttribute('data')
    return <div class="list-view" style="width: 300px">
      {
        data.map(this.children[0])
      }
    </div>
  }
  mountTo (parent) {
    this.render().mountTo(parent);
  }
}