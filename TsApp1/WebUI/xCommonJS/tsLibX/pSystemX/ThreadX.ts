export class ThreadX {
    //==============================================================
    static sleep(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    static Sleep(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    //==============================================================
    static delay(milliseconds: number, count: number): Promise<number> {
        return new Promise<number>(resolve => {
            setTimeout(() => { resolve(count); }, milliseconds);
        });
        //eg: const count:number = await delay(500, i);
    }
}
