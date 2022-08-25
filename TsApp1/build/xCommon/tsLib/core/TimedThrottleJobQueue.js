export class TimedThrottleJobQueue {
    constructor(intervalMillis) {
        this.callBackExecutedCount = 0;
        this.callBackAbortedCount = 0;
        this.timeoutMillis = intervalMillis;
        this.timeoutHandle = undefined;
        this.jobQueue = [];
    }
    push(callback) {
        if (this.timeoutHandle !== undefined) {
            this.callBackAbortedCount++;
            console.log('clearing timeout, handle=' + this.timeoutHandle + ', ' + this.callBackAbortedCount + ' callbacks aborted');
            window.clearTimeout(this.timeoutHandle);
            this.timeoutHandle = undefined;
        }
        this.timeoutHandle = window.setTimeout(function (p1) {
            //Function.call(callback, args);
            //callback(args);
            let thisObj = p1;
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
    ensureInitIntervalTimer() {
        if (this.timeoutHandle === undefined) {
            this.timeoutHandle = window.setInterval(function (p1) {
                let thisObj = p1;
                thisObj.executeCallback();
            }, this.timeoutMillis, this);
            console.log('...window.setInterval, intervalTimerHandle=' + this.timeoutHandle);
        }
    }
    executeCallback() {
        let q = this.jobQueue;
        if (q.length === 0) {
            console.log('no callback in queued to be excecuted');
            return;
        }
        let callback = q.pop();
        callback();
        this.callBackExecutedCount++;
        console.log(this.callBackExecutedCount + ' callbacks executed'); // + callback.name);
        console.log('callbacks not executed count, ', q.length);
        q.length = 0;
    }
    push2Interval(callback) {
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
