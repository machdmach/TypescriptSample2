export class ThreadX {
    /**
     *
     * @param time in millis
     */
    static sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    static Sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    //==============================================================
    static delay(milliseconds, count) {
        return new Promise(resolve => {
            setTimeout(() => { resolve(count); }, milliseconds);
        });
        //eg: const count:number = await delay(500, i);
    }
}
