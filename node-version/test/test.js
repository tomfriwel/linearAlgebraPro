const util = require('../utils/util')
const { factorial }  = util
// console.log(Math.pow(2,30))
// console.log(factorial(30)/factorial(15)/factorial(15)/Math.pow(2,30))


function nk(k, n) {
    return factorial(n)/factorial(k)/factorial(n-k)
}
function pkn(k, n) {
    const t = nk(k, n)
    // console.log(t)
    return t/ Math.pow(2, n)
}

let n = 30
for (let i = n; i > -1; i--) {
    // pkn(i, n)
    console.log(`${i}\t${100*pkn(i, n)}`)
}
