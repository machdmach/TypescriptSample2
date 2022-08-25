import { AssertX } from "./AssertX.js";
export class Matrix {
    static unpivot2(matrix) {
        // const rotate = matrix => {
        //     return matrix.map((row, i) =>
        //         row.map((val, j) => matrix[matrix.length - 1 - j][i])
        //     );
        // };
        //https://betterprogramming.pub/how-to-rotate-a-matrix-in-javascript-2c8a4c64b8d9
        return matrix.map((row, i) => row.map((val, j) => matrix[matrix.length - 1 - j][i]));
    }
    //=========================================================================
    static unpivot(srcMatrix) {
        let rowCount = srcMatrix.length;
        let headerRow = srcMatrix[0];
        let colCount = headerRow.length;
        let returnMatrix = [];
        AssertX.isLessThan(rowCount, 20);
        AssertX.isLessThan(colCount, 20);
        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < colCount; j++) {
                if (!returnMatrix[j]) {
                    returnMatrix[j] = [];
                }
                returnMatrix[j][i] = srcMatrix[i][j];
            }
        }
        return returnMatrix;
    }
}
