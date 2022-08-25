import { CircularQueue } from "../core/CircularQueue.js";
import { AnimationFrameRequestor, AnimationState } from "../dom/AnimationFrameRequestor.js";
import { ThreadX } from "../core/ThreadX.js";
import { ImageSliderBase } from "./ImageSliderBase.js";
import { ArrayX } from "../core/ArrayX.js";
export class ImageSlider extends ImageSliderBase {
    constructor(eltOrSelector) {
        super(eltOrSelector);
        this.setupContainerElt();
        windowBag.slider = this;
        if ("left-arrow-nav") {
            let nav = this.createElt("slideNav slidePrevNav", this.containerElt);
            let btn = this.createElt("slideBtn btnPrev", nav, "button");
            btn.title = "Previous Image";
            let icon = this.createElt("material-icons", btn, "i");
            icon.textContent = "chevron_left";
            btn.addEventListener("click", (ev) => {
                this.stopEvent(ev);
                this.slideToPreviousImage(ev);
            });
        }
        if ("right-arrow-nav") {
            let nav = this.createElt("slideNav slideNextNav", this.containerElt);
            let btn = this.createElt("slideBtn btnNext", nav, "button");
            btn.title = "Next Image";
            let icon = this.createElt("material-icons", btn, "i");
            icon.textContent = "chevron_right";
            btn.addEventListener("click", (ev) => {
                this.stopEvent(ev);
                this.slideToNextImage(ev);
            });
        }
        if ("pause btn") {
            let nav = this.createElt("slideNav pauseSlideNav", this.containerElt);
            let btn = this.createElt("slideBtn btnPauseSlider", nav, "button");
            btn.title = "Pause Slider";
            let icon = this.createElt("material-icons", btn, "i");
            icon.textContent = "pause_circle_outline"; //pause";
            btn.addEventListener("click", (ev) => {
                if (db)
                    console.log("pauseBtn clicked: currState:" + this.animator.currStateName);
                this.stopEvent(ev);
                this.toggle(ev);
                //this.pause(ev);
            });
            this.pauseBtn = btn;
        }
        if ("play btn") {
            let nav = this.createElt("slideNav playSlideNav", this.containerElt);
            let btn = this.createElt("slideBtn btnPlaySlider", nav, "button");
            btn.title = "Play Slider";
            let icon = this.createElt("material-icons", btn, "i");
            icon.textContent = "play_circle_outline"; // play_arrow
            btn.addEventListener("click", async (ev) => {
                if (db)
                    console.log("playBtn clicked: currState:" + this.animator.currStateName);
                this.stopEvent(ev);
                this.toggle(ev, 0);
            });
            this.playBtn = btn;
        }
        this.setAnimationState(AnimationState.Pausing);
    }
    //=========================================================================
    setupContainerElt() {
        this.containerElt.tabIndex = 0;
        this.containerElt.addEventListener("click", (ev) => {
            if (db)
                console.log("containerElt clicked");
            this.stopEvent(ev);
            this.toggle(ev);
            if ("") {
                let el = document.createElement("span");
                el.textContent = "clicked";
                el.id = "mouseClickedElt";
                document.body.appendChild(el);
                let st = el.style;
                st.position = "fixed";
                st.left = ev.x + "px";
                st.top = ev.y + "px";
            }
        });
        this.containerElt.addEventListener("keyup", (ev) => {
            if (db)
                console.log("container keyup event: ", ev);
            this.stopEvent(ev);
            let btnClicked = ev.currentTarget;
            let isNavNext;
            if (ev instanceof KeyboardEvent) { //#keyboard, #keyup, #keydown
                //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
                if (db)
                    console.log("key is: ", ev);
                let keyPressed = ev.key;
                if (keyPressed === "ArrowLeft" || keyPressed === "ArrowUpz") {
                    isNavNext = false;
                    this.slideToPreviousImage(ev);
                }
                else if (keyPressed === "ArrowRight" || keyPressed === "ArrowDownz") {
                    isNavNext = true;
                    this.slideToNextImage(ev);
                }
                else if (keyPressed === "Escape" || keyPressed === "zd") {
                    this.toggle(ev);
                }
                else if (keyPressed === "Enter") {
                    return; //already executed via click.  pressing return key on a focus buttons generates both click and key event.
                }
                else {
                    //other key, don't call callback, just return;
                    return; //-------------------------------------------------------
                }
            }
            else {
                //mouse click.
            }
        }); // end addEventListener
    }
    //=========================================================================
    buildElementsFromImages(imageSrcList) {
        let slides = [];
        for (let k = 0; k < imageSrcList.length; k++) {
            let src = imageSrcList[k];
            let slideElt = document.createElement("section");
            let imgEl = document.createElement("img");
            imgEl.className = "sliderx-image";
            slideElt.appendChild(imgEl);
            imgEl.src = src;
            slides.push(slideElt);
        }
        return slides;
    }
    //=========================================================================
    setSlides(slides) {
        if (ArrayX.areAllStrings(slides)) {
            slides = this.buildElementsFromImages(slides);
        }
        if (slides.length < 2) {
            if (db)
                console.log("imageList is too short");
        }
        //this.slidingElt.innerHTML = "loading...";
        this.slideQueue = new CircularQueue();
        let docFragment = document.createDocumentFragment();
        for (let k = 0; k < slides.length; k++) {
            let slideElt = slides[k];
            slideElt.className = "sliderx-slide";
            docFragment.appendChild(slideElt);
            if (slideElt instanceof HTMLElement) {
                slideElt.dataset.slideIndex = "" + k;
            }
            this.slideQueue.enqueue(slideElt);
        }
        let gotoSlideNav = qsNullable(".gotoSlidesNav");
        if (gotoSlideNav === null) {
            gotoSlideNav = this.createElt("slideNav gotoSlidesNav", this.containerElt);
        }
        else {
            gotoSlideNav.innerHTML = "";
        }
        for (let k = 0; k < this.getAllSlides().length; k++) {
            let btn = this.createElt("slideBtn btnGotoSlide", gotoSlideNav, "button");
            btn.title = "Goto Slider " + (k + 1);
            btn.dataset.btnIndex = "" + k;
            let icon = this.createElt("material-icons", btn, "i");
            icon.textContent = "lens";
            if (k === 0) {
                btn.classList.add("btnGotoSlide-selected");
            }
            const btnIndex = k;
            btn.addEventListener("click", async (ev) => {
                this.stopEvent(ev);
                await this.jumpToImageWithIndex(btnIndex);
            });
        }
        this.slidingElt.innerHTML = "";
        this.slidingElt.appendChild(docFragment);
        this.slidingElt.style.marginLeft = "0px";
        this.leadingSlideIndex = 0;
    }
    //=========================================================================
    async jumpToImageWithIndex(slideIndex) {
        this.animator.stop();
        while (this.leadingSlideIndex !== slideIndex) {
            this.swapImages();
        }
        this.slidingElt.style.marginLeft = "0px";
        this.updateCurrentSlideButton(slideIndex);
        this.setAnimationState(AnimationState.Pausing);
    }
    //=========================================================================
    async slideToNextImage(evt) {
        let nextSlideIndex = CircularQueue.getArrayNextIndex(this.leadingSlideIndex, this.getAllSlides());
        await this.jumpToImageWithIndex(nextSlideIndex);
    }
    //=========================================================================
    async slideToPreviousImage(evt) {
        let style = window.getComputedStyle(this.slidingElt);
        let ml = style.marginLeft;
        let marginLeftNumeric = Math.abs(Number.parseInt(style.marginLeft, 10));
        let prevSlideIndex = this.leadingSlideIndex;
        if (marginLeftNumeric < 5) {
            prevSlideIndex = CircularQueue.getArrayPreviousIndex(prevSlideIndex, this.getAllSlides());
        }
        await this.jumpToImageWithIndex(prevSlideIndex);
    }
    //=========================================================================
    async toggle(evt, initialDelay) {
        if (this.animator.isCurrentState(AnimationState.Pausing)) {
            await this.resume();
        }
        else if (this.animator.isCurrentState(AnimationState.Finished)) {
            if (initialDelay) {
                // initialDelay = this.dela
            }
            await this.run();
        }
        else {
            this.pause();
        }
    }
    async run(initialDelay) {
        let gotoSlideBtnReadyToChange = true;
        let onCycleCompleteFunc = async (currDistance) => {
            if (db)
                console.log("callback received Slide-Finished");
            this.swapImages();
            if (db)
                console.log("nap time, pausing for " + this.pauseTime + " millis");
            await ThreadX.Sleep(this.pauseTime);
            let slidesUpdated = this.checkForSlidesUpdates();
            if (slidesUpdated) {
                await ThreadX.Sleep(this.pauseTime);
            }
            gotoSlideBtnReadyToChange = true;
            return true;
        };
        //--------------------------------------------
        let callbackStepFunc = (currDistance) => {
            currDistance = Math.ceil(currDistance);
            if (this.animator.currFrameCount > 10 && gotoSlideBtnReadyToChange) {
                if (db)
                    console.log("updating the the currentSlideButton b/c 10 frames have passed, frameCount=" + this.animator.currFrameCount);
                this.updateCurrentSlideButton();
                gotoSlideBtnReadyToChange = false;
            }
            this.slidingElt.style.marginLeft = -currDistance + "px";
            return true;
        };
        //------------------------------------------- end callback def
        if (this.animator !== undefined) {
            if (db)
                console.log("animator already running");
            if (this.getAllSlides().length > 1) {
                await this.resume();
            }
            return; //-------------------------------- already running
        }
        if (initialDelay === undefined) {
            initialDelay = this.pauseTime;
        }
        let totalDistance = this.slideWidth;
        this.setAnimationState(AnimationState.Running);
        let ani = new AnimationFrameRequestor(totalDistance, this.slidingDuration, callbackStepFunc);
        ani.onCycleComplete = onCycleCompleteFunc;
        this.animator = ani;
        console.log("Slider start running");
        if (this.getAllSlides().length > 1) {
            await ani.start(initialDelay);
        }
    }
    //=========================================================================
    enqueueNewSlides(imageSrcList) {
        if (imageSrcList.length < 2) {
            if (db)
                console.log("imageList is too short");
        }
        this.newSlides = imageSrcList;
    }
    //=========================================================================
    checkForSlidesUpdates() {
        if (!this.newSlides) {
            return false; //--------------
        }
        this.setSlides(this.newSlides);
        this.newSlides = undefined;
        return true;
    }
}
