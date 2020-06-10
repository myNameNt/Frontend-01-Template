# 每周总结可以写在这里

## 选择器语法

> 简单选择器
>
> > -   \*(universal selector)
> > -   div svg|a(Type selector)
> > -   .cls(class selector)
> > -   #id(identify selector)
> > -   [attr=value](attribute selector)
> > -   :hover(psuedo class selector)
> > -   ::before(psuedo element selector)

> 复合选择器
>
> > -   <简单选择器><简单选择器><简单选择器>
> > -   \*或 div 必须写在最前面

> 复杂选择器
>
> > -   <复合选择器><复合选择器>
> > -   <复合选择器>">"<复合选择器>
> > -   <复合选择器>"~"<复合选择器>
> > -   <复合选择器>"+"<复合选择器>
> > -   <复合选择器>"||"<复合选择器>

> 计算选择器权重

-   模型 [行内样式 , id 选择器 ， class 选择器和属性选择器 ， 标签选择器和伪类选择器]  
    :not() 伪元素not不参与权重计算，只算它括号里面的选择器 权重  
    \* 号没有权重 
-   例子
    > div#a.b .c[value='my'] 0 1 3 1  
    > #a:not(#b) 0 2 0 0  
    > \*.a 0 0 1 0  
    > div.a 0 0 1 1

## 伪类

> 链接

-   any:list
-   :link :visited
-   :hover
-   :active
-   :focus
-   :target(通过当前 url 的 hash 判断是否选中)
> 树结构选择器
-   :empty
-   :nth-child()
-   :nth-last-child()
-   :first-child :last-child :only-child
> 逻辑型
-   :not
-   :where :has

## 伪元素

-   ::before
-   ::after
-   ::firstline(不能直接从源代码中判断是否 firstline, 不产生盒模型, 不能使用盒模型相关属性)
-   ::firstletter(直接从源代码中可以判断是否 firstletter，可以产生盒模型)

## 盒

### 盒模型

1.盒模型由 margin，padding，border，width，height 几部分组成 2.盒模型有两种计算方式.

> -   默认的计算方式为 content-box，元素实际 width，height 由 padding，border，width，height 相加
> -   第二种为 border-box,元素实际 width，height 就是代码设置的数值，增加 margin，padding，border，就是变相的缩小了 contentwidth 的值。

## 正常流

1. 收集盒入行
    > 连续的行级元素依次进入行盒，当行盒容纳不下时将元素收集到下一个行盒
2. 计算盒在行中的排布
    > 左右排布、上下排布
3. 计算行的排布
    > 计算行高依次排布

## BFC（块级格式上下文）

-   什么情况会产生 BFC
    能容纳正常流的元素都会产生 BFC，除 overflow：visible 外；
-   Block-level boxes：flex、table、grid、block
    表示块级别的盒子
-   block containers: block、inline-block
    表示正常流块级元素的容器
-   block boxes：block
-   block-level && block-container
-   block box 如果 overflow 是 visible， 那么就跟父 bfc 合并
