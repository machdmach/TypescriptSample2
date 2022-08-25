import { FileX } from "../core/FileX.js";

export class HTMLInputFileElementX {

    static setupInputFileElement(fileElt: HTMLInputElement) {
        let parentElt = fileElt.parentElement as HTMLElement;

        fileElt.addEventListener("change", (ev: Event) => {

            let info1 = "";
            let thisFileElt = fileElt;

            let fileList: FileList = thisFileElt.files as FileList;

            if (fileList) {
                if (fileList.length === 0) {
                    info1 = "upload fileList is empty";
                }
                else {
                    for (let i = 0; i < fileList.length; i++) {
                        let file: File | null = fileList.item(i);
                        if (file != null) {
                            console.log("file is: ", file);
                            info1 += FileX.getInfo(file);
                        }
                    }
                }
            }
            else {
                info1 = "upload fileList is not defined";
            }

            const infoElt = qsNullable(".fileInfo", parentElt);
            if (infoElt != null) {
                infoElt.textContent = info1;
            }
        });
    }

    //=========================================================================
    static clearInputFileElement(elt: HTMLInputElement) {
        console.log('Clearing out input type=file info', elt);
        elt.value = '';
        let parentElt = elt.parentElement as HTMLElement;
        const infoElt = qsNullable(".fileInfo", parentElt);
        if (infoElt != null) {
            infoElt.textContent = '';
        }
    }
}
