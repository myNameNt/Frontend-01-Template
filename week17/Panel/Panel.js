import { createElement } from "./createElement";
export class Panel {
  constructor() {
    this.title = "this is panel"
    this.children = []
  }
  setAttribute (name, value) {
    this[name] = value;
  }
  appendChild (child) {
    this.children.push(child)
  }
  render () {
    return <div class="panel">
      <h3>{this.title}</h3>
      <div>{this.children}</div>
    </div>
  }
  mountTo (parent) {
    this.render().mountTo(parent);
  }
}