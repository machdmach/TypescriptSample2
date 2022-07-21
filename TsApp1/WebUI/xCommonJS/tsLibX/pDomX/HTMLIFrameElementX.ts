
/**
 * @see HTMLIFrameElement
 */
export class HTMLIFrameElementX {
    static getParentUrl(): string;
    static getParentUrl(throwsOnNotFound = true) {
        let parentUrl = null;
        let isInIframe = (parent !== window);
        if (isInIframe) {
            parentUrl = document.referrer;
        }

        if (parentUrl == null && throwsOnNotFound) {
            throw Error("parentUrl not found");
        }
        return parentUrl;
    }

}
