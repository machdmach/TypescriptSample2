import { ThreadX } from "../pSystemX/ThreadX.js";

//======================================================
export class AnimationLib {

    static fadeOut(el: Element) {
        el.classList.add('hide');
        el.classList.remove('show');
        // .show {
        //   opacity: 1;
        // }
        // .hide {
        //   opacity: 0;
        //   transition: opacity 400ms;
        // }
    }
    static fadeIn(el: Element) {
        el.classList.remove('show');
        el.classList.add('hide');
        // .show {
        //   opacity: 1;
        //   transition: opacity 400ms;
        // }
        // .hide {
        //   opacity:
        // }
    }

    //==============================================================
    async Animate(elt: HTMLElement | null, timeInterval?: number) {
        console.log('HTMLElement is: ' + elt);
        if (elt == null) {
            console.log('null, not animating');
        }
        else {
            for (let i = 0; i < 100; i++) {
                elt.style.marginLeft = (i * 50) + 'px';
                await ThreadX.sleep(timeInterval || 1000);
            }
        }
        //await Promise.all(promises);
        //implicitly returns a promise
    }

    //=========================================================================
    static requestAnimationFrame1() {
        let start: DOMHighResTimeStamp | null = null;
        let element = qs('SomeElementYouWantToAnimate');

        function step(timestamp: DOMHighResTimeStamp) {
            if (!start) start = timestamp;
            let progress = timestamp - start;
            element.style.transform = 'translateX(' + Math.min(progress / 10, 200) + 'px)';
            if (progress < 2000) {
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    }
}
