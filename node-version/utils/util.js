/**
 * 交互数组中的两个元素
 * 
 * @param {Array} arr
 * @param {Number} i
 * @param {Number} j
 */
function swap(arr, i, j) {
  var temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
  return arr
}

/**
* 列举所有@param A 数组元素的排列
* 
* @param {Number} n A长度
* @param {Array} A 元素
* @param {Array} result 全部结果
*/
function generate(n, A, result) {
  if (n == 1) {
      result.push(A.slice())
  }
  else {
      for (let i = 0; i < n - 1; i++) {
          generate(n - 1, A, result)
          if (n % 2 == 0) {
              swap(A, i, n - 1)
          }
          else {
              swap(A, 0, n - 1)
          }
      }
      generate(n - 1, A, result)
  }
}

/**
* 计算n的阶乘
* 
* @param {Number} n 
*/
function factorial(n) {
  var result = 1
  for (i = 2; i <= n; i++) {
      result *= i
  }
  return result
}

/**
 * 
 * @param {Array} item 
 */
function calcInverseNumber(item) {
  let sum = 0
  for (let i = 0, len = item.length; i < len; i++) {
      // 取出第i个数
      let digit = item[i]
      // 用第i个数与第i位之后的数进行对比
      for (let j = i + 1; j < len; j++) {
          if (digit > item[j]) {
              sum++
          }
      }
  }
  return sum
}


/**
* 计算k的n次方
* 
* @param {Number} n 
*/
function power(n) {
  var result = 1
  for (i = 2; i <= n; i++) {
      result *= i
  }
  return result
}

module.exports = {
  generate,
  factorial,
  calcInverseNumber
}