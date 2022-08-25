export class TagFunctions {
    static upper(strs: TemplateStringsArray, ...substs: any[]): string {
        //tag function
        let rval = "";
        for (let i = 0; i < strs.length; i++) {
            if (i > 0) {

                rval += substs[i - 1].toUpperCase();
            }
            rval += strs[i];
        }
        return rval;
    }

    //=========================================================================
    addProp(literals: TemplateStringsArray, ...substitutions: any[]) {
        //Tag functions
        //https://basarat.gitbooks.io/typescript/docs/template-strings.html

        let result = "";

        // interleave the literals with the placeholders
        for (let i = 0; i < substitutions.length; i++) {
            result += literals[i];
            let ph = substitutions[i];
            console.log(ph);
            console.trace(ph);
            if (typeof ph === 'string') {
                result += ph
                    .replace(/&/g, '&amp;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#39;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
            }

        }
        // add the last literal
        result += literals[literals.length - 1];
        return result;
    }
    //=========================================================================
    static Tests() {
        let v1 = "aa";
        let v2 = "b c d";
        console.log(TagFunctions.upper`v1 is ${v1}  v2 is ${v2}`);
    }
}
