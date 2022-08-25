export class MultiColumnOrderByQueue {
    constructor(maxCount) {
        this.queue = [];
        this.pendingQueue = [];
        this.maxCount = maxCount;
    }
    enqueue(columnName, colOrderBySuffix) {
        columnName = this.quoteColumnName(columnName);
        //create a new queue with all elts except the one that matches the incumbent one
        this.queue = this.queue.filter(e => e[0] !== columnName);
        this.queue = this.queue.filter(e => !e[1].includes(columnName)); //eg: "Make", e[1]='DESC, "Model" Asc';
        let entry = [columnName, colOrderBySuffix];
        this.queue.push(entry);
        if (this.queue.length > this.maxCount) {
            this.queue.shift();
        }
        // for (let i in this.queue) {
        //     let e = this.queue[i];
        //     if (e[0] === columnName) {
        //         this.queue.splice(i, 1);
        //     }
        // }
        console.log("enqueue done, len=" + this.queue.length);
    }
    enqueueLater(columnName, colOrderBySuffix) {
        console.log("enqueueLater, columnName=" + columnName + ", colOrderBySuffix=" + colOrderBySuffix);
        columnName = this.quoteColumnName(columnName);
        if (this.pendingQueue.length > 0) {
            let e1 = this.pendingQueue[0];
            throw Error("there is already a pending entry in the pending que: " + e1[0]);
        }
        let entry = [columnName, colOrderBySuffix];
        this.pendingQueue.push(entry);
    }
    rollbackEnqueue() {
        if (this.pendingQueue.length === 0) {
            throw Error("there is no pending entry in the pending que: ");
        }
        // let e1 = this.pendingQueue[0];
        // this.queue.push(e1);
        this.pendingQueue = [];
    }
    clearPendingQueue() {
        this.pendingQueue = [];
    }
    commitEnqueue() {
        if (this.pendingQueue.length === 0) {
            throw Error("there is no pending entry in the pending que: ");
        }
        let e1 = this.pendingQueue[0];
        //this.queue.push(e1);
        this.enqueue(...e1);
        this.pendingQueue = [];
    }
    dequeue() {
        this.queue.shift();
    }
    pop() {
        this.queue.pop();
    }
    get length() {
        return this.queue.length;
    }
    toString(additionalCol) {
        let arr = [];
        console.log("queue.len=" + this.queue.length);
        this.queue.forEach(element => {
            if (!this.pendingQueue.some(pendingE => pendingE[0] !== element[0])) {
                //pendingQueue already has this elt;
                arr.push(element.join(" "));
            }
        });
        //if ("xx") return arr.reverse().join(",");
        if (this.pendingQueue.length > 0) {
            let e1 = this.pendingQueue[0];
            if (arr.length > 0) {
                arr.pop(); //excluding the last one from the regular queue.
                //let arrExcludingLast = arr.slice(0, arr.length - 1);
            }
            arr.push(e1.join(" "));
        }
        if (additionalCol) {
            arr.push(additionalCol.join(" "));
        }
        let ret = arr.reverse().join(",");
        //todo: DevLib.setStatus("ob=" + ret);
        return ret;
    }
    quoteColumnName(columnName, colOrderBySuffix) {
        let ret;
        if (columnName.includes('"')) {
            ret = columnName;
        }
        else {
            ret = `"${columnName}"`;
        }
        return ret;
    }
    clear() {
        this.queue = [];
        this.pendingQueue = [];
    }
}
