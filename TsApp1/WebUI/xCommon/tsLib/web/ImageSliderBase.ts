import { CircularQueue } from "../core/CircularQueue.js";
import { AnimationFrameRequestor, AnimationState } from "../dom/AnimationFrameRequestor.js";

export abstract class ImageSliderBase {
    accessibility = true;

    adaptiveHeight = false;  //height adaptive to the height of each image

    arrows = true;
    asNavFor = null;
    prevArrow = '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>';
    nextArrow = '<button class="slick-next" aria-label="Next" type="button">Next</button>';

    //autoplay = true;
    autoSlide = true;
    //autoplaySpeed = 3000;
    pauseTime = 3000;   //pauseTime per image
    slidingDuration = 500;  //------------------------------- time per slide
    // intervalTimeout = 3000;

    centerMode = false;   //for multi-images per slide, center and hilight the middle image

    centerPadding = '50px';
    cssEase = 'ease';
    //customPaging = function (slider; i) { return $('<button type="button" />').text(i + 1); };
    dots = false;
    dotsClass = 'mcc-slider-dots';
    draggable = true;
    easing = 'linear';
    edgeFriction = 0.35;
    fade = false;
    focusOnSelect = false;
    focusOnChange = false;

    infinite = true; //----------------------- loop circularly and continuously

    initialSlide = 0;

    lazyLoad = 'ondemand';
    mobileFirst = false;
    pauseOnHover = true;
    pauseOnFocus = true;
    pauseOnDotsHover = false;
    respondTo = 'window';
    responsive = null;
    rows = 1;
    rtl = false;

    slideWidth = 123;

    slide = '';
    slidesPerRow = 1;
    slidesToShow = 1;
    slidesToScroll = 1;

    // swipe = true;
    // swipeToSlide = false;
    // touchMove = true;
    // touchThreshold = 5;
    // useCSS = true;
    // useTransform = true;

    variableWidth = false;  //of the images

    vertical = false;
    //verticalSwiping = false;
    //waitForAnimate = true;
    //zIndex = 1000;

    // leadingImg!: HTMLImageElement;
    // trailingImg!: HTMLImageElement;
    //imageSrcList: CircularQueue<string>;
    slidingElt!: HTMLElement;
    containerElt!: HTMLElement;
    slideQueue!: CircularQueue<Element>;
    //newImages?: Element[];
    newSlides?: string[] | Element[];
    // viewingIndex = 0;

    //leadingSlideElt!: Element;
    leadingSlideIndex = 0;

    //=========================================================================
    animator!: AnimationFrameRequestor;

    pauseBtn!: HTMLElement;
    playBtn!: HTMLElement;

    constructor(eltOrSelector: string | HTMLElement) {

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
        let lastSlidedSlide = this.slidingElt.firstElementChild!;
        this.slidingElt.appendChild(lastSlidedSlide);

        this.leadingSlideIndex = CircularQueue.getArrayNextIndex(this.leadingSlideIndex, this.getAllSlides());
        //this.updateCurrentButton();
    }

    //=========================================================================
    updateCurrentSlideButton(slideIndex?: number) {
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
    pause(evt?: MouseEvent | KeyboardEvent) {
        this.setAnimationState(AnimationState.Pausing);
        this.animator.pause();
    }
    async stop(evt?: MouseEvent | KeyboardEvent) {
        this.setAnimationState(AnimationState.Pausing);
        if (this.animator) {
            this.animator.stop();
        }
    }
    //=========================================================================
    async resume(evt?: MouseEvent | KeyboardEvent) {
        this.setAnimationState(AnimationState.Running);
        await this.animator.resume_async();
    }
    //=========================================================================
    //setAnimationState(state: number): void;//overloading, same # of args, but diff arg and return types
    setAnimationState(state: AnimationState) {
        //if ("s") return;
        let pauseBtn = this.pauseBtn.parentElement!;
        let playBtn = this.playBtn.parentElement!;

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
    createElt(className: string, parentElt: Node, tagName = "div") {
        let elt = document.createElement(tagName);
        elt.className = className;
        parentElt.appendChild(elt);
        return elt;
    }

    //=========================================================================
    stopEvent(ev: UIEvent) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();
    }
}
