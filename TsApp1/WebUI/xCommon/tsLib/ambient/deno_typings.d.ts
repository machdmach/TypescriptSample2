declare namespace Deno {
    export const temp1: string;
    export const noColor: boolean;
    export function inspect(value: unknown, options?: InspectOptions): string;

    interface InspectOptions {
        depth?: number;
    }
}
