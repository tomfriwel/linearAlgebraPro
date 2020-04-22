const util = require('../utils/util')
const { generate, factorial, calcInverseNumber }  = util

// 计算行列式的值
/**
 * @param {Array} data 行列式数组
 * 
 */
function calcDeterminantV1(data) {
  let n = data.length
  let standardIndex = []
  for (let i = 0; i < n; i++) {
      standardIndex.push(i)
  }

  let indexArr = []
  generate(n, standardIndex, indexArr)

  let sum = 0
  for (let i = 0, len = factorial(n); i < len; i++) {
      let arr = indexArr[i]
      let inverseCount = calcInverseNumber(arr)

      let item = (inverseCount % 2 ? -1 : 1)
      // console.log(arr)
      tempSum = 1
      for (let j = 0; j < n; j++) {
        tempSum *= data[j][arr[j]]
          // console.log(j, arr[j])
      }
      sum += item * tempSum
  }

  return sum
}

let result = calcDeterminantV1([
  [1,3,2],
  [-5,2,10],
  [5,0,3],
])

console.log(result)