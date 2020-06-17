每周总结可以写在这里

# CSS

## Animation

> -   animation-name 时间曲线
> -   animation-duration 动画的时长
> -   animation-timing-function 动画的时间曲线
> -   animation-delay 动画开始前的延迟
> -   animation-iteration-count 动画播放次数
> -   animation-direction 动画方向

## Transition

> -   transition-property 要变换的属性
> -   transition-duration 变换的时长
> -   transition-timing-function 时间曲线
> -   transition-delay 延迟

## Other

> -   Gpu 利用率越高 性能越好
> -   常用实体
> -   " > < &

# HTML 语法

## 合法元素

> -   Element
> -   Text 文本
> -   Comment
> -   DocumentType <!Doctype html>
> -   ProcessingInstruction 处理信息(没有用)
> -   CDATA
> -   NODE
> -   Element 元素型节点
> -   Document 文档根节点
> -   Character 字符数据 包括文本节点 注释 处理信息
> -   DocumentFragment 文档片段 不会产生真实 dom 减少 dom 操作 可以作为性能优化的手段
> -   DocumentType 文档类型

## 导航类操作

> -   parentNode
> -   childNodes
> -   firstChild
> -   lastChild
> -   nextSibling
> -   previousSibling

## 修改操作

> -   appendChild
> -   insertBefore
> -   removeChild
> -   replaceChild
>- 1. 在操作同一个dom节点的时候不会通过操作产生两个相同的节点，（使用上面的方法是先摘到选中的节点然后放到要放得位置）
>- 2. 节点是活动的，使用api操作一次文档就会实时更新页面结构。
## 高级操作（好用的api）

> -   compareDocumentPosition 用于比较两个节点关系的函数
> -   contains 检查一个节点是否包含另外一个节点
> -   isEqualNode 检查两个节点是否完全相同
> -   isSameNode 检查两个节点是否是同一个节点 实际可以在 JS 中用===去判断
> -   cloneNode 复制一个节点 如果参数为 true 会连同子元素做深拷贝

## Browser API && DOM API
> 细说addEventLister。第二个参数可是一个对象，{handleEvent: function ,}
第三个参数默认是false 冒泡，为true时 就是捕获。 
> -   DOM
> -   DOM Tree
> -   Events
> -   Range
> -   Traversal (废弃)
> -   CSSOM
> -   BOM
> -   Web Animation
> -   Crypto
