// linera algebra determinant class

let Det;

(function(){
    Det = function (array) {
        this.array = array
        this.length = array.length
        // 阶乘，元素个数
        this._itemLength = null
    
        // 保存逆序数的数组
        this.inverseNumberArray = null
    
        // 保存每个元素的数组
        this._items = null
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
            this.inverseNumberArray[index] = null
        }
    }
    
    // 获取保存每个元素的数组
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
    
    Det.prototype.calc = function () {
        let data = this.array
        let n = this.length
    
        // 得到所有排列的角标
        let indexArr = []
        generate(n, this.standardIndex, indexArr)
    
        let sum = 0
        for (let i = 0, len = this.itemLength(); i < len; i++) {
            let arr = indexArr[i]
            let inverseCount = calcInverseNumber(arr)
    
            let item = (inverseCount % 2 ? -1 : 1)
            for (let j = 0; j < n; j++) {
                item *= data[j][arr[j]]
            }
            sum += item
        }
    
        console.log(sum)
    
        return sum
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
            console.log(A)
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
})()