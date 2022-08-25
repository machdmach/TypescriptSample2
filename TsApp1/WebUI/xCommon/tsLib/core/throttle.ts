//=========================================================================
//Passing an invalid ID to clearTimeout() silently does nothing; no exception is thrown.
//window.addEventListener('resize', myEfficientFn); //scroll
export function throttle(func: Function, frequency: number) { //limit, frequency...
    //~debounce

    //But what about our last call? If it’s in the limit period it’s ignored and what if we don’t want that?
    //For example, if we bound to mouse movement for a resize and missed the last call we’d never
    //get the desired result. We need to catch this and execute it after the limit period

    let timeout: number;
    let lastRanTimestamp: number = 0; // = Date.now();
    const closureProxyFunc = function (...args: any) {
        // @zts-ignore: Unreachable code error
        //const context: any = this; // #ignore
        if (lastRanTimestamp === 0) {
            //first time, run right the way
            //func.apply(context, args);
            setTimeout(function () {
                lastRanTimestamp = Date.now();
                func(...args);
            }, 0);
        }
        else {
            if (timeout !== null) clearTimeout(timeout);

            let timeElapsedSinceLastRun = Date.now() - lastRanTimestamp;
            let waitTime = frequency - timeElapsedSinceLastRun;
            if (waitTime < 0) waitTime = 0;

            timeout = setTimeout(function () {
                if ((Date.now() - lastRanTimestamp) >= frequency) {
                    //func.apply(context, args);
                    func(...args);
                    lastRanTimestamp = Date.now();
                }
            }, waitTime);
        }
    };
    return closureProxyFunc;
}

/*
const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

const throttle = (func, limit) => {
  let lastFunc
  let lastRan
  return function() {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}
*/
