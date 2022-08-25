import { KeyedBagBase } from "./KeyedBagBase.js";

export class KeyedBag extends KeyedBagBase {
    storage: any;
    constructor(storage: any) {
        super();
        this.storage = storage;
    }
    //=========================================================================
    override getNullable(name: string): string | null {

        if (!name) {
            throw Error("Invalid arg [name], must not be blank");
        }
        let nameLower = name.toLowerCase();
        let ret = this.storage[name] as string;

        if (typeof (ret) === "undefined") {
            ret = this.storage[nameLower];
        }
        console.info(`global_bag ${name}, ret=${ret}`);
        return ret;
    }
}
export const serverSideBag = new KeyedBag(windowBag.server_side_bag || {});
