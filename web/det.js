// linera algebra determinant class

let Det;

(function () {
    Det = function (array) {
        console.log(array)
        this.array = array
        this.length = array.length
        // 阶乘，元素个数
        this._itemLength = null

        // 保存逆序数的数组
        this.inverseNumberArray = null

        // 保存每个项的数组
        this._items = null
        this.itemValues = null

        // 是否需要重新计算
        this.reCalc = false
    }

    // 阶乘
    Det.prototype.itemLength = function () {
        if (this._itemLength == null) {
            this._itemLength = factorial(this.length)
        }
        return this._itemLength
    }

    // 逆序数
    Det.prototype.inverseNumber = function (index) {
        if (this.inverseNumberArray == null) {
            this.inverseNumberArray = new Array(this.itemLength())
        }
        if (this.inverseNumberArray[index] == undefined) {
            let sum = 0
            let item = this.items()[index]
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
            this.inverseNumberArray[index] = sum
        }
        return this.inverseNumberArray[index]
    }

    // 获取保存每个项的数组
    Det.prototype.items = function () {
        if (this._items == null) {
            this._items = []

            let standardIndex = []
            for (let i = 0; i < this.length; i++) {
                standardIndex.push(i)
            }
            generate(this.length, standardIndex, this._items)
        }
        return this._items
    }

    // 获取单个项的值
    Det.prototype.itemValue = function (index) {
        if (this.itemValues == null) {
            this.itemValues = new Array(this.itemLength())
        }
        if (this.itemValues[index] == undefined || this.reCalc) {
            let inverseCount = this.inverseNumber(index)
            let data = this.array
            let item = this.items()[index]
            let value = (inverseCount % 2 ? -1 : 1)
            for (let j = 0, n = this.length; j < n; j++) {
                value *= data[j][item[j]]
            }
            this.itemValues[index] = value
        }
        return this.itemValues[index]
    }

    Det.prototype.calc = function () {
        let sum = 0
        for (let i = 0, len = this.itemLength(); i < len; i++) {
            sum += this.itemValue(i)
        }

        console.log(sum)

        return sum
    }

    // --- 行列式的性质 start ---
    // 性质1：获取转置行列式
    Det.prototype.getTransposedDet = function () {
        let len = this.length
        let newArr = new Array(len)
        for (let i = 0; i < len; i++) {
            if (!newArr[i]) {
                newArr[i] = new Array(len)
            }
            for (let j = 0; j < len; j++) {
                newArr[i][j] = this.array[j][i]
            }
        }
        return new Det(newArr)
    }

    // 性质2：互换行列式的两行（列）
    /**
     * 
     * @param {Number} n0 行/列，从0开始
     * @param {Number} n1 行/列，从0开始
     * @param {Boolean} isRow
     */
    Det.prototype.swap = function (n0, n1, isRow = true) {
        let newArr = JSON.parse(JSON.stringify(this.array)) //deap copy

        if (isRow) {
            newArr = swap(newArr, n0, n1)
        } else {
            let len = this.length
            for (let i = 0; i < len; i++) {
                newArr[i] = swap(newArr[i], n0, n1)
            }
        }
        return new Det(newArr)
    }

    // 性质3：某一行（列）乘以一个数
    // 行列式的某一行（列）中所有元素都乘以同一个数`k`，等于用数`k`乘以此行列式
    /**
     * 
     * @param {Number} n 行/列，从0开始
     * @param {Number} k 数 
     * @param {Boolean} isRow 默认行
     */
    Det.prototype.multiply = function (n, k, isRow = true) {
        let newArr = JSON.parse(JSON.stringify(this.array))
        let len = this.length

        if (isRow) {
            for (let i = 0; i < len; i++) {
                newArr[n][i] *= k
            }
        } else {
            for (let i = 0; i < len; i++) {
                newArr[i][n] *= k
            }
        }

        return new Det(newArr)
    }

    // 性质4：检查某一行（列）是否与另一行（列）成比例，如果是则为零
    /**
     * @returns {Boolean} false no proportion
     */
    Det.prototype.checkProportion = function () {
        let newArr = JSON.parse(JSON.stringify(this.array))
        let len = this.length

        let isExist = false

        // row
        for (let i = 0; i < len - 1; i++) {
            if (isExist) {
                break
            }
            let arr0 = newArr[i]
            for (let k = i + 1; k < len; k++) {
                if (isExist) {
                    break
                }
                let arr1 = newArr[k]

                isExist = check(arr0, arr1)
            }
        }

        // col
        if (!isExist) {
            for (let i = 0; i < len - 1; i++) {
                if (isExist) {
                    break
                }
                let arr0 = []
                for (let n = 0; n < len; n++) {
                    arr0.push(newArr[n][i])
                }
                for (let k = i + 1; k < len; k++) {
                    if (isExist) {
                        break
                    }
                    let arr1 = []
                    for (let n = 0; n < len; n++) {
                        arr1.push(newArr[n][k])
                    }

                    isExist = check(arr0, arr1)
                }
            }
        }

        function check(arr0, arr1) {
            let res = false
            let c = null
            for (let j = 0; j < len; j++) {
                let a0 = arr0[j] * 1.0
                let a1 = arr1[j] * 1.0

                if (a0 == 0 && a1 == 0) {
                    continue
                }
                if ((a0 == 0 && a1 != 0) || (a0 != 0 && a1 == 0)) {
                    break
                }
                if (a0 != 0 && c == null) {
                    c = a1 / a0
                    continue
                }

                if (c != null && a0 != 0) {
                    if (c == a1 / a0 && j == len - 1) {
                        res = true
                    } else if (c !== a1 / a0) {
                        break
                    }
                }
            }
            return res
        }

        return isExist
    }

    // 性质6：把行列式的某一行（列）的各元素乘以同一个倍数加到另一行（列）对应的元素上去，行列式不变。
    /**
     * 第n0行（列）加上n1行（列）乘以k
     * 
     * @param {Number} n0 行/列
     * @param {Number} n1 行/列
     * @param {Number} k 行列式的 n0(行/列) + n1(行/列)*k
     * @param {Boolean} isRow
     */
    Det.prototype.plusLine = function (n0, n1, k, isRow = true) {
        if (n0 == n1) {
            throw ('不能加到同一行或列')
        }
        let newArr = JSON.parse(JSON.stringify(this.array))
        let len = this.length

        if (isRow) {
            for (let i = 0; i < len; i++) {
                newArr[n0][i] += newArr[n1][i] * k
            }
        } else {
            for (let i = 0; i < len; i++) {
                newArr[i][n0] += newArr[i][n1] * k
            }
        }

        return new Det(newArr)
    }

    // --- 行列式的性质 end ---

    // --- 行列式按行(列)展开 start ---
    // complement minor
    /**
     * 余子式
     * 
     * @param {Number} i 行
     * @param {Number} j 列
     */
    Det.prototype.complementMinor = function (i, j) {
        let len = this.length
        if (!(i < len && j < len)) {
            throw ('行标或列标超出范围: 0~' + (len - 1))
        }
        let detArr = JSON.parse(JSON.stringify(this.array))
        let newArr = []
        for (let k = 0; k < len; k++) {
            if (i != k) {
                let temp = detArr[k]
                temp.splice(j, 1)
                newArr.push(temp)
            }
        }

        return new Det(newArr)
    }
    // algebraic complement
    /**
      * 通过代数余子式来计算行列式的值
      * 
      * @param {Number} i 行
      */
    Det.prototype.calcViaComplement = function (i = 0) {
        let len = this.length
        if (!(i < len)) {
            throw ('行标或列标超出范围: 0~' + (len - 1))
        }
        let sum = 0
        for (let k = 0; k < len; k++) {
            let tempDet = this.complementMinor(i, k)
            sum += tempDet.calc() * Math.pow(-1, k + i) * this.array[i][k]
        }

        return sum
    }
    // --- 行列式按行(列)展开 end ---
})()