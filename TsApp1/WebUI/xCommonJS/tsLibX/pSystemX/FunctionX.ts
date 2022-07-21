
export class FunctionX {

    executeFunctionByName(functionName: string, context: any /*, args */) {
        //Usage: executeFunctionByName("My.Namespace.functionName", window, arguments);

        let args = Array.prototype.slice.call(arguments, 2);
        let namespaces = functionName.split(".");
        let func = namespaces.pop();
        for (let namespace of namespaces) {
            context = context[namespace];
        }
        if (func) {
            return context[func].apply(context, args);
        }
        else {
            throw Error("func is not defined or null");
        }
    }

    //=========================================================================
    // getFuncFromString(func: string) {
    //     // if already a function, return
    //     if (typeof func === 'function') {
    //         return func;
    //     }

    //     // if string, try to find function or method of object (of "obj.func" format)
    //     if (typeof func === 'string') {
    //         if (!func.length) {
    //             return null;
    //         }
    //         let target = window;
    //         let func = func.split('.');
    //         while (func.length) {
    //             var ns = func.shift();
    //             if (typeof target[ns] === 'undefined') return null;
    //             target = target[ns];
    //         }
    //         if (typeof target === 'function') return target;
    //     }

    //     // return null if could not parse
    //     return null;
    // }
}
