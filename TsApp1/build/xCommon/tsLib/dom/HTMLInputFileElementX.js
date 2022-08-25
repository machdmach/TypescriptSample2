import { FileX } from "../core/FileX.js";
export class HTMLInputFileElementX {
    static setupInputFileElement(fileElt) {
        let parentElt = fileElt.parentElement;
        fileElt.addEventListener("change", (ev) => {
            let info1 = "";
            let thisFileElt = fileElt;
            let fileList = thisFileElt.files;
            if (fileList) {
                if (fileList.length === 0) {
                    info1 = "upload fileList is empty";
                }
                else {
                    for (let i = 0; i < fileList.length; i++) {
                        let file = fileList.item(i);
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
    static clearInputFileElement(elt) {
        console.log('Clearing out input type=file info', elt);
        elt.value = '';
        let parentElt = elt.parentElement;
        const infoElt = qsNullable(".fileInfo", parentElt);
        if (infoElt != null) {
            infoElt.textContent = '';
        }
    }
}
