function match(pattern,string) {

  let state = startAndFindA
  for (let c of string) {
    console.log(c)
    state = state(c)
  }
  return state === end
}

function createStateFun() {
  return function () {}
}


function startAndFindA (c) {
  if (c === 'a') {
    return findB
  } else {
    return startAndFindA
  }
}

function end(){
  return end
}

function findB(c) {
  if (c === 'b') {
    return findC
  } else {
    return startAndFindA
  }
}
function findC (c) {
  if (c === 'c') {
    return findA2
  } else {
    return startAndFindA
  }
}
function findA2(c) {
  if (c === 'a') {
    return findB2
  } else {
    return startAndFindA
  }
}
function findB2(c) {
  if (c === 'b') {
    return findX
  } else {
    return startAndFindA
  }
}
function findX(c) {
  if (c === 'x') {
    return end
  } else {
    return startAndFindA
  }
}

console.log(match('abcabx','sdad abcabxsadsa '))