declare var windowBag: any;
declare var windowExtBag: any;

declare var appName: string;

declare var isErrorOccurred: boolean;
declare var isWrongBrowser: boolean;
declare var isLogInfo: boolean;
declare var isLogDebug: boolean;
declare var db: boolean;
declare var False: boolean;
declare var True: boolean;
declare var TrueTodo: boolean;

declare type MResult = { success: true, value: unknown } | { success: false, error: Error };
declare type DeletableEntity = { value: boolean, reasons: String | null };

declare type RecordStringStatusEntity = {
    value: number | null | undefined,
    stringValue: string | null | undefined,
    label: String | null | undefined,
    description: string | null | undefined,
};

declare type RecordStatusEntity = {
    value: number, label: string,
    description: string | null | undefined,
};

//=========================================================================
declare namespace Config {
    var isDebug: boolean;
    var isLocalDebug: boolean;
    var MinDataWaitTime: number; //millis
    var isUsingJQueryDialog: boolean;
}

declare function emptyFunc(arg1?: any, arg2?: any): any;

declare function myGlobalUIEventHandler(ev: Event): any;
declare var lastUIEvent: Event;

declare function alreadyExecuted(targetName: string): boolean;

declare const uninit: any;
declare const uninitString: string;
declare const uninitNumber: number;

//=========================================================================
declare interface DataSvcInfo {
    username: string;
    userRoles: string;
    apiVersion: string;
    dbEnv: string;
    publicFacingUrlRoot: string;
}
declare interface log {
    info(caller: any, mesg: any): void;
}
declare interface NVPair {
    //indexer
    [key: string]: string;
}
declare interface NOCollection {
    [key: string]: any;
}
