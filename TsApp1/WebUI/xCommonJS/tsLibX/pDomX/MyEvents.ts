interface EventEntity {
    name: string;
    handlerID: string;
    handler: Function;
}

export class MyEvents {
    //=========================================================================
    private eventHandlerList: EventEntity[] = [];
    private validEvents: string[];
    eventOwner: Object;

    constructor(eventSource: Object, ...validEvents: string[]) {
        this.validEvents = validEvents;
        this.eventOwner = eventSource;
    }

    //=========================================================================
    private checkEventName(eventName: string) {
        if (!this.validEvents.includes(eventName)) {
            throw Error("invalid event: " + eventName + ", validEvents=" + this.validEvents.join(","));
        }
    }

    //=========================================================================
    private getEventNames() {
        if (this.eventHandlerList.length === 0) {
            return "No handlers found for any event.";
        }
        else {
            let s = "";
            for (let i = 0; i < this.eventHandlerList.length; i++) {
                s += ", eventName: " + this.eventHandlerList[i].name;
            }
            return s;
        }
    }

    addEventHandlerForMultipleEvents(eventNames: string[], handler: Function, handlerID?: string): void {
        eventNames.forEach(eventName => {
            this.addEventHandler(eventName, handler, handlerID);
        });
    }

    addEventHandler(eventName: string, handler: Function, handlerID?: string): void {
        this.checkEventName(eventName);
        handlerID = handlerID || "default";
        let newHandlerEnt: EventEntity = { name: eventName, handlerID: handlerID, handler: handler };

        let handlers = this.getEventHandlers(eventName, handlerID);
        if (handlers.length === 0) {
            console.log("adding eventListener fo event: " + eventName);
        }
        else {
            throw Error("event already added: " + eventName + ", handlerID: " + handlerID);
        }
        this.eventHandlerList.push(newHandlerEnt);
    }

    //=========================================================================
    getEventHandlers(eventName: string, handlerID?: string) {
        let ret: EventEntity[] = [];
        this.eventHandlerList.forEach(e => {
            if (e.name.localeCompare(eventName, undefined, { sensitivity: 'base' }) === 0) {
                if (handlerID) {
                    if (e.handlerID.localeCompare(handlerID, undefined, { sensitivity: 'base' }) === 0) {
                        //eventName and id matched
                        ret.push(e);
                    }
                    else {
                        //handlerID no matched
                    }
                }
                else {
                    ret.push(e);
                }
            }
        });
        return ret;
    }

    //=========================================================================
    /**
     * Dispatches a synthetic event event to target and returns true
     * if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise.
     */
    //dispatchEvent(event: Event): boolean {
    async fireEvent(eventName: string, argObj?: any) {
        console.log("firing event: " + eventName + ", args=", argObj);

        this.checkEventName(eventName);
        let handlers = this.getEventHandlers(eventName);
        if (handlers === undefined) {
            console.log(eventName + " fired, no handlers found for this eventName, allEvents=" + this.getEventNames());
        }
        else {
            for (let handler of handlers) {
                let cb = handler.handler as Function;
                await cb(argObj, argObj);
            }
        }
    }

    //=========================================================================
    /**
     * Removes the event listener in target's event listener list with the same type, callback, and options.
     */
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void {
        //#todo
    }
    clear() {
        this.eventHandlerList = [];
    }
}
