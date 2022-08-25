import { DebugUITable } from "./DebugUITable.js";

export enum AnimationState {
    Unknown, //0
    Ready, //1
    Running, //2
    Pausing, //3
    Resuming, //4
    Finished, //5
}
export interface AnimationData {
    currTime: number;
    elapsedTime: number;
    currDistance: number;
}

export abstract class AnimationFrameReqBase {
    //=========================================================================
    animatorCount = 0;
    distance = 1000; //px
    duration!: number; // = 10 * 1000; //10 secs
    protected currState!: AnimationState;
    get currStateName() { return AnimationState[this.currState]; }
    isCurrentState(stateToCheck: AnimationState) { return stateToCheck === this.currState; }
    startTime = 0;
    currIterationCount = 0; //infinite
    currFrameCount = 0;
    pauseStartedTime = 0;

    //animation: 3s ease-in 1s 2 reverse both paused slideinz;
    //animation: duration | timing-function | delay | iteration-count | direction | fill-mode | play-state | name
    //   animation: 4s linear 0s infinite alternate move_eye;
    //   @keyframes move_eye { from { margin-left: -20%; } to { margin-left: 100%; }  }

    //=========================================================================
    setAnimationState(newState: AnimationState, addlInfo: string) {
        let mesg = "AnimationState changed to: " + AnimationState[newState];
        mesg += ", " + addlInfo;
        if (db) console.log(mesg);
        this.currState = newState;
    }
    setDuration60Hz() {
        this.duration = this.distance * 1000 / 60; //1000 millis 60 times
    }
    //=========================================================================
    debugTab!: DebugUITable;
    debugLastDisplayed = new Date();
    showDebugInfo(data?: AnimationData) {
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
    //if (!"debug") console.log(`currTime:${currTime} - startTime:${this.startTime} = elapsedTime:${elapsedTime}, currDistance: ${currDistance}`);
}
