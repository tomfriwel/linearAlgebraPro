const Det = require('../utils/Det')

/**
 * 计算方程组的解
 * 
 * @param {Array} array 线性方程组系数行列式
 * @param {Array} carray 常数项
 */
function calcEquations(array, carray) {
  const len = array.length
  const det = new Det(array)
  const D = det.calc()
  if (D === 0) {
    return null
  }
  const results = new Array(len).fill()
  for (let i = 0; i < len; i++) {
    const tempdet = det.replace(i, carray, false)
    results[i] = tempdet.calc() / D
  }
  return results
}

const det = new Det([
  [2, 1, -5, 1],
  [1, -3, 0, -6],
  [0, 2, -1, 2],
  [1, 4, -7, 6],
])
// 计算行列式的值，不为零，有唯一解
const D = det.calc()  // 27

// 常熟项
const c = [8, 9, -5, 0]

// 替换对应的列，算出分子的值
const det1 = det.replace(0, c, false)
const D1 = det1.calc()  // 81

const det2 = det.replace(1, c, false)
const D2 = det2.calc()  // -108

const det3 = det.replace(2, c, false)
const D3 = det3.calc()  // -27

const det4 = det.replace(3, c, false)
const D4 = det4.calc()  //27

// 得出方程组的解
x1 = D1 / D
x2 = D2 / D
x3 = D3 / D
x4 = D4 / D

console.log(x1, x2, x3, x4)
// 3 -4 -1 1

// const result = calcEquations([
//   [2, 1, -5, 1],
//   [1, -3, 0, -6],
//   [0, 2, -1, 2],
//   [1, 4, -7, 6],
// ], [8, 9, -5, 0])
// console.log(result)
// [ 3, -4, -1, 1 ]

const result = calcEquations([
  [1, 1, 1, 1],
  [1, 2, 4, 8],
  [1, 3, 9, 27],
  [1, 4, 16, 64],
], [3, 4, 3, -3])
console.log(result)
// [ 3, -1.5, 2, -0.5 ]