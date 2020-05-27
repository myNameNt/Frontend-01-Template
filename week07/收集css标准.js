const container = document.getElementById('container')
const ali = container.getElementsByTagName('li')
let results = []
let CandidateRecommendation = [] // 候选推荐标准
let GroupNote = [] // 组备注
let ProposedEditedRecommendation = [] // 还在编辑的拟建议标准 很有可能会改动
let ProposedRecommendation = []//拟建议标准
let Recommendation = [] // 建议标准
let Retired = [] // 退休的标准
let WorkingDraft = [] // 草案
for (let oli of ali) {
    const dataTag = oli.getAttribute('data-tag') || ''
    if (dataTag.match('css')) {
        const oA = oli.getElementsByTagName('a')[0]
        const oDivText = oli.children[0].innerText
        const title = oA.innerText
        const href = oA.href
        const item = {
            name: title,
            url: href
        }
        results.push(item)
        if (oDivText === 'REC') {
            Recommendation.push(item)
        }
    }
}
// console.log(results)
console.log(Recommendation)