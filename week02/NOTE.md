# 每周总结可以写在这里

本周主要学习了一般编程语言的基本构成

一般命令式编程语言构成
1. Atom
- Identifier
- Literal
2. Expression
- Atom
- Operator
- Punctuator
3. Statement
- Expression
- Keyword
- Punctuator
4. Structure
- Function
- Class
- Process
- Namespace
5. Program
- Program
- Mould
- Package
- Library

还有对所有类型进行了一个简单的梳理， 同时自己做了一些类型的梳理。

#### Boolean类型

数据类型|转换为true|转换为false
---|---|---
Boolean|true|false
String	|任何非空字符串	|“”（空字符串）
Number	|任何非0数字值（包括无穷大）|	0和NaN
Object	|任何对象|	null
Undefined|	n/a或者N/A，是not applicable的缩写，意思是“不适用”	|undefined

#### Number类型

整数可以通过八进制或者十六进制的字面值表示。

八进制字面值的第一位必须是0，然后把金辉数字序列为0-7。

十六进制字面值的前两位必须是0x，后面跟任何十六进制数字0-9或及A-F。

八进制字面量在严格模式下是无效的

由于保存浮点数值需要的内存空间是保存整数值的两倍，因此ECMAScript会不失时机的将浮点数值转换为整数值。

对于一些极大或者极小的数值，可以用e表示法，用e表示法表示的数值等于e前面的数值乘以10的指数次幂。

浮点数值的最高精度是17位数。

数值范围[5e-324,1.79976931348623157e+308]，超过最大值或者小于最小值都会自动转换成特殊的Infinity值。（-Infinity负无穷，Infinity正无穷），而且Infinity无法参与计算。【isFinite（）】

任何数值除以非数值会返回NaN。任何涉及NaN的操作都会返回NaN，NaN与任何值都不相等，包括NaN本身。【isNaN（），任何不能被转换为数值的值都会导致这个函数返回true】

```
Number(true) // 1
Number(false) // 0
Number(10) // 10
Number(null) // 0
Number(undefined) // NaN
Number('Hello') // NaN
Number('') // 0
Number('000011') // 11 前导的0会忽略
Number('1.1') // 1.1
Number('0xf') // 15

------

parseInt('1234abc') // 1234
parseInt('') // NaN
parseInt('0xA') // 10 十六进制
parseInt(22.5) // 22
parseInt('070') // 8
parseInt('0xf') // 15 十六进制
```

parseInt函数第二个参数是按照多少进制进行转换
parseFloat函数没有第二个参数，它可以识别所有浮点数值的格式，也包括十进制整数格式。但十六进制格式的字符串则始终会被转换成0
String类型

字符字面量

字面量|含义
---|---
\n|换行
\t|指表
\b|退格
\r|回车
\\\\|斜杠
\\'|单引号
\\"|双引号
\xnn|以十六进制代码nn表示一个字符，其中n为0-F。例如\x41表示A
\unnnn|以十六进制代码nnnn表示一个Unicode字符，其中n为0-F。例如\u03a3表示∑

#### Object类型

Object的每个实例都有下列属性和方法

constructor：保留着用于创建当前对象的函数。
hasOwnProperty(propertyName)：用于检查给定的属性在当前对象实例中 （不是实例的原型中） 是否存在。
isPrototypeOf(object): 用于检查传入的对象是否是当前对象的原型。
propertyIsEnumerable(propertyName)：用于检查给定的属性是否能够使用for-in语句来枚举。
toLocaleString()：返回对象的字符串表示，该字符串与执行环境的地区对应。