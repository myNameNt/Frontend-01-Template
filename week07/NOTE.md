# 每周总结可以写在这里
## At-rules 
  不能嵌套@规则
		@charset
			概念：定义样式表使用的字符集.
			语法：@charset "UTF-8";
		@import
			概念： 告诉css引擎引入一个外部css样式表
			语法：@import url;@import url list-of-media-queries;
		@namepsace
			概念：告诉 CSS 引擎必须考虑XML命名空间。
			语法：/* 默认命名空间 */

@namespace url(XML-namespace-URL);

@namespace "XML-namespace-URL";



/* 命名空间前缀 */

@namespace prefix url(XML-namespace-URL);

@namespace prefix "XML-namespace-URL";
	可以嵌套@规则
		@media
			概念：如果满足媒介查询的条件则条件规则组里的规则生效。
			语法：
				/* At the top level of your code */

@media screen and (min-width: 900px) {

  article {

    padding: 1rem 3rem;

  }

}



/* Nested within another conditional at-rule */

@supports (display: flex) {

  @media screen and (min-width: 900px) {

    article {

      display: flex;

    }

  }

}
		@page
			概念：描述打印文档时布局的变化，只能修改margin,orphans,widow 和 page breaks of the document。
			语法：@page {

  margin: 1cm;

}



@page :first {

  margin: 2cm;

}

@page 
		@font-face
			概念：描述将下载的外部的字体
			语法：@font-face {

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
		@keyframes
			概念：关键帧 @keyframes at-rule 规则通过在动画序列中定义关键帧（或waypoints）的样式来控制CSS动画序列中的中间步骤。
			语法：@keyframes slidein {

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
		@supports
			概念：如果满足给定条件则条件规则组里的规则生效
			语法：@supports (display: grid) {

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
		@document
			概念：@document CSS at-rule 根据文档的 URL 限制其中包含的样式规则的作用范围。它主要是为用户定义的样式表（UserStyle）而设计的，但也可以在作者定义的样式表上使用。
			语法：@document url("https://www.example.com/") {

  h1 {

    color: green;

  }

}
 规则可以指定一个或多个匹配函数。如果任何功能适用于给定的 URL，则该规则将对该URL生效。
			example：@document url(http://www.w3.org/),

          url-prefix(http://www.w3.org/Style/),

          domain(mozilla.org),

          regexp("https:.*")

{

  /* 该条CSS规则会应用在下面的网页:

     + URL为"http://www.w3.org/"的页面.

     + 任何URL以"http://www.w3.org/Style/"开头的网页

     + 任何主机名为"mozilla.org"或者主机名以".mozilla.org"结尾的网页     

     + 任何URL以"https:"开头的网页 */



  /* 让上述网页变得超级丑 */

  ```css
  body {

    color: purple;

    background: yellow;

  } 
  ```
}

## rules  
> selectors  
  1. selector_group  
  2. combinator  
> declaration  
  1. key  
	  > property  
		> variable  
  2. value  
