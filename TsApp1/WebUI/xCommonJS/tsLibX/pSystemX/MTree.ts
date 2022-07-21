
export class MTreez {

}

export interface MTree<T> {
    value: T;
    left: MTree<T>;
    right: MTree<T>;
}
