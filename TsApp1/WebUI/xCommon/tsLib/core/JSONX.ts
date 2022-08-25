export class JSONX {
    static eg1() {

        let obj = {
            data: 'data',

            toJSON(key: any) {
                //toJSON behavior: JSON.stringify() calls toJSON with one parameter:
                if (key)
                    return `Now I am a nested object under key '${key}'`;

                else
                    return this;
            },
        };

        JSON.stringify(obj);
        // '{"data":"data"}'

        JSON.stringify({ obj });
        // '{"obj":"Now I am a nested object under key 'obj'"}'

        JSON.stringify([obj]);
        // '["Now I am a nested object under key '0'"]'

        JSON.stringify({ uno: 1, dos: 2 }, null, '\t');  //replacer is null, space=tab
    }
    //=========================================================================
    static parseBoolean(val: any, undefinedVal?: boolean) {
        if (val === undefined || val === null || val === "") {
            return val;
        }
        if (typeof val === "string") {
            val = val.toLocaleLowerCase();
            if (val === "1" || val === "true" || val === "t" || val === "y") {
                return true;
            } else if (val === "0" || val === "false" || val === "f" || val === "n") {
                return false;
            }
            else {
                return val;
            }
        }
        else {
            return val;
        }
    }
}
