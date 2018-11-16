// matrix object

class Mat {
    constructor(array) {
        console.log(array);
        this.array = array;
        this.rowLength = array[0].length;
        this.columnLength = array.length;
    }

    print() {

    }

    // add operation
    static add(mat0, mat1) {
        if (mat0.rowLength != mat1.rowLength && mat0.columnLength != mat1.columnLength) {
            throw new Error("只有同型矩阵才能进行加法运算");
        }

        let newArray = new Array(mat0.columnLength);
        for (let i = 0; i < mat0.columnLength; i++) {
            if(!newArray[i]) {
                newArray[i] = new Array(mat0.rowLength);
            }
            for (let j = 0; j < mat0.rowLength; j++) {
                newArray[i][j] = mat0.array[i][j] + mat1.array[i][j];
            }
        }

        return new Mat(newArray);
    }
}