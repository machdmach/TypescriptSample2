export class TimedThrottleJobQueue {
    timeoutMillis: number;
    timeoutHandle: number | undefined;
    callBackExecutedCount: number = 0;
    callBackAbortedCount: number = 0;
    jobQueue: Function[];

    constructor(intervalMillis: number) {
        this.timeoutMillis = intervalMillis;
        this.timeoutHandle = undefined;
        this.jobQueue = [];
    }

    push(callback: Function) {
        if (this.timeoutHandle !== undefined) {
            this.callBackAbortedCount++;
            console.log('clearing timeout, handle=' + this.timeoutHandle + ', ' + this.callBackAbortedCount + ' callbacks aborted');
            window.clearTimeout(this.timeoutHandle);
            this.timeoutHandle = undefined;
        }

        this.timeoutHandle = window.setTimeout(function (p1: any) {
            //Function.call(callback, args);
            //callback(args);
            let thisObj = p1 as TimedThrottleJobQueue;
            callback();

            thisObj.callBackExecutedCount++;
            console.log(thisObj.callBackExecutedCount + ' callbacks executed'); // + callback.name);
            thisObj.timeoutHandle = undefined;
        }, this.timeoutMillis, this);
    }
    //=========================================================================
    static Tests() {
        let q = new TimedThrottleJobQueue(1000);
        //onKeyPress
        //  s.push(function () { callAjax(); //to get data for autocomplete/autosuggest })s

        q.push(function () { console.log('abc 0'); });
        q.push(function () { console.log('abc 111'); });
        q.push(function () { console.log('abc 111 x'); });
        setTimeout(function () {
            q.push(function () { console.log('abc vvvvvvvvv'); });
            q.push(function () { console.log('abc 999'); });
        }, 1000);
    }

    //=========================================================================
    private ensureInitIntervalTimer() {
        if (this.timeoutHandle === undefined) {
            this.timeoutHandle = window.setInterval(function (p1: any) {
                let thisObj = p1 as TimedThrottleJobQueue;
                thisObj.executeCallback();
            }, this.timeoutMillis, this);

            console.log('...window.setInterval, intervalTimerHandle=' + this.timeoutHandle);
        }
    }
    private executeCallback() {
        let q = this.jobQueue;
        if (q.length === 0) {
            console.log('no callback in queued to be excecuted');
            return;
        }
        let callback = q.pop() as Function;
        callback();
        this.callBackExecutedCount++;
        console.log(this.callBackExecutedCount + ' callbacks executed'); // + callback.name);
        console.log('callbacks not executed count, ', q.length);
        q.length = 0;
    }
    push2Interval(callback: Function) {
        this.ensureInitIntervalTimer();
        this.jobQueue.push(callback);
        console.log('queueing callback, queueCount=' + this.jobQueue.length);
    }
    clearInterval() {
        if (this.timeoutHandle !== undefined) {
            window.clearInterval(this.timeoutHandle);
            console.log('...window.clearInterval, intervalTimerHandle=' + this.timeoutHandle);
            this.timeoutHandle = undefined;
        }
    }
}
