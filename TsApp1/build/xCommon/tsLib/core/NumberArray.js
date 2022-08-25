//=========================================================================
export class NumberArray {
    static insertOrdered(sortedArr, newEltValue) {
        let i = 0;
        while (i < sortedArr.length && sortedArr[i] < newEltValue) {
            i++;
        }
        let deletedElements = sortedArr.splice(i, 0, newEltValue);
        return deletedElements;
    }
}
