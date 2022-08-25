export class JQueryLib {
    //=========================================================================
    static changeDateInputsToUseJQuery(f) {
        //#jqueryDate, #jqdate, #datepicker, #calendar
        //if (True) return;
        Array.prototype.slice.call(f.elements).forEach((e) => {
            if (e instanceof HTMLInputElement) {
                //throw Error("s");
                if (e.type === "date"
                    || e.getAttribute("type") === "date" /*for IE11*/) {
                    //e.style.backgroundColor = "red";
                    e.type = "text";
                    e.setAttribute("type", "text"); //IE11
                    e.classList.add("jquery-datepicker-processed");
                    //let options = new DatepickerOptions();
                    let datepicker = jQuery(e).datepicker({
                        changeMonth: true,
                        changeYear: true,
                        //container: "#modalId",
                    });
                    //datepicker.css("z-index", "91979");
                }
            }
        });
    }
}
// //======================================================
// export class FormDataJQuery {
//     GetFormValuesJSON(selector?: string, debug?: boolean) {
//         //https://github.com/marioizquierdo/jquery.serializeJSON
//         //var data = {};
//         //$(".form-selector").serializeArray().map(function(x){data[x.name] = x.value;});
//         //$('#formid').serializeArray().reduce(function (a, x) { a[x.name] = x.value; return a; }, {});
//         //var s = JSON.stringify(fe.serializeArray());
//         //var formArray = $(selector).serializeArray();
//         let je;
//         if (selector === undefined) {
//             je = jQuery(document.forms[0]);
//         }
//         else {
//             je = jQuery(selector);
//             if (je.length === 0) {
//                 throw Error(`elt not found ${selector}`);
//             }
//         }
//
//         let formFields: JQuery.NameValuePair[] = je.serializeArray();
//         //console.log('form ' + selector + ', length=' + formArray.length);
//         //console.log('farr' + JSON.stringify(formArray));
//         let rval: any = {}; // = new Object();
//         // var map = new Map<string, string>();
//         // map.set('dd', 'dd');
//         for (let i = 0; i < formFields.length; i++) {
//             let field = formFields[i];
//             //map.set(field.name, field.value);
//             rval[field.name] = field.value;
//         }
//         //encodeURIComponent('aa');
//         if (true) {
//             let s = JSON.stringify(rval);
//             s = s.replace(',', ",\n");
//             console.log('formJson=' + s);
//             //console.log('Object.values: ' + Object.values(rval));
//         }
//         //if (db) debugger;
//         return rval;
//     }
//     //========================================================================
// }
