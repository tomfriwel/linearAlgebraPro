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
        if(this.itemValues[index]==undefined || this.reCalc) {
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
    
        console.log(this.array)
        console.log(sum)
    
        return sum
    }
})()