export interface MyObserver {
    //https://angular.io/guide/observables
    next(val: any): void;
    error?(err: string): void;
    complete?(): void;
}

//=========================================================================
export class MyObservable {
    observers: (MyObserver | Function)[];

    constructor() {
        this.observers = [];
    }

    //=========================================================================
    registerObserver(observer: MyObserver | Function) {
        //subscribe
        this.observers.push(observer);
        console.log("observer registered, typeof=" + typeof observer);
    }

    //=========================================================================
    unregisterObserver(observer: MyObserver | Function, throwsOnNotFound = true) {
        //unsubscribe
        //delete arr[3], array becomes sparse,
        //The reason the element is not actually removed from the array is the delete operator is more
        //about freeing memory than deleting an element. The memory is freed when there are no more references to the value.
        let idx = this.getObserverIndex(observer);
        let ret = false;
        if (idx >= 0) {
            this.observers.splice(idx, 1);
            ret = true;
        }
        else {
            if (throwsOnNotFound) {
                throw Error("Observer not found to unsubscribe");
            }
        }
        //console.log("observer registered, typeof=" + typeof observer);
        return ret;
    }

    //=========================================================================
    getObserverIndex(targetObserver: MyObserver | Function) {
        for (let i = 0; i < this.observers.length; i++) {
            if (this.observers[i] === targetObserver) {
                return i;
            }
        }
        return -1;
    }

    //=========================================================================
    notifyObservers() {
        this.observers.forEach(observer => {
            let val = null;
            if (observer instanceof Function) {
                console.log("calling function observer");
                observer(val);
            }
            else {
                console.log("calling next() method of interface observer");
                observer.next(val);
            }
        });
    }

    //=========================================================================
    static test1() {
        let ob = new MyObservable();
        ob.registerObserver({
            next: function (val: any) {
                console.log("I am real observer, recevied mesg ");
            },
        });
        ob.registerObserver(() => {
            console.log("I am Function observer, recevied mesg ");
        });
        ob.notifyObservers();
    }
}
