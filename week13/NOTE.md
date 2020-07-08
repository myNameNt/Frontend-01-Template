# 每周总结可以写在这里
# 组件化
## 对象和组件对比
> ### 对象
>> Properties  
>> Methods  
>> Inherit  
> ### 组件
>> Properties  
>> Methods  
>> Inherit  
>> Attribute  
>> Config & state  
>> Event  
>> Lifecycle  
>> Children  
## 组件中attribute和property的区别
> attribute 强调描述性  html实例为例 可以通过 dom.setAttribute(key, value) 这种方式修改的为 attribute
> property 强调从属关系, html实例为例 可以通过 dom.[property] = value  这种方式修改的的即为 property

## example
```javascript
<input id="input" type="input" value="cute" >
<script>
  var input = document.getElementById('input') // 若property 没有设置，则结果是attribu
  input.value // cute
  input.getAttribute('value') // cute
  input.value = 'hello' // 若value属性已设置，则attribute不变，property变化，元素上实际的效果是property 优先
  input.value // hello
  input.getAttribute('value') // cute
</script>
```