const css = require('css')
let rules = []
module.exports.addCSSRules = function addCSSRules(text){
    const ast = css.parse(text);
    //把css rules暂存在rules数组中
    rules.push(...ast.stylesheet.rules)
}

module.exports.computeCSS = function computeCSS(element){
   //console.log(rules)
    //console.log('compute css for',element)
    //记录父元素的序列
    const parents = [] //从距离element最近的父开始存
    let currentEl = element
    while(currentEl.parent){
        parents.push(currentEl.parent)
        currentEl = currentEl.parent
    }
    //拆分选择器
    if(!element.computedStyle){
        element.computedStyle = {}
    }
  
    //双数组的同时循环，看哪个先用尽
    for (const rule of rules) {
        combinatorSelector(rule.selectors[0])
        const selectorParts = rule.selectors[0].split(" ").reverse()//reverse把“当前元素”的selector放在第一位
        if(!match(element,selectorParts[0])){//如果当前元素不匹配第一个selector，那就不用关了
            continue
        }
        //否则，当前元素匹配上了第一个selector
        var j = 1;//从第二个selector开始，看看parent有没有匹配到
        let ruleMatched = false;
        for (let i = 0; i < parents.length; i++) {//遍历当前元素的每个parent
            if(match(parents[i],selectorParts[j])){ //父元素中有命中selector中的某个的话，往前走一个selector,中途没匹配的话就继续走下一个parents
                j++;
            }
            if(j >= selectorParts.length){ //j走到头了，说明parents匹配成功了
                ruleMatched = true
                break;
            }
        }
       
        if(ruleMatched){
            const sp = specificity(rule.selectors[0])
            const computedStyle = element.computedStyle

           for (const declar of rule.declarations) {
                if(!computedStyle[declar.property]){
                    computedStyle[declar.property] = {}
                }
                if(!computedStyle[declar.property].specificity){
                    computedStyle[declar.property].value = declar.value;
                    computedStyle[declar.property].specificity = sp
                }else if(compare(computedStyle[declar.property].specificity,sp)){ 
                    computedStyle[declar.property].value = declar.value;
                    computedStyle[declar.property].specificity = sp
                }
           }

        }

    }

}

function match(element,selector){
    if(!selector || !element.attributes){
        return false
    }
    if(selector.charAt(0) == "#"){
        const attr = element.attributes.filter(att=>(att.name  == 'attr') && (att.value.attrName == 'id'))[0]
        return attr && attr.value.attrValue == selector.substr(1)

    }else if(selector.charAt(0) == "."){
        const attr = element.attributes.filter(att=>(att.name  == 'attr') && (att.value.attrName == 'class'))[0]
        const classes = attr && attr.value.attrValue ? attr.value.attrValue.split(" ") : []
        return classes.some(cls=>cls.replace(' ','')== selector.substr(1))
    }else{//tagName
        if(element.tagName == selector){
            return true
        }
    }
}
function combinatorSelector(selector){
    const childSelector = /(\w+>)/
    const idSelector = /((?<=#)\w+)/
    const tagSelector = /((?<=!\.|#)\w+\W)/
    const classSelector = /((?<=\.)\w+\W)/
    const res = [];
    [childSelector,idSelector,tagSelector,classSelector].map(check=>{
        selector.match(check)
        res.push(RegExp.$1)
    })
}
//计算specificity
function specificity(selectorInRule){
    const p = [0,0,0,0] //inline-style,id,class,tag
    const selectorParts = selectorInRule.split(" ")
    for (const part of selectorParts) {
        if(part.charAt(0) == '#'){
            p[1]+=1
        }else if(part.charAt(0) == '.'){
            p[2]+=1
        }else{
            p[3]+=1
        }
    }
    return p;
}

function compare(oldSp,newSp){
    const base = [1000,100,10,1]
    const oldp = oldSp.map((item,index)=>item*base[index]).reduce((a,c)=>a+c,0)
    const newp = newSp.map((item,index)=>item*base[index]).reduce((a,c)=>a+c,0)
    return oldp < newp
}