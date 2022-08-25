
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
}
