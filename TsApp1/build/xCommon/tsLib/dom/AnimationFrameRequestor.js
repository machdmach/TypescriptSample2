import { ThreadX } from "../core/ThreadX.js";
import { AnimationFrameReqBase, AnimationState } from "./AnimationFrameReqBase.js";
export * from "./AnimationFrameReqBase.js";
export class AnimationFrameRequestor extends AnimationFrameReqBase {
    constructor(distance, totalTime, callback) {
        super();
        //=========================================================================
        this.lastDistance = 0;
        this.callback = callback;
        if (!distance) {
            throw Error("totalPixelDistance, invalid value: " + distance);
        }
        if (typeof distance === "string") {
            distance = parseInt(distance, 10); //900px, px is excluded from parseInt
        }
        if (distance <= 0) {
            throw Error("totalPixelDistance, invalid value: " + distance);
        }
        if (db)
            console.log("param.distance=" + distance);
        this.distance = distance;
        this.duration = totalTime;
        this.reset(false);
    }
    //=========================================================================
    reset(resettingForNextCyle = false) {
        if (resettingForNextCyle) {
            this.setAnimationState(AnimationState.Running, "reset() for nextCycle");
        }
        else {
            this.setAnimationState(AnimationState.Ready, "reset()");
        }
        this.startTime = 0;
        this.pauseStartedTime = 0;
        this.currFrameCount = 0;
        if (db)
            console.log("reset done");
    }
    //=========================================================================
    resetForNextCycle() {
        this.reset(true);
    }
    //=========================================================================
    async restart(initialDelay) {
        this.resetForNextCycle();
        await this.start(initialDelay);
    }
    //=========================================================================
    async start(initialDelay) {
        if (this.currState !== AnimationState.Ready) {
            let errMesg = "start failed, currState must be Ready, not: " + this.currStateName;
            if (db)
                console.warn(errMesg);
        }
        if (initialDelay === undefined) {
            initialDelay = 0;
        }
        this.currIterationCount = 1;
        if (db)
            console.log(`sleeping for ${initialDelay} secs`);
        await ThreadX.Sleep(initialDelay);
        this.reset();
        if (this.animatorCount !== 0) {
            throw Error("animator is already running");
        }
        this.animatorCount++;
        await this.requestAnimations();
        console.log("animation requests done looping, this.animatorCount=" + this.animatorCount);
        this.animatorCount--;
    }
    //=========================================================================
    stop() {
        if (this.currState !== AnimationState.Running) {
            let errMesg = "stop failed, currState must be RUNNING, not: " + this.currStateName;
            if (db)
                console.warn(errMesg);
            //return;
        }
        if (db)
            console.log("stopping");
        this.reset();
        this.setAnimationState(AnimationState.Finished, "stop()");
        this.showDebugInfo();
    }
    //=========================================================================
    pause() {
        if (this.currState === AnimationState.Pausing) {
            let errMesg = "pause failed, already in state pausing";
            if (db)
                console.warn(errMesg);
            //throw Error(errMesg);
            return;
        }
        else if (this.currState !== AnimationState.Running) {
            let errMesg = "pausez failed, currState must be RUNNING, not: " + this.currStateName;
            if (db)
                console.warn(errMesg);
        }
        if (db)
            console.log("pausing");
        this.setAnimationState(AnimationState.Pausing, "pause()");
        this.showDebugInfo();
    }
    //=========================================================================
    async resume_async() {
        //resume from pause, or ready, or already-running
        if (this.currState === AnimationState.Running) {
            let errMesg = "resume failed, currState must be already RUNNING";
            if (db)
                console.warn(errMesg);
            //throw Error(errMesg);
            return;
        }
        else if (this.currState !== AnimationState.Pausing) {
            let errMesg = "resume failed, currState must be PAUSING, not: " + this.currStateName;
            if (db)
                console.warn(errMesg);
        }
        else {
            if (db)
                console.log("resuming");
        }
        this.setAnimationState(AnimationState.Resuming, "resume()");
        if (this.animatorCount === 0) {
            this.animatorCount++;
            await this.requestAnimations();
            this.animatorCount--;
        }
        else {
            console.warn("animator is already running: this.animatorCount=" + this.animatorCount);
        }
    }
    requestAnimations() {
        let p = new Promise((resolve, reject) => {
            let stepFunc = async (currTime) => {
                this.currFrameCount++;
                let pauseStartedTimeSaved = this.pauseStartedTime;
                if (this.currState === AnimationState.Pausing) {
                    this.pauseStartedTime = currTime; //Date.now();
                    if (db)
                        console.log("---pausing, this.pauseStartedTime set to: " + this.pauseStartedTime);
                    resolve();
                    return; //temporarily stops here. ------------------------------
                }
                else {
                    this.pauseStartedTime = 3; //reset pauseTime.........
                }
                if (this.currState === AnimationState.Ready) {
                    this.setAnimationState(AnimationState.Running, "from Ready");
                }
                else if (this.currState === AnimationState.Running) {
                }
                else if (this.currState === AnimationState.Finished) {
                    let errMesg = "Invalid operation, currState must not be Finished, curr=" + this.currStateName;
                    if (db)
                        console.warn(errMesg);
                    if (db)
                        console.log("AnimationState.Finished 2");
                    resolve();
                    return; //stops here. ------------------------------
                }
                else if (this.currState === AnimationState.Resuming) {
                    if (pauseStartedTimeSaved <= 3) {
                        let errMesg = "resuming failed, pauseStartedTimeSaved=" + pauseStartedTimeSaved;
                        console.warn(errMesg);
                    }
                    else {
                        let pauseEndedTime = currTime; //Date.now();
                        let pauseDuration = pauseEndedTime - pauseStartedTimeSaved;
                        this.startTime += pauseDuration;
                        if ("x") {
                            let errMesg = `resuming: pauseDuration:${pauseDuration} = pauseEndedTime: ${pauseEndedTime} - this.pauseStartedTime:${pauseStartedTimeSaved}`;
                            console.log(errMesg);
                            //reject(errMesg); return; //stops here. ------------------------------
                        }
                    }
                    this.setAnimationState(AnimationState.Running, "from resuming");
                }
                else {
                    let errMesg = "Unknown currState: " + this.currState;
                    if (db)
                        console.warn(errMesg);
                    throw Error(errMesg);
                }
                if (this.startTime === 0) {
                    this.startTime = currTime;
                }
                let elapsedTime = currTime - this.startTime;
                if (elapsedTime < 0) {
                    let errMesg = `elapsedTime negative: ${elapsedTime}, currTime:${currTime} - this.startTime:${this.startTime}`;
                    console.error(errMesg);
                    reject(errMesg);
                    return; //stops here. ------------------------------
                }
                let currDistance = (this.distance * elapsedTime) / this.duration;
                if (this.lastDistance > currDistance && this.currFrameCount > 1) {
                    let errMesg = `lastDistance ${this.lastDistance} GT currDistance ${currDistance}`;
                    console.error(errMesg);
                }
                this.lastDistance = currDistance;
                //if (!"debug") console.log(`currTime:${currTime} - startTime:${this.startTime} = elapsedTime:${elapsedTime}, currDistance: ${currDistance}`);
                let data = { currTime: currTime, currDistance: currDistance, elapsedTime: elapsedTime };
                this.showDebugInfo(data);
                if (currDistance < this.distance) {
                    let keepRequestingMoreFrames = this.callback(currDistance);
                    if (!keepRequestingMoreFrames) {
                        if (db)
                            console.log("stopping, callback return false");
                        resolve();
                        return; //stops here. ------------------------------
                    }
                    if (this.currState === AnimationState.Running) { //check currState again
                        requestAnimationFrame(stepFunc);
                    }
                }
                else {
                    if (currDistance > this.distance) {
                        currDistance = this.distance; //ensure max current distance is LE distance intialized
                    }
                    let keepRequestingMoreFrames = this.callback(currDistance); //callbacks the last time
                    if (!keepRequestingMoreFrames) {
                        if (db)
                            console.log("stopping, lastCallback return false");
                        resolve();
                        return; //stops here. ------------------------------
                    }
                    if (this.onCycleComplete) {
                        let keepRunning = await this.onCycleComplete(currDistance); //callback on Complete
                        if (keepRunning) {
                            if (this.currState === AnimationState.Running || this.currState === AnimationState.Resuming) {
                                this.currIterationCount++;
                                if (db)
                                    console.log("Running again z...");
                                this.resetForNextCycle();
                                requestAnimationFrame(stepFunc);
                            }
                            else {
                                if (db)
                                    console.log("onCycleComplete, keepRunning callback=true, but currState changed to:" + AnimationState[this.currState]);
                                resolve();
                                return; //stops here. ------------------------------
                            }
                        }
                        else {
                            //stop running here.............................................
                            this.setAnimationState(AnimationState.Finished, "caller returns false");
                            if (db)
                                console.log("AnimationState.Finished 1");
                            resolve();
                            return; //stops here. ------------------------------
                        }
                    }
                    else {
                        if (db)
                            console.log("stopping, onCycleComplete is null");
                        resolve();
                        return; //stops here. ------------------------------
                    }
                }
            }; //end stepFunc
            requestAnimationFrame(stepFunc);
        });
        return p;
    }
}
