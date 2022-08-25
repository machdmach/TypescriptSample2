import { StringBuilder } from "./StringBuilder.js";
import { RegExpr } from "./RegExpr.js";
import { NestedObjectLib } from "./NestedObjectLib.js";
//string interpolation (or variable interpolation, variable substitution, or variable expansion) is the process of evaluating a string literal
//containing one or more placeholders, yielding a result in which the placeholders are replaced with their corresponding values.
export class StringInterpolation {
    constructor(templateLiteral) {
        this.setTemplateLiteral(templateLiteral);
    }
    //this is similar to react {placeholder1} to be replaced by corresponding values
    //Template literals can contain placeholders.
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    //=========================================================================
    static test1() {
        let raw1 = String.raw `Hi\n${2 + 3}`; //\n are 2 characters like c# @"rawstring is here c:\path\to\a\file.txt";
        let templateLiteral = "{ph 2} this is a test, val1={ph1} val2={ph2}";
        let si = new StringInterpolation(templateLiteral);
        let s = "";
        s = si.evaluateWith({ ph1: new Date(), ph2: "abc" });
        console.log("s=" + s);
        s = si.evaluateWith({ ph1: 2222, ph2: undefined });
        console.log("s=" + s);
        s = si.evaluateWith({});
        console.log("s=" + s);
        si.setTemplateLiteral("sdfsadf");
        s = si.evaluateWith({ ph1: 2222, ph2: undefined });
        console.log("s=" + s);
        si.setTemplateLiteral("{ph1}");
        s = si.evaluateWith({ ph1: 2222, ph2: undefined });
        console.log("s=" + s);
        //import("./ArraySlicer.js").then
    }
    hasPlaceHolderExpressions() {
        return this.placeHolderExpressions.length > 0;
    }
    //=========================================================================
    setTemplateLiteral(templateLiteral) {
        this.interStrings = [];
        this.placeHolderExpressions = [];
        //let re = /\{([^}]+)\}/g;
        //let re = /\{([\w_]{1}[\w_\d:]{0,50})\}/g;
        let re = /\{([\w_]{1}[\w_\d: .()'"?+]{0,120})\}/g;
        //At least 1 char,
        //start with a letter or underscore
        //followed by letters or digits or symbols .():'"?+ or space
        //<span>{return model.IsDropOffAndGo? 'Yes': 'No'}</span>
        //let tokens = templateLiteral.split(reg);
        //"".match()
        let i = 0;
        let lastIndex = 0;
        let match = re.exec(templateLiteral);
        //templateLiteral.matchAll()
        while (match !== null) {
            if (i++ > 100) {
                throw Error("too many: " + i);
            }
            RegExpr.RegExpExecArray_toStr(match);
            const matchedStr = match[0];
            const variableName = match[1];
            const indexAtFound = match.index;
            let string = templateLiteral.substring(lastIndex, indexAtFound);
            lastIndex = indexAtFound + matchedStr.length;
            console.log("variableName=" + variableName);
            this.interStrings.push(string);
            this.placeHolderExpressions.push(variableName);
            match = re.exec(templateLiteral);
        }
        let lastString = templateLiteral.substring(lastIndex);
        this.interStrings.push(lastString);
    }
    //=========================================================================
    static evaluate(templateLiternal, valueObj) {
        let interpol = new StringInterpolation(templateLiternal);
        return interpol.evaluateWith(valueObj);
    }
    //=========================================================================
    evaluateWith(model) {
        //substituteWith, expandWith, interpolateWith, evaluateWith
        let buf = new StringBuilder();
        for (let i = 0; i < this.placeHolderExpressions.length; i++) {
            buf.append(this.interStrings[i]);
            let ph = this.placeHolderExpressions[i];
            let valFormatted = this.getValue(model, ph);
            buf.append(valFormatted);
        }
        buf.append(this.interStrings[this.interStrings.length - 1]);
        let ret = buf.toString();
        return ret;
    }
    //=========================================================================
    getValue(model, ph) {
        //{return (model.prop1? "Yes": "No")}
        // if (ph.includes("model")) {
        //
        // }
        if (ph.startsWith("return ")) {
            let functionBodyText = ph;
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions#Differences
            //The Function constructor creates an anonymous function
            //A function defined by a function expression (f = function {}) inherits the current scope. That is, the function forms a closure.
            //On the other hand, a function defined by a Function constructor does not inherit any scope other than the global scope (which all functions inherit).
            //Function constructor: var multiply = new Function('x', 'y', 'return x * y');
            //function declaration:  function f1() {}
            //Function expression: f = function {}
            //fs['f1'] = new Function('name', 'return alert("hello, " + name + "!");');
            //let f= Function('model', 'return (( (model.p1? "Yes": "No")+ model.p1))');
            let f = Function("model", functionBodyText);
            //<span>{return model.IsDropOffAndGo? 'Yes': 'No'}</span>
            let resultFromInlineCode = f(model);
            return resultFromInlineCode; //--------------------------------------------------------------------------
        }
        let varPath = ph;
        let formatOption = null;
        if (ph.includes(":")) {
            let pair = ph.split(":");
            varPath = pair[0];
            formatOption = pair[1]; //{isRetired:YesNo}  {return (model.prop1? "Yes": "No")}  {props.prop1}  model = {props|state}
        }
        let valFormatted; // = valueObj[ph];
        let notFound = Symbol("not found");
        let val = NestedObjectLib.getValueFromPath(varPath, model, notFound);
        if (val === notFound) {
            //val not found in the model
            valFormatted = "{" + ph + ": varPath not found in model}";
        }
        else {
            if (formatOption) {
                if (formatOption === "YesNo") {
                    if (!val || val === "false") {
                        valFormatted = "No";
                    }
                    else {
                        valFormatted = "Yes";
                    }
                }
                else {
                    throw Error("Invalid string interpolation format: " + formatOption + ", from placeHolder: " + ph);
                }
            }
            else if (val instanceof Date) {
                valFormatted = val.toLocaleDateString() + " " + val.toLocaleTimeString();
            }
            else {
                valFormatted = val;
            }
        }
        return valFormatted;
    }
}
