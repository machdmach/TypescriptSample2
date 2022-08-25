import { StringBuilder } from "./StringBuilder.js";
export class CircularQueue {
    constructor(capacity = 1000) {
        this.queue = [];
        this.frontIndex = 0;
        this.capacity = capacity;
        this.clear();
    }
    //=========================================================================
    clear() {
        this.queue = [];
        this.frontIndex = 0;
    }
    //=========================================================================
    get rearIndex() {
        let ret = this.frontIndex - 1;
        if (ret < 0) {
            ret = this.queue.length;
        }
        return ret;
    }
    //=========================================================================
    enqueueRange(arr) {
        arr.forEach(e => {
            this.enqueue(e);
        });
    }
    //=========================================================================
    enqueue(entry) {
        let removed = undefined;
        this.queue.push(entry);
        if (this.queue.length > this.capacity) {
            removed = this.queue.shift();
        }
        console.log("enqueue done, len=" + this.queue.length + ", removed=" + removed);
        return removed;
    }
    //=========================================================================
    dequeue() {
        let ret = this.queue.shift();
        return ret;
    }
    //=========================================================================
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        else {
            return this.queue[this.frontIndex];
        }
    }
    //=========================================================================
    nextOrDefault() {
        let ret = this.peek();
        if (ret === undefined) {
        }
        if (ret !== undefined) {
            this.frontIndex++;
            if (this.frontIndex >= this.queue.length) {
                this.frontIndex = 0;
            }
        }
        return ret;
    }
    //=========================================================================
    nextEntry() {
        let ret = this.nextOrDefault();
        if (ret === undefined) {
            throw Error("Not availabled");
        }
        return ret;
    }
    //=========================================================================
    get length() {
        return this.queue.length;
    }
    //=========================================================================
    isEmpty() {
        let ret = (this.queue.length === 0);
        return ret;
    }
    //=========================================================================
    getEnqueuedArray() {
        return this.queue;
    }
    //=========================================================================
    toArray() {
        // let arr: E[] = [];
        // for (let i = 0; i < this.queue.length; i++) {
        //     let entry = this.nextOrDefault()!;
        //     arr.push(entry);
        // }
        // return arr;
        let ret = this.slice();
        return ret;
    }
    //=========================================================================
    toString() {
        let arr = this.toArray();
        const buf = new StringBuilder();
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            buf.append(i);
            buf.append(": ");
            buf.append(element);
            buf.appendLine(",");
        }
        return buf.toString();
    }
    //=========================================================================
    slice(beginIndex, endIndex) {
        //returns: array with elts from beginIndex to endIndex (exclusive endIndex)
        let ret = [];
        if (this.isEmpty()) {
            return ret; //-----------------------------------------
        }
        if (beginIndex === undefined) {
            beginIndex = this.frontIndex;
        }
        if (endIndex === undefined) {
            endIndex = beginIndex;
        }
        else if (endIndex >= this.queue.length) {
            endIndex = beginIndex;
        }
        else {
            //none
        }
        let currIndex = beginIndex;
        do {
            ret.push(this.queue[currIndex]);
            currIndex = CircularQueue.getArrayNextIndex(currIndex, this.queue);
        } while (currIndex !== endIndex);
        return ret;
    }
    //=========================================================================
    getPreviousIndex() {
        let prevIndex = this.frontIndex - 1;
        if (prevIndex < 0) {
            prevIndex = this.queue.length - 1;
        }
        return prevIndex;
        //console.log("sliding to to imgindex=" + imgIndex);
    }
    //=========================================================================
    getNextIndex() {
        let nextIndex = this.frontIndex + 1;
        if (nextIndex >= this.queue.length) {
            nextIndex = 0;
        }
        return nextIndex;
        //console.log("sliding to to imgindex=" + imgIndex);
    }
    //=========================================================================
    static getArrayPreviousIndex(currIndex, arr) {
        let prevIndex = currIndex - 1;
        if (prevIndex < 0) {
            prevIndex = arr.length - 1;
        }
        return prevIndex;
        //console.log("sliding to to imgindex=" + imgIndex);
    }
    //=========================================================================
    static getArrayNextIndex(currIndex, arr) {
        let nextIndex = currIndex + 1;
        if (nextIndex >= arr.length) {
            nextIndex = 0;
        }
        return nextIndex;
        //console.log("sliding to to imgindex=" + imgIndex);
    }
    //=========================================================================
    static slice_tests() {
        let q = new CircularQueue();
        q.enqueueRange(["a", "b", "c"]);
        q.nextEntry();
        //console.log("q=" + q.toString());
        q.nextEntry();
        //console.log("q=" + q.toString());
        console.log("queue=" + q.queue);
        console.log("slice=" + q.slice(1));
        console.log("slice=" + q.slice(2, 1));
        console.log("slice=" + q.slice(1, 1));
    }
    //=========================================================================
    static test1() {
        this.slice_tests();
        if ("x")
            return;
        let q = new CircularQueue(4);
        q.enqueue("aa");
        q.enqueue("bb");
        q.enqueue("cc c");
        q.enqueue("4 d");
        q.enqueue("55");
        q.enqueue("66");
        console.log("q=" + q.toString());
        for (let i = 0; i < 10; i++) {
            console.log(`next of ${i}: ${q.nextOrDefault()}`);
        }
    }
}
