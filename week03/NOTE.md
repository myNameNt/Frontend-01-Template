# 第一节课总结 
## Expressions
> 语法
  >> 获取属性值运算
    >>> Member(对象点属性这个操作就叫这个东西)
    * a.b 
    * a[b]
    * Foo`string`
    * super.b
    * super['b']
    * new.target
    * new foo()
  >> new实例化操作
    >>> New
      * new Foo
      example
      new a()()
      new new a()
  >> call 调用函数操作
    >>> call
      * Foo()
      * Super()
      * Foo['b']
      *	Foo().b
      example
        new a()['b']
# 第二节课总结
# Statement 语句

## Completion Record

- [[type]] : normal, break, continue, return throw
- [[value]] : Types
- [[target]]: label

## 简单语句

- ExpressionStatement 表达式语句
- EmptyStatement 空语句
- DebuggerStatement
- ThrowStatement
- ContinueStatement
- BreakStatement
- ReturnStatement

## 复合语句

- BlockStatement
- IfStatement
- SwitchStatement
- IterationStatement
- WithStatement
- LabelledStatement
- TryStatement

## Declaration 声明语句

- FunctionDeclaration
- GeneratorDeclaration
- AsyncFunctionDeclaration
- AsyncGeneratorDeclaration
- VariableStatement
- ClassDeclaration
- LexicalDeclaration

# Object 对象
>概念：在英文里面表示世界万物，一切的意思。  
> 结构体（{name: 'ha'}）: 这是一种数据存储的工具  
> 对象：就是在说一个事物实例，即使是同一个种物品，也是不同的对象（比如三个苹果，就是三个不同的对象）,
  >> - 对象都是唯一的，与它自身的状态无关。  
  >> - 即使是两个状态完全相同的对象，也并不相等
  >> - 用状态来描述对象，改变自身状态的就称为行为
> 在设计对象的状态和行为时我们要遵循的是“行为改变状态”的原则（比如狗咬人这个行为 就是改变的人的状态，所以在设计这个行为的时候我们是要去设计 人受伤的行为 而不是 狗咬人的行为）
>> ## JavaScript中的对象
>> js中对象的属性和原型是要区分理解的，每一个对象都一个原型，但是属性可以任意增删  
>> js对象有两种 property
>>> - Data property: [[value]], writeable, enumerable, configurable
>>> - accessor property: get, set, enumerable, configurable  
>> ## API  
>> - {}, [] Object.defineProperty
>> - Object.create() / Object.setPrototypeOf / Object.getPrototypeOf
>> - new / class / extends
>> - new / function / prototype (已经过时，不好用)