//<i class="material-icons" style="font-size: 16pt; vertical-align: middle;"> search </i>
//<i class='material-icons alert'>warning</i>
//<i class='material-icons cancel'>cancel</i>
//static check(text: string) { return this.buildIcon("done_outline", text); }
//static questionAnswer(text: string) { return this.buildIcon("question_answer", text); }

export class IconLib {
    /*
    <i class="material-icons">edit</i>
    fa-lg: Large
    Email: <i class="far fa-envelope"></i>
    Edit:        <i class='fas fa-edit fa-lg' title='Edit'></i>
    Details:        <i class='fa fa-lg fa-expand' title='More Details'></i>
    View:        <i class='fa fa-lg fa-eye' title='View Details'></i>
    Delete:         <i class='fa fa-lg fa-trash' title='{0}'></i>
                            urlLabel = "<button type='button' class='btn btn-primary');'> <i class='fa fa-check' aria-hidden='true'></i> Complete</button>";
                            string deleteRecordIcon = string.Format("<i class='fa fa-lg fa-trash' title='{0}'></i>", r.IsFile ? "Delete File" : "Delete Folder");
                            colText += " " + ((so.IsSortDesc()) ? "<i class='fas fa-arrow-down'></i>" : "<i class='fas fa-arrow-up'></i>");
    */
    static questionAnswer(text?: string) { return this.buildIcon("fas fa-question-circle", text); }
    static info(text?: string) { return this.buildIcon("fas fa-info-circle", text); }
    static error(text?: string) { return this.buildIcon("fas fa-exclamation-circle", text); }
    static warn(text?: string) { return this.buildIcon("fas fa-exclamation-triangle", text); }
    static ban(text?: string) { return this.buildIcon("fas fa-ban", text); }
    static check(text: string) { return this.buildIcon("fas fa-check", text); }
    static info_letterI_z(text?: string) {
        return this.buildIcon("fas fa-info", text);
        // btn.innerHTML = "&#8560;";
        // let st2 = btn.style;
        // st2.fontWeight = "bold";
        // st2.fontSize = "20pt";
        // //st2.fontStyle = "italic";
    }
    static plus(text: string) { return this.buildIcon("fas fa-plus", text); }
    static edit(text: string) { return this.buildIcon("fas fa-edit", text); } //<i class='fas fa-edit fa-lg' title='Edit'></i>

    static arrowBackiOS(text?: string) {
        //large &lt; icon
        return this.buildIcon("arrow_back_ios", text);
    }

    static arrowLeft(text: string) {
        //triangle
        //https://material.io/resources/icons/?search=arr&icon=arrow_left&style=baseline
        return this.buildIcon("arrow_left", text);
    }
    static arrowRight(text: string) {
        return this.buildIcon("arrow_right", text);
    }

    //=========================================================================
    static createEl(htmlText: string) {
        let el = document.createElement("span");
        el.innerHTML = htmlText;
        return el;
    }

    //=========================================================================
    static buildIcon(iconClassName: string, text?: string) {
        //fas solid, far regular, fab brand (facebook)
        //MD: Material Design
        let ret: string;
        if (iconClassName.startsWith("fas") || iconClassName.startsWith("fab")) {
            //|| iconClassName.startsWith("far")
            ret = `<i class='${iconClassName}'></i>`;
        }
        else {
            ret = `<i class='material-icons'>${iconClassName}</i>`;
        }
        if (text) {
            ret += " " + this.encodeHTML(text);
        }
        return ret;
    }
    static encodeHTML(str: string): string {
        //#tags: #htmlEncode, #htmlDecode, #encodeHtml, #decodeHtml
        let div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
    //=========================================================================
    static decode(str: string): string {
        let txt = document.createElement('textarea');
        txt.innerHTML = str;
        return txt.value;
    }
}
