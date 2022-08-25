type StringStringTuple = [string, string];

export class MultiColumnOrderByQueue { //#queue
    queue: StringStringTuple[] = [];
    pendingQueue: StringStringTuple[] = [];
    maxCount: number;

    constructor(maxCount: number) {
        this.maxCount = maxCount;
    }

    enqueue(columnName: string, colOrderBySuffix: string) {
        columnName = this.quoteColumnName(columnName);
        //create a new queue with all elts except the one that matches the incumbent one
        this.queue = this.queue.filter(e => e[0] !== columnName);
        this.queue = this.queue.filter(e => !e[1].includes(columnName)); //eg: "Make", e[1]='DESC, "Model" Asc';

        let entry: StringStringTuple = [columnName, colOrderBySuffix];
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
    enqueueLater(columnName: string, colOrderBySuffix: string) {
        console.log("enqueueLater, columnName=" + columnName + ", colOrderBySuffix=" + colOrderBySuffix);

        columnName = this.quoteColumnName(columnName);
        if (this.pendingQueue.length > 0) {
            let e1 = this.pendingQueue[0];
            throw Error("there is already a pending entry in the pending que: " + e1[0]);
        }
        let entry: StringStringTuple = [columnName, colOrderBySuffix];
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
        let e1: [string, string] = this.pendingQueue[0];
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

    get length(): number {
        return this.queue.length;
    }
    toString(additionalCol?: StringStringTuple) {
        let arr: string[] = [];
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
                arr.pop();  //excluding the last one from the regular queue.
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
    private quoteColumnName(columnName: string, colOrderBySuffix?: string) {
        let ret: string;
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
