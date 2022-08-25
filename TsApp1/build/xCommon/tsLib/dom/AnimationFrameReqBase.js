import { DebugUITable } from "./DebugUITable.js";
export var AnimationState;
(function (AnimationState) {
    AnimationState[AnimationState["Unknown"] = 0] = "Unknown";
    AnimationState[AnimationState["Ready"] = 1] = "Ready";
    AnimationState[AnimationState["Running"] = 2] = "Running";
    AnimationState[AnimationState["Pausing"] = 3] = "Pausing";
    AnimationState[AnimationState["Resuming"] = 4] = "Resuming";
    AnimationState[AnimationState["Finished"] = 5] = "Finished";
})(AnimationState || (AnimationState = {}));
export class AnimationFrameReqBase {
    constructor() {
        //=========================================================================
        this.animatorCount = 0;
        this.distance = 1000; //px
        this.startTime = 0;
        this.currIterationCount = 0; //infinite
        this.currFrameCount = 0;
        this.pauseStartedTime = 0;
        this.debugLastDisplayed = new Date();
        //if (!"debug") console.log(`currTime:${currTime} - startTime:${this.startTime} = elapsedTime:${elapsedTime}, currDistance: ${currDistance}`);
    }
    get currStateName() { return AnimationState[this.currState]; }
    isCurrentState(stateToCheck) { return stateToCheck === this.currState; }
    //animation: 3s ease-in 1s 2 reverse both paused slideinz;
    //animation: duration | timing-function | delay | iteration-count | direction | fill-mode | play-state | name
    //   animation: 4s linear 0s infinite alternate move_eye;
    //   @keyframes move_eye { from { margin-left: -20%; } to { margin-left: 100%; }  }
    //=========================================================================
    setAnimationState(newState, addlInfo) {
        let mesg = "AnimationState changed to: " + AnimationState[newState];
        mesg += ", " + addlInfo;
        if (db)
            console.log(mesg);
        this.currState = newState;
    }
    setDuration60Hz() {
        this.duration = this.distance * 1000 / 60; //1000 millis 60 times
    }
    showDebugInfo(data) {
        if (data === undefined) {
            data = { currTime: 0, currDistance: 0, elapsedTime: 0 };
        }
        if (new Date().getTime() - this.debugLastDisplayed.getTime() < 500) {
            return;
        }
        this.debugLastDisplayed = new Date();
        if (!this.debugTab) {
            this.debugTab = new DebugUITable(".debugPane1");
        }
        let tw = this.debugTab;
        tw.startCountingFields();
        tw.setLabelValue("currIterationCount", this.currIterationCount);
        tw.setLabelValue("currFrameCount", this.currFrameCount);
        tw.setLabelValue("distance / currDistance", this.distance + " / " + data.currDistance);
        tw.setLabelValue("duration / elapsedTime(currTime-startTime)", this.duration + " / " + data.elapsedTime);
        tw.setLabelValue("currState", AnimationState[this.currState]);
        tw.setLabelValue("startTime", this.startTime);
        tw.setLabelValue("currTime---", data.currTime);
        tw.setLabelValue("pauseStartedTime", this.pauseStartedTime);
    }
}
