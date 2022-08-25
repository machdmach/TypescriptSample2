import { DomLib } from "../dom/DomLib.js";
import { NodeX } from "../dom/NodeX.js";
//https://www.w3schools.com/howto/howto_js_autocomplete.asp
//https://jqueryui.com/autocomplete/
export class AutoSuggest {
    constructor(targetOrSelector) {
        this.minChars = 0; //minLength
        this.delay = 500; //millis
        this.target = qsInputElement(targetOrSelector);
        let target = this.target;
    }
    setDataValues(data) {
        this.setDataFetcher(() => {
            return data;
        });
    }
    setDataFetcher(dataFetcher) {
        this.dataFetcher = dataFetcher;
    }
    //=========================================================================
    async searchData(term) {
        //Can be used by a selectbox-like button to open the suggestions when clicked.
        //When invoked with no parameters, the current input's value is used.
        //Can be called with an empty string and minLength: 0 to display all items.
        //$( ".selector" ).auto complete( "search", "" );
        if (!this.dataFetcher) {
            throw "dataFetcher not set";
        }
        let data = await this.dataFetcher(term);
        return data;
    }
    //=========================================================================
    setupCallSearchOnFocus() {
        this.target.addEventListener("focus", async (e) => {
            await this.searchData();
        });
    }
    //=========================================================================
    setupUsingJQuery(callbackOnSelect) {
        let source = async (request, response) => {
            let term = request.term;
            let data = await this.searchData(term);
            //let data = [term, makeName, "aaa", "bbbb", "cc cc"];
            console.log("auto-complete data fetched=", data);
            response(data);
        };
        //#jquery
        let je = $(this.target).autocomplete({
            source: source,
            minLength: this.minChars,
            delay: this.delay,
            close: async function () {
                //MessageBox.showAlert("dd");
                console.log("calling callback func");
                if (callbackOnSelect) {
                    await callbackOnSelect();
                }
            },
        });
        this.target.addEventListener("focus", (e) => {
            je.autocomplete("search");
        });
    }
    //=========================================================================
    async setupUsingDataList(data) {
        /*
        <input class="awesomplete" list="mylist" />
        <datalist id="mylist">
            <option>Ada</option>
            <option>Java</option>
            <option>JavaScript</option>
            <option>Node.js</option>
            <option>Ruby on Rails</option>
        </datalist>
        */
        let target = this.target;
        let datalistID = DomLib.generateUniqueID("dl");
        target.setAttribute("list", datalistID);
        let dl = document.createElement("datalist");
        dl.id = datalistID;
        if (typeof data === "undefined") {
            data = await this.searchData();
        }
        data.forEach(optionVal => {
            let option = document.createElement("option");
            option.textContent = optionVal;
            dl.appendChild(option);
        });
        NodeX.insertAfter(dl, target);
    }
    //=========================================================================
    static Test1() {
        let target = qsInputElement("z");
        let sug = new AutoSuggest(target);
        let data = ["aa", "bbb", "cccc"];
        sug.setDataValues(data);
    }
}
