import { DateTime } from "../core/DateTimeX.js";
export class DataFieldDefSet {
    constructor(fieldDefs) {
        this.fieldDefs = fieldDefs || [];
    }
    addDef(fieldDef) {
        this.fieldDefs.push(fieldDef);
        return fieldDef;
    }
    addDate(fieldName, isRequired = false) {
        return this.addDef({ Name: fieldName, Type: Date, Required: isRequired });
    }
    addDateTime(fieldName, isRequired = false) {
        return this.addDef({ Name: fieldName, Type: Date, Required: isRequired });
    }
    addString(fieldName, isRequired = false, minLen = 0, maxLen = 2000) {
        return this.addDef({ Name: fieldName, Type: String, Required: isRequired, MinLen: minLen, MaxLen: maxLen });
    }
    getField(name, throwsOnNotFound = true) {
        let rval = this.fieldDefs.find(e => e.Name === name);
        if (rval === undefined) {
            if (throwsOnNotFound) {
                throw Error('field not found with name: ' + name);
            }
        }
        return rval;
    }
    getFields(...types) {
        if (types.length === 0) {
            return Array.from(this.fieldDefs);
        }
        let defs = this.fieldDefs.filter(e => types.some(t => t === e.Type));
        return defs;
        // let defs = [] as FormFieldDef[];
        // for (let def of this.fieldDefs) {
        //     //ds.fieldDefs.forEach(def => {
        //     if (def.type === Date) {
        //     }
        // }
    }
    getDateAndDateTimeFields() {
        let defs = this.fieldDefs.filter(e => e.Type === Date || e.Type === DateTime);
        return defs;
    }
    getDateFields() {
        let defs = this.fieldDefs.filter(e => e.Type === Date);
        return defs;
        // let defs = [] as FormFieldDef[];
        // for (let def of this.fieldDefs) {
        //     //ds.fieldDefs.forEach(def => {
        //     if (def.type === Date) {
        //     }
        // }
    }
    getDateTimeFields() {
        let defs = this.fieldDefs.filter(e => e.Type === DateTime);
        return defs;
    }
    static tests() {
        let ds = new DataFieldDefSet([]);
        ds.addDef({ Name: "CreatedOn", Type: String });
        ds.addDate("CreatedOn");
        ds.addDate("UpdatedOn");
        for (let def of ds.fieldDefs) {
            //ds.fieldDefs.forEach(def => {
            if (def.Type === Date) {
            }
        }
    }
    //=========================================================================
    static parseDatePropertyValues(obj, defs) {
        //ObjectX.showOwnProperties(obj);
        let propNames = Object.getOwnPropertyNames(obj);
        for (let propName of propNames) {
            //var type = this.getType(val);
            //if (typeof name === 'string') {
            let val = obj[propName];
            if (typeof val === 'string') {
                //2019-01-07T09:07:30.72 //isodate
                // let datePart = val.match(/\d{4]-\d{2}-\d{2}T/);
                // val = datePart;
                // let dateNumeric = Date.parse(val as string);
                // if (!isNaN(dateNumeric)) {
                //     let dateVal = new Date(dateNumeric);
                //     console.log(dateVal + ' parsed date from str: ' + val);
                //     val = dateVal;
                // }
                let def = defs.getField(propName, false);
                if (def && def.Type === Date) {
                    this.parseDateTimeProperty(obj, propName);
                }
                //obj[propName] = val;
            }
        }
        //ObjectX.showOwnProperties(obj);
    }
    //=========================================================================
    static parseDateTimeProperty(obj, propertyName) {
        // if (obj === null || obj === undefined) {
        //     console.log('obj is null');
        //     return;
        // }
        let val = obj[propertyName];
        if (val === undefined) {
            throw Error("No property found with name: " + propertyName);
        }
        if (val === null) {
            console.log('val is null');
            return;
        }
        if (val === "") {
            return;
        }
        if (typeof val !== 'string') {
            return;
        }
        let dateNumeric = Date.parse(val);
        if (!isNaN(dateNumeric)) {
            let dateVal = new Date(dateNumeric);
            console.log(dateVal + ' parsed date from str: ' + val);
            val = dateVal;
        }
        obj[propertyName] = val;
    }
    //=========================================================================
    static parsePropertyValues1(obj, defs) {
        //ObjectX.showOwnProperties(obj);
        Object.entries(obj).forEach(([key, value]) => {
            let def = defs.getField(key, false);
            if (def) {
                if (def.Type === Date) {
                    //DateTimeX.parseDateTimeProperty(value);
                }
            }
            //if (object.hasOwnProperty(property))
        });
    }
    //=========================================================================
    parsePropertyValues(obj) {
        //ObjectX.showOwnProperties(obj);
        let defs = this.fieldDefs;
        this.fieldDefs.forEach(def => {
            let name = def.Name;
            let val = obj[name];
            if (val === undefined) {
                console.log(`Not parsed, object does not contain property: ${name}`);
            }
            else if (val === null) {
                console.log(`Not parsed, value is null for property: ${name}`);
            }
            else if (def.Type === 'string') {
                console.log(`Not parsed, def.Type is string for property: ${name}`);
            }
            else if (typeof val !== 'string') {
                console.log(`Not parsed, typeof property: ${name} is ${typeof val}, not [string]`);
            }
            else {
                console.log(`may parse, name: ${name}, val: ${val}, type: ${typeof val} def.type: ${def.Type} `);
                let newParsedVal = null;
                if (def.Type === Date) {
                    console.log('def.Type is Date');
                    let dateNumeric = Date.parse(val);
                    if (isNaN(dateNumeric)) {
                        console.log('Date.parse return isNaN');
                    }
                    else {
                        console.log('Date.parse numeric=' + dateNumeric);
                        newParsedVal = new Date(dateNumeric);
                    }
                }
                if (newParsedVal != null) {
                    console.log(`OK, newParsedVal=${newParsedVal}`);
                    obj[name] = newParsedVal;
                }
                else {
                    console.log(`Not parsed`);
                }
            }
        }); //end forEach
    }
}
