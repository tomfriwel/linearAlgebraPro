// matrix object
class Mat {
    constructor(array) {
        console.log(array);
        this.array = array;
        this.rowLength = array.length;
        this.colLength = array[0].length;
    }

    print() {

    }

    // add operation
    static add(mat0, mat1) {
        if (mat0.rowLength != mat1.rowLength && mat0.colLength != mat1.colLength) {
            throw new Error("只有同型矩阵才能进行加法运算");
        }

        let newArray = new Array(mat0.rowLength);
        for (let i = 0; i < mat0.rowLength; i++) {
            if(!newArray[i]) {
                newArray[i] = new Array(mat0.colLength);
            }
            for (let j = 0; j < mat0.colLength; j++) {
                newArray[i][j] = mat0.array[i][j] + mat1.array[i][j];
            }
        }

        return new Mat(newArray);
    }

    // subtract operation
    static subtract(mat0, mat1) {
        if (mat0.rowLength != mat1.rowLength && mat0.colLength != mat1.colLength) {
            throw new Error("只有同型矩阵才能进行加法运算");
        }

        let newArray = new Array(mat0.rowLength);
        for (let i = 0; i < mat0.rowLength; i++) {
            if(!newArray[i]) {
                newArray[i] = new Array(mat0.colLength);
            }
            for (let j = 0; j < mat0.colLength; j++) {
                newArray[i][j] = mat0.array[i][j] - mat1.array[i][j];
            }
        }

        return new Mat(newArray);
    }

    static multiplyNumber(mat, n) {
        let newArray = new Array(mat.rowLength);
        for (let i = 0; i < mat.rowLength; i++) {
            if(!newArray[i]) {
                newArray[i] = new Array(mat.colLength);
            }
            for (let j = 0; j < mat.colLength; j++) {
                newArray[i][j] = mat.array[i][j] * n;
            }
        }

        return new Mat(newArray);
    }

    static multiply(mat0, mat1) {
        if (mat0.colLength != mat1.rowLength) {
            throw new Error(`mat0(${mat0.rowLength}*${mat0.colLength})的列数不等于mat1(${mat1.rowLength}*${mat1.colLength})的行数，无法进行相乘运算`);
        }

        let newRowLength = mat0.rowLength;
        let newColLength = mat1.colLength;
        let len = mat0.colLength;

        let newArray = new Array(newRowLength);
        for (let i = 0; i < newRowLength; i++) {
            if(!newArray[i]) {
                newArray[i] = new Array(newColLength);
            }
            for (let j = 0; j < newColLength; j++) {
                newArray[i][j] = 0;
                for (let k = 0; k < len; k++) {
                    newArray[i][j] += mat0.array[i][k] * mat1.array[k][j];
                }
            }
        }

        return new Mat(newArray);
    }
    //获取转置矩阵
    static getTransposedMat(mat) {
        let rlen = mat.rowLength;
        let clen = mat.colLength;
        let newArr = new Array(clen);

        for (let i = 0; i < clen; i++) {
            if (!newArr[i]) {
                newArr[i] = new Array(rlen);
            }
            for (let j = 0; j < rlen; j++) {
                newArr[i][j] = mat.array[j][i];
            }
        }
        return new Mat(newArr)
    }

    add(mat) {
        return Mat.add(this, mat);
    }

    subtract(mat) {
        return Mat.subtract(this, mat);
    }

    multiplyNumber(n) {
        return Mat.multiplyNumber(this, n);
    }

    multiply(mat) {
        return Mat.multiply(this, mat);
    }

    //获取转置矩阵
    getTransposedMat () {
        return Mat.getTransposedMat(this);
    }
}