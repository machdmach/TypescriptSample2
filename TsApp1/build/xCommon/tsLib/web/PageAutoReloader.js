"use strict";
//<script src='http://localhost:3131/cs/WebUIx/xCommonJS/tsLibX/pWebAppX/PageAutoReloader.js?v=123' type='module'></script>
class PageAutoReloader {
    constructor() {
        //=========================================================================
        this.reopenCount = 0;
        //=========================================================================
        this.keepAliveTimerID = -1;
        this.pulsingTime = 9000;
    }
    static async setup() {
        console.log("#PageAutoReloader #websocket setup.......");
        let wsClient = new PageAutoReloader();
        try {
            await wsClient.open();
        }
        catch (error) {
            console.error("error on open: ", error);
        }
        //wsClient.keepAlive();
    }
    open() {
        this.socket = new WebSocket('ws://localhost:50501');
        let socket = this.socket;
        let p = new Promise((resolve, reject) => {
            socket.addEventListener('open', (event) => {
                socket.send('Hello Server, I am a browser client: ' + navigator.userAgent);
                //this.keepAlive(event);
                resolve(null);
            });
            socket.onmessage = function (event) {
                let mesg = event.data + "";
                console.log('Message from server ', mesg);
                if (mesg.startsWith("reload")) {
                    socket.send("ok, reloading browser...");
                    console.log("reloading in 1 secs");
                    document.body.style.backgroundColor = "blue";
                    document.documentElement.style.backgroundColor = "blue";
                    let el = document.createElement("div");
                    el.style.backgroundColor = "black";
                    el.style.position = "fixed";
                    el.style.height = "100vh";
                    el.style.width = "100vw";
                    el.style.zIndex = "12345";
                    el.style.bottom = "0px";
                    document.body.appendChild(el);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1);
                }
            };
            socket.onerror = (err) => {
                console.error("WebSocket Error", err);
                reject(err);
            };
            socket.onclose = (mesg) => {
                console.warn("WebSocket closed", mesg);
                reject(mesg);
            };
        });
        return p;
    }
    async reopen() {
        console.log("trying to reopen, k", new Date(), ++this.reopenCount);
        await this.open();
    }
    keepAlive(ev) {
        //don't need, just refresh the browser
        if (this.keepAliveTimerID === -1) {
            console.log("setInterval for " + this.pulsingTime);
            this.keepAliveTimerID = setInterval(async () => {
                if (this.socket.readyState === WebSocket.CLOSED) {
                    console.log("socket closed");
                    await this.reopen();
                }
                else {
                    // this.socket.send("ping1");
                }
            }, this.pulsingTime);
        }
    }
}
PageAutoReloader.setup();
