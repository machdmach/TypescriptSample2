declare function getSelectorShortInfo(selectorOrElt: string | HTMLElement, parent?: HTMLElement | null): string;
declare function getTagNameIDClass(selectorOrElt: Element | string | null | undefined): string;

declare function qsFirstOrDefault(selectorOrElt: string, parent?: HTMLElement | null): HTMLElement | null;
declare function qsFirst(selectorOrElt: string, parent?: HTMLElement | null): HTMLElement;
declare function qsClosest(selectorOrElt: string, child: HTMLElement): HTMLElement;
declare function qsAll(selectorOrElt: string, parent?: HTMLElement | null): HTMLElement[]; //NodeListOf<Element>;
declare function qsChildAll(selectorOrElt: string, parent: HTMLElement): HTMLElement[];

declare function qs(selectorOrElt: string | Node, parent?: Element | null): HTMLElement;
declare function qsInputElement(selectorOrElt: string | Node, parent?: HTMLElement | null): HTMLInputElement;
//let val (qs("input[name=radioButton1]:not(:checked)") as HTMLInputElement).value;

declare function qsChild(selectorOrElt: string, parent: HTMLElement): HTMLElement;
declare function qsParent(selectorOrElt: string | HTMLElement): HTMLElement;

declare function qsNullable(selectorOrElt: string | Node, parent?: HTMLElement | null): HTMLElement | null;
declare function qsChildNullable(selectorOrElt: string, parent: HTMLElement): HTMLElement | null;
declare function qsMany(selectorOrElt: string, min?: number, max?: number, parent?: HTMLElement | null): HTMLElement[];

declare namespace windowExt {
    function onDOMContentLoaded(f: (a1: any) => void): void;
}
