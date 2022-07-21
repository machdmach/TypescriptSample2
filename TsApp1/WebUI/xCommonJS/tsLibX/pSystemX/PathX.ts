export default class PathX {

    static getFileName(path: string | null | undefined): string {
        if (!path) {
            return "";
        }
        try {
            let fname = path;
            let i = path.lastIndexOf('/');
            if (i >= 0) {
                fname = path.substring(i + 1);
            }
            return fname;
        }
        catch (err) {
            console.error(err);

            return "";
        }
    }

    //=========================================================================
    static getFileExtention(pfname: string) {
        //return pfname.slice((pfname.lastIndexOf(".") - 1 >>> 0) + 2);
        //         var parts = filename.split('.');
        // return (parts.length > 1) ? parts.pop() : '';

        let r = /.+\.(.+)$/.exec(pfname);
        return r ? r[1] : null;
        // return fname.slice((Math.max(0, fname.lastIndexOf(".")) || Infinity) + 1);
    }

    //=========================================================================
    static GetFileNameWithoutExtension(pfname: string) {
        console.log('pfname: ' + pfname);
        let fname = pfname;
        let i1 = pfname.lastIndexOf('/');
        if (i1 < 0) {
            i1 = pfname.lastIndexOf('\\');
        }
        if (i1 >= 0) {
            fname = pfname.substring(i1 + 1);
        }
        let i2 = fname.lastIndexOf('.');
        if (i2 > 0) {
            fname = fname.substring(0, i2);
        }

        console.log('fname: ' + fname);
        return fname;
    }
    //=========================================================================

    GetFileNameWithoutExtension_Tests() {
        PathX.GetFileNameWithoutExtension("/a/b/file.padf");
        PathX.GetFileNameWithoutExtension("a/b/file");
        PathX.GetFileNameWithoutExtension("a/b/file.padf");
        PathX.GetFileNameWithoutExtension("file");
        PathX.GetFileNameWithoutExtension("");
        PathX.GetFileNameWithoutExtension("file.pdf");
    }

}
