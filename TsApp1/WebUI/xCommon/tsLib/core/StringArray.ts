
export class StringArray {

    static toLowercase(arr: string[]) {
        let ret: string[] = [];
        arr.forEach(e => {
            ret.push(e.toLowerCase());
        });
        return ret;
    }

}
