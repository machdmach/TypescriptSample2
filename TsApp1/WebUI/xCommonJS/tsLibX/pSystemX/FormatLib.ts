
export class FormatLib {
    static formatBytes(bytes: number | Number | null | undefined, decimals: number = 1): string {
        if (!bytes || bytes === 0) {
            return '0 Bytes';
        }
        let bytesx = bytes as number;
        let k = 1024;
        let dm = decimals <= 0 ? 0 : decimals || 2;
        let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let i = Math.floor(Math.log(bytesx) / Math.log(k));
        return parseFloat((bytesx / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}
