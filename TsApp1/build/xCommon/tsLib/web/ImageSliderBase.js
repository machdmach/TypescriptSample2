import { CircularQueue } from "../core/CircularQueue.js";
import { AnimationState } from "../dom/AnimationFrameRequestor.js";
export class ImageSliderBase {
    constructor(eltOrSelector) {
        this.accessibility = true;
        this.adaptiveHeight = false; //height adaptive to the height of each image
        this.arrows = true;
        this.asNavFor = null;
        this.prevArrow = '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>';
        this.nextArrow = '<button class="slick-next" aria-label="Next" type="button">Next</button>';
        //autoplay = true;
        this.autoSlide = true;
        //autoplaySpeed = 3000;
        this.pauseTime = 3000; //pauseTime per image
        this.slidingDuration = 500; //------------------------------- time per slide
        // intervalTimeout = 3000;
        this.centerMode = false; //for multi-images per slide, center and hilight the middle image
        this.centerPadding = '50px';
        this.cssEase = 'ease';
        //customPaging = function (slider; i) { return $('<button type="button" />').text(i + 1); };
        this.dots = false;
        this.dotsClass = 'mcc-slider-dots';
        this.draggable = true;
        this.easing = 'linear';
        this.edgeFriction = 0.35;
        this.fade = false;
        this.focusOnSelect = false;
        this.focusOnChange = false;
        this.infinite = true; //----------------------- loop circularly and continuously
        this.initialSlide = 0;
        this.lazyLoad = 'ondemand';
        this.mobileFirst = false;
        this.pauseOnHover = true;
        this.pauseOnFocus = true;
        this.pauseOnDotsHover = false;
        this.respondTo = 'window';
        this.responsive = null;
        this.rows = 1;
        this.rtl = false;
        this.slideWidth = 123;
        this.slide = '';
        this.slidesPerRow = 1;
        this.slidesToShow = 1;
        this.slidesToScroll = 1;
        // swipe = true;
        // swipeToSlide = false;
        // touchMove = true;
        // touchThreshold = 5;
        // useCSS = true;
        // useTransform = true;
        this.variableWidth = false; //of the images
        this.vertical = false;
        // viewingIndex = 0;
        //leadingSlideElt!: Element;
        this.leadingSlideIndex = 0;
        let sliderxElt = qs(eltOrSelector);
        sliderxElt.classList.add("sliderx");
        sliderxElt.textContent = "";
        //MessageBox.showAlert("w=" + outerElt.clientWidth);
        this.slideWidth = sliderxElt.clientWidth;
        if (this.slideWidth <= 0) {
            throw Error("invalid clientWidth");
        }
        this.containerElt = this.createElt("sliderx-container", sliderxElt);
        this.slidingElt = this.createElt("sliderx-sliding-elt", this.containerElt);
    }
    //=========================================================================
    swapImages() {
        this.slidingElt.style.marginLeft = "0px";
        let lastSlidedSlide = this.slidingElt.firstElementChild;
        this.slidingElt.appendChild(lastSlidedSlide);
        this.leadingSlideIndex = CircularQueue.getArrayNextIndex(this.leadingSlideIndex, this.getAllSlides());
        //this.updateCurrentButton();
    }
    //=========================================================================
    updateCurrentSlideButton(slideIndex) {
        //slideIndex = this.leadingSlideIndex;
        if (slideIndex === undefined) {
            slideIndex = CircularQueue.getArrayNextIndex(this.leadingSlideIndex, this.getAllSlides());
        }
        let allBtns = this.getAllGotoButtons();
        allBtns.forEach(btn => {
            btn.classList.remove("btnGotoSlide-selected");
        });
        allBtns[slideIndex].classList.add("btnGotoSlide-selected");
    }
    //=========================================================================
    getAllGotoButtons() {
        let parentElt = this.slidingElt.parentElement;
        let gotoSlidesElt = qs(".gotoSlidesNav", parentElt);
        //#slider1 > div > div.slideNav.gotoSlidesNav
        let allGotoButtons = qsAll("button", gotoSlidesElt);
        return allGotoButtons;
    }
    //=========================================================================
    getAllSlides() {
        //let allSlides = qsAll("img", this.slidingElt);
        let allSlides = this.slideQueue.getEnqueuedArray();
        return allSlides;
    }
    //=========================================================================
    pause(evt) {
        this.setAnimationState(AnimationState.Pausing);
        this.animator.pause();
    }
    async stop(evt) {
        this.setAnimationState(AnimationState.Pausing);
        if (this.animator) {
            this.animator.stop();
        }
    }
    //=========================================================================
    async resume(evt) {
        this.setAnimationState(AnimationState.Running);
        await this.animator.resume_async();
    }
    //=========================================================================
    //setAnimationState(state: number): void;//overloading, same # of args, but diff arg and return types
    setAnimationState(state) {
        //if ("s") return;
        let pauseBtn = this.pauseBtn.parentElement;
        let playBtn = this.playBtn.parentElement;
        if (state === AnimationState.Running) {
            pauseBtn.style.zIndex = "";
            playBtn.style.zIndex = "-1";
        }
        else {
            pauseBtn.style.zIndex = "-1";
            playBtn.style.zIndex = "";
        }
    }
    //=========================================================================
    createElt(className, parentElt, tagName = "div") {
        let elt = document.createElement(tagName);
        elt.className = className;
        parentElt.appendChild(elt);
        return elt;
    }
    //=========================================================================
    stopEvent(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();
    }
}
