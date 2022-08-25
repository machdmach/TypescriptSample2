export class StringArray {
    static toLowercase(arr) {
        let ret = [];
        arr.forEach(e => {
            ret.push(e.toLowerCase());
        });
        return ret;
    }
}
