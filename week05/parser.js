const EOF  = Symbol('EOF')

function data(c){

}


module.exports.parserHTML = function parseHTML(html){
    let state = data;
    for (let c of data){
        state = state(c)
    }
    state = state(EOF)
}