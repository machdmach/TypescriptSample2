import { FormatLib } from "./FormatLib.js";
//import fs from 'fs.js';
/*
File implements Blob, so it also has the following properties available to it:
  File.size  Returns the size of the file in bytes.
  File.type   Returns the MIME type of the file.

*/
export class FileX {
    //=========================================================================
    static test1() {
        let blobPartArr = ["file1"];
        let file = new File(blobPartArr, "file1.png");
        ///** A file-like object of immutable, raw data. Blobs represent data that isn't necessarily in a JavaScript-native format.
        //The File interface is based on Blob, inheriting blob functionality and expanding it to support files on the user's system. */
        let blob;
    }
    //=========================================================================
    static buildTestFile() {
        let blob = ["file1"];
        let file = new File(blob, "file1.png");
        return file;
    }
    static readAllText(pfname) {
        console.log('reading file: ', pfname);
        try {
            let fileContent = ""; //fs.readFileSync(pfname, { encoding: 'utf-8' });
            return fileContent;
        }
        catch (err) {
            console.error(err);
            return "";
        }
    }
    //=========================================================================
    static getInfo(file) {
        if (file === null) {
            return "file is null"; //-------------------------------------
        }
        //File Size: 1167843, Last Modified: 1539711371843
        let fileSizeStr = FormatLib.formatBytes(file.size);
        let ret = `File Size: ${fileSizeStr}`;
        let dt = this.getLastModifiedDate(file);
        let dtStr = dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString();
        ret += `, Last Modified: ${dtStr}`;
        ret += `, Type: ${file.type} `;
        return ret;
    }
    //=========================================================================
    static getLastModifiedDate(file) {
        let ret;
        let filex = file;
        if (file.lastModified) {
            ret = new Date(file.lastModified);
        }
        else if (filex.lastModifiedDate) { //IE11
            ret = filex.lastModifiedDate;
        }
        else {
            throw Error("bad file type? " + file);
        }
        return ret;
    }
}
