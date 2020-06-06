# CSS

> At-rules
> 不能嵌套@规则

-   @charset
    > > > 概念：定义样式表使用的字符集.
    > > > 语法：@charset "UTF-8";
-   @import

    > > > 概念： 告诉 css 引擎引入一个外部 css 样式表
    > > > 语法：@import url;@import url list-of-media-queries;

-   @namepsace
    > > > 概念：告诉 CSS 引擎必须考虑 XML 命名空间。  
    > > > 语法：/_ 默认命名空间 _/

```css
    @namespace url(XML-namespace-URL);
    @namespace "XML-namespace-URL";/_ 命名空间前缀 _/;@namespace prefix url(XML-namespace-URL)@namespace prefix "XML-namespace-URL";
```

> 可以嵌套@规则

-   @media
    > > > 概念：如果满足媒介查询的条件则条件规则组里的规则生效。
    > > > 语法：
    > > > /_ At the top level of your code _/

```CSS
@media screen and (min-width: 900px) {
  article {
    padding: 1rem 3rem;
  }
}
@supports (display: flex) {
  @media screen and (min-width: 900px) {
    article {
      display: flex;
    }
  }
}
```

-   @page
    > > > 概念：描述打印文档时布局的变化，只能修改 margin,orphans,widow 和 page breaks of the document。
    > > > 语法：

```css
@page {
	margin: 1cm;
}
@page :first {
	margin: 2cm;
}
```

-   @font-face
    > > > 概念：描述将下载的外部的字体  
    > > > 语法：

```css
    @font-face {

    [ font-family: <family-name>; ] ||

    [ src: <src>; ] ||

    [ unicode-range: <unicode-range>; ] ||

    [ font-variant: <font-variant>; ] ||

    [ font-feature-settings: <font-feature-settings>; ] ||

    [ font-variation-settings: <font-variation-settings>; ] ||

    [ font-stretch: <font-stretch>; ] ||

    [ font-weight: <font-weight>; ] ||

    [ font-style: <font-style>; ]

    }
```

-   @keyframes
    > > > 概念：关键帧 @keyframes at-rule 规则通过在动画序列中定义关键帧（或 waypoints）的样式来控制 CSS 动画序列中的中间步骤。  
    > > > 语法：

```css
    @keyframes slidein {
      from {
        transform: translateX(0%);
      }
      to {
        transform: translateX(100%);
      }
    }
    @keyframes identifier {
      0% { top: 0; left: 0; }
      30% { top: 50px; }
      68%, 72% { left: 50px; }
      100% { top: 100px; left: 100%; }
    }
    关键帧中出现的 !important 将会被忽略。
```

-   @supports
    > > > 概念：如果满足给定条件则条件规则组里的规则生效  
    > > > 语法：

```css
@supports (display: grid) {
  div {
      display: grid;
  }
}
@supports not (display: grid) {
  div {
      float: right;
  }
}
兼容性不好，需要时间
```

-   @document
    > > > 概念：@document CSS at-rule 根据文档的 URL 限制其中包含的样式规则的作用范围。它主要是为用户定义的样式表（UserStyle）而设计的，但也可以在作者定义的样式表上使用。  
    > > > 语法：

```css
@document url("https://www.example.com/") {
	h1 {
		color: green;
	}
}
规则可以指定一个或多个匹配函数。如果任何功能适用于给定的 URL，则该规则将对该 URL 生效。
example：@document url(http://www.w3.org/),

          url-prefix(http://www.w3.org/Style/),

          domain(mozilla.org),

          regexp("https:.*") {
	/\* 该条 CSS 规则会应用在下面的网页:

     + URL为"http://www.w3.org/"的页面.

     + 任何URL以"http://www.w3.org/Style/"开头的网页

     + 任何主机名为"mozilla.org"或者主机名以".mozilla.org"结尾的网页

     + 任何URL以"https:"开头的网页 */

/_ 让上述网页变 {
		color: purple;

		background: yellow;
	}
}
```

-   @viewport
-   @counter-style
    > ## rules
    >
    > > ### selectors
-   selector_group
    > （在需要将一组样式应用到多个选择器规则时使用）
-   combinator(组合器)
    > 空格 ~ + >
-   somple-selector
    > type # . [attr: value] : :: \*
    >
    > > ### declaration
    >
    > -   key：CSS 属性
    >     > -   动画
    >     >     > -   @keyframes 规定动画。
    >     >     > -   animation 所有动画属性的简写属性，除了 animation-play-state 属性。
    >     >     > -   animation-name 规定 @keyframes 动画的名称。
    >     >     > -   animation-duration 规定动画完成一个周期所花费的秒或毫秒。
    >     >     > -   animation-timing-function 规定动画的速度曲线。
    >     >     > -   animation-delay 规定动画何时开始。
    >     >     > -   animation-iteration-count 规定动画被播放的次数。
    >     >     > -   animation-direction 规定动画是否在下一周期逆向地播放。
    >     >     > -   animation-play-state 规定动画是否正在运行或暂停。
    >     >     > -   animation-fill-mode 规定对象动画时间之外的状态。
    >     > -   背景 > - background 在一个声明中设置所有的背景属性。 > - background-attachment 设置背景图像是否固定或者随着页面的其余部分滚动。 > - background-color 设置元素的背景颜色。 > - background-image 设置元素的背景图像。 > - background-position 设置背景图像的开始位置。 > - background-repeat 设置是否及如何重复背景图像。 > - background-clip 规定背景的绘制区域。 > - background-origin 规定背景图片的定位区域。 > - background-size 规定背景图片的尺寸。 - 边框和轮廓 - 盒（框） - 颜色 - 内容分页媒体 -定位 -可伸缩框 -字体 -生成内容 -网格 -超链接 -行框 -列表 -外边距
    >     >     -Marquee
    >     > -   多列
    >     > -   内边距
    >     > -   分页媒体
    >     > -   定位
    >     > -   打印
    >     > -   Ruby
    >     > -   语音
    >     > -   表格
    >     > -   文本
    >     > -   2D/3D 转换
    >     > -   过渡
    >     > -   用户界面
    > - value
    >     > -   函数形式
    >     >     > -   attr() 返回所选元素的属性值
    >     >     > -   calc() 允许您执行计算以确定 CSS 属性值
    >     >     > -   cubic-bezier() 定义 Cubic Bezier 曲线
    >     >     > -   hsl() 使用 Hue-Saturation-Lightness 模型（HSL）定义颜色
    >     >     > -   hsla() 使用 Hue-Saturation-Lightness-Alpha 模型（HSLA）定义颜色
    >     >     > -   linear-gradient() 将线性渐变设置为背景图像。 定义至少两种颜色（从上到下）
    >     >     > -   radial-gradient() 将径向渐变设置为背景图像。 定义至少两种颜色（中心到边缘）
    >     >     > -   repeating-linear-gradient() 重复线性渐变
    >     >     > -   repeating-radial-gradient() 重复径向渐变
    >     >     > -   rgb() 使用红 - 绿 - 蓝模型（RGB）定义颜色
    >     >     > -   rgba() 使用 Red-Green-Blue-Alpha 模型（RGBA）定义颜色
    >     >     > -   var() 用于插入自定义的属性值。
    >     >     > -   min() 计算传进去的值那个最小
    >     >     > -   max() 计算传进去的值那个最大
    >     >     > -   calmp()接受三个值，设定最大和最小，中间的可以浮动
    >> - 常用的
    >     >     > -   颜色
    >     >     > -   尺寸
    >     >     > -   字符串值
