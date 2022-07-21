type DenoType1 = { type: string };
declare namespace Deno {
    //export function symlinkSync(src: string, dest: string, options?: any): void;
    export function symlinkSync(
        oldpath: string,
        newpath: string,
        type1?: DenoType1,
    ): void;
    //export function symlink(src: string, dest: string, options?: any): Promise<void>;
    export function symlink(
        oldpath: string,
        newpath: string,
        //type?: string,
        type?: DenoType1,
    ): Promise<void>;

    export function linkSync(src: string, dest: string, options?: any): void;
    export function link(src: string, dest: string, options?: any): Promise<void>;

    export function utime(src: string, d1: Date, d2: Date): Promise<void>;
    export function utimeSync(src: string, d1: Date, d2: Date): void;
}
