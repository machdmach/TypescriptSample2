export class MyEvents {
    constructor(eventSource, ...validEvents) {
        //=========================================================================
        this.eventHandlerList = [];
        this.validEvents = validEvents;
        this.eventOwner = eventSource;
    }
    //=========================================================================
    checkEventName(eventName) {
        if (!this.validEvents.includes(eventName)) {
            throw Error("invalid event: " + eventName + ", validEvents=" + this.validEvents.join(","));
        }
    }
    //=========================================================================
    getEventNames() {
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
    addEventHandlerForMultipleEvents(eventNames, handler, handlerID) {
        eventNames.forEach(eventName => {
            this.addEventHandler(eventName, handler, handlerID);
        });
    }
    addEventHandler(eventName, handler, handlerID) {
        this.checkEventName(eventName);
        handlerID = handlerID || "default";
        let newHandlerEnt = { name: eventName, handlerID: handlerID, handler: handler };
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
    getEventHandlers(eventName, handlerID) {
        let ret = [];
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
    async fireEvent(eventName, argObj) {
        console.log("firing event: " + eventName + ", args=", argObj);
        this.checkEventName(eventName);
        let handlers = this.getEventHandlers(eventName);
        if (handlers === undefined) {
            console.log(eventName + " fired, no handlers found for this eventName, allEvents=" + this.getEventNames());
        }
        else {
            for (let handler of handlers) {
                let cb = handler.handler;
                await cb(argObj, argObj);
            }
        }
    }
    //=========================================================================
    /**
     * Removes the event listener in target's event listener list with the same type, callback, and options.
     */
    removeEventListener(type, callback, options) {
        //#todo
    }
    clear() {
        this.eventHandlerList = [];
    }
}
