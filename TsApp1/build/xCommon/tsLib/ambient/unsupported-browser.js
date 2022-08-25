"use strict";
window.addEventListener("DOMContentLoaded", function () {
    let p1 = document.createElement("p");
    p1.style.textAlign = "center";
    p1.style.color = "red";
    let e1 = document.createElement("h1");
    //e1.textContent = "This browser is not supported for this application";
    e1.textContent = "This browser is no longer supported for this page.";
    p1.appendChild(e1);
    e1 = document.createElement("h2");
    e1.textContent = "Please choose another browser such as Firefox, Google Chrome or Microsoft Edge.";
    p1.appendChild(e1);
    let mainEl = document.querySelector("main");
    if (mainEl === null) {
        mainEl = document.body;
    }
    document.body.innerHTML = "";
    document.body.appendChild(p1);
});
