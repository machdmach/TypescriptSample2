//=========================================================================
/*
let it = makeRangeIterator(1, 10, 2);

let result = it.next();
while (!result.done) {
    console.log(result.value); // 1 3 5 7 9
    result = it.next();
}
console.log("Iterated over sequence of size: ", result.value); // 5

//-------
function makeRangeIterator(start = 0, end = Infinity, step = 1) {
    let nextIndex = start;
    let iterationCount = 0;

    const rangeIterator = {
       next: function() {
           let result;
           if (nextIndex <= end) {
               result = { value: nextIndex, done: false }
               nextIndex += step;
               iterationCount++;
               return result;
           }
           return { value: iterationCount, done: true }
       }
    };
    return rangeIterator;
}
*/
export class ArraySlicer {
    constructor(pageSize) {
        this.data = uninit;
        this.pageCount = 0;
        this.currentPageIndex = -1;
        if (pageSize < 1) {
            throw Error("invalid pageSize: " + pageSize);
        }
        this.pageSize = pageSize;
    }
    setData(data) {
        if (!data) {
            throw Error("data cannot be null or undefined");
        }
        this.reset();
        this.data = data;
        if (data.length > 1000) {
            throw Error("too many rows");
        }
        this.pageCount = Math.ceil(data.length / this.pageSize);
    }
    reset() {
        this.data = [];
        this.pageCount = 0;
        this.currentPageIndex = -1;
    }
    hasMoreSlices() {
        return this.pageCount > 0 && this.currentPageIndex < this.pageCount;
    }
    getNextSlice() {
        if (this.pageCount === 0) {
            return null; //---------------- return;
        }
        if (this.currentPageIndex > 30) {
            throw Error("too many pages: ");
        }
        let ret;
        if (this.currentPageIndex < 0) {
            this.currentPageIndex = 0;
        }
        else {
            this.currentPageIndex++;
        }
        let curentRowIndex = this.currentPageIndex * this.pageSize;
        if (curentRowIndex < this.data.length) {
            let endRowIndex = curentRowIndex + this.pageSize;
            ret = this.data.slice(curentRowIndex, endRowIndex);
        }
        else {
            ret = null;
            this.currentPageIndex = -1;
        }
        return ret;
    }
    getAllSlices() {
        let ret = [];
        let slice = this.getNextSlice();
        while (slice) {
            ret.push(slice);
            slice = this.getNextSlice();
        }
        return ret;
    }
}
