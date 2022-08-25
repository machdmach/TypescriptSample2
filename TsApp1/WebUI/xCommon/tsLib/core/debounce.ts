
//=========================================================================
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for `wait` milliseconds.
// Use for: keyup/keydown
export function debounce(func: Function, wait: number) {
    //~throttle
    let timeout: number | null = null;  // lexical environment, closure state

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
    // This is the function that is returned and will be executed many times
    // We spread (...args) to capture any number of parameters we want to pass
    const closureProxyFunc = function (...args: any) { //e.g.: MouseEvent
        // This will reset the waiting every function execution.
        // This is the step that prevents the function from
        // being executed because it will never reach the inside of the previous setTimeout
        if (timeout !== null) clearTimeout(timeout);

        // The proxy function to be executed after the debounce time has elapsed

        // Restart the debounce waiting period.
        // setTimeout returns a truthy value (it differs in web vs Node)
        timeout = setTimeout(() => {
            // null timeout to indicate the debounce ended
            timeout = null;

            // Execute the callback
            func(...args);
        }, wait);
    };
    return closureProxyFunc;
}
