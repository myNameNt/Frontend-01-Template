const standards = [
    {
        "name": "CSS Writing Modes Level 3",
        "url": "https://www.w3.org/TR/2019/REC-css-writing-modes-3-20191210/"
    },
    {
        "name": "CSS Containment Module Level 1",
        "url": "https://www.w3.org/TR/2019/REC-css-contain-1-20191121/"
    },
    {
        "name": "Selectors Level 3",
        "url": "https://www.w3.org/TR/2018/REC-selectors-3-20181106/"
    },
    {
        "name": "CSS Fonts Module Level 3",
        "url": "https://www.w3.org/TR/2018/REC-css-fonts-3-20180920/"
    },
    {
        "name": "CSS Basic User Interface Module Level 3 (CSS3 UI)",
        "url": "https://www.w3.org/TR/2018/REC-css-ui-3-20180621/"
    },
    {
        "name": "CSS Color Module Level 3",
        "url": "https://www.w3.org/TR/2018/REC-css-color-3-20180619/"
    },
    {
        "name": "CSS Namespaces Module Level 3",
        "url": "http://www.w3.org/TR/2014/REC-css-namespaces-3-20140320/"
    },
    {
        "name": "CSS Style Attributes",
        "url": "http://www.w3.org/TR/2013/REC-css-style-attr-20131107/"
    },
    {
        "name": "Selectors API Level 1",
        "url": "http://www.w3.org/TR/2013/REC-selectors-api-20130221/"
    },
    {
        "name": "Media Queries",
        "url": "http://www.w3.org/TR/2012/REC-css3-mediaqueries-20120619/"
    },
    {
        "name": "Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) Specification",
        "url": "http://www.w3.org/TR/2011/REC-CSS2-20110607/"
    },
    {
        "name": "A MathML for CSS Profile",
        "url": "http://www.w3.org/TR/2011/REC-mathml-for-css-20110607/"
    },
    {
        "name": "Associating Style Sheets with XML documents 1.0 (Second Edition)",
        "url": "http://www.w3.org/TR/2010/REC-xml-stylesheet-20101028/"
    },
    {
        "name": "Document Object Model (DOM) Level 2 Style Specification",
        "url": "http://www.w3.org/TR/2000/REC-DOM-Level-2-Style-20001113/"
    }
]
let iframe = document.createElement('iframe')
document.body.innerHTML = ''
document.body.appendChild(iframe)

function happen(element, event){
    return new Promise((resolve)=>{
        let handler = ()=>{
            resolve()
            element.removeEventListener(event, handler)
        }
        element.addEventListener(event, handler)
    })
}

void async function () {
    for (let item of standards) {
        iframe.src = item.url
        console.log(item.name)
        await happen(iframe, 'load')
    }
}();