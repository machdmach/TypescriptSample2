export class TimedBinarySemaphore {
    constructor(intervalMillis) {
        this.isAvailable = true;
        this.intervalMillis = intervalMillis;
        this.intervalTimerHandle = undefined;
        this.isAvailable = true;
    }
    //=========================================================================
    tryGet() {
        if (this.intervalTimerHandle === undefined) {
            this.intervalTimerHandle = window.setInterval(function (p1) {
                let thisObj = p1;
                thisObj.isAvailable = true;
            }, this.intervalMillis, this);
            console.log('...window.setInterval, intervalTimerHandle=' + this.intervalTimerHandle);
        }
        if (this.isAvailable) {
            this.isAvailable = false;
            console.log('tryGet: available, go ahead');
            return true;
        }
        else {
            console.log('tryGet: not available');
            return false;
        }
    }
    callIfANotAlreadyCalledRecently(callback) {
        if (this.tryGet()) {
            console.log('executing callback');
            callback();
        }
        else {
            console.log('not available, fail to execute callback');
        }
    }
    clear() {
        window.clearInterval(this.intervalTimerHandle);
        console.log('...window.clearInterval, intervalTimerHandle=' + this.intervalTimerHandle);
        this.intervalTimerHandle = undefined;
    }
    //=========================================================================
    static Tests() {
        let s = new TimedBinarySemaphore(500);
        //onKeyPress
        if (s.tryGet()) {
            //obj1.call(1, '3');
        }
        let b2 = s.tryGet();
        s.callIfANotAlreadyCalledRecently(function () { console.log('abc'); });
        setTimeout(function () {
            if (s.tryGet()) {
                console.log('should be executing now');
            }
        }, 1000);
        //s.clear();
    }
}
/*
A mutex is really a semaphore with value 1.

A mutex can only be released by the thread which has ownership, i.e. the thread which previously
 called the Wait function, (or which took ownership when creating it). A semaphore can be released by any thread.

A thread can call a wait function repeatedly on a mutex without blocking.
 However, if you call a wait function twice on a binary semaphore without
 releasing the semaphore in between, the thread will block.
*/
