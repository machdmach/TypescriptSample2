/*
a11y: Accessiblity

Accessible Rich Internet App
https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Switch_role

<div role="button" class="button">Link to device specifications</div>

<p role="command">Type CTRL+P to print</p>
<style>
    [role=command] {
        color: red;
        display: none;
    }
</style>

   <button aria-label="Close" onclick="document.getElementById('box').style.display='none';" class="close-button">X</button>

<div role="group" aria-labelledby="groupLabel">
  <span id="groupLabel>Work Phone</span>
  +<input type="number" aria-label="country code">
  <input type="number" aria-label="area code">
  <input type="number" aria-label="subscriber number">
</div>

*/
export class Aria {
}
export class AriaRole {
    constructor() {
        this.a11y = "Accessiblity";
    }
    static button(elt, ariaLabel) {
        // <a role="button" aria-label="Clsoe"> X </a>
        if (elt instanceof Element)
            elt.setAttribute("role", "button");
        if (elt instanceof Element)
            elt.setAttribute("aria-label", ariaLabel);
    }
    static switch(elt) {
        if (elt instanceof Element)
            elt.setAttribute("role", "switch"); //on, off
    }
    static search(elt) {
        if (elt instanceof Element)
            elt.setAttribute("role", "search");
        //<form role=search> landmark
    }
    static searchbox(elt) {
        if (elt instanceof Element)
            elt.setAttribute("role", "searchbox");
    }
    // *********************** Table Grid ***********************
    static cell(elt) {
        if (elt instanceof Element)
            elt.setAttribute("role", "cell");
    }
    static row(elt) {
        if (elt instanceof Element)
            elt.setAttribute("role", "row");
    }
    static rowheader(elt) {
        if (elt instanceof Element)
            elt.setAttribute("role", "rowheader");
    }
    static columnheader(elt) {
        if (elt instanceof Element)
            elt.setAttribute("role", "columnheader");
    }
    static table(elt) {
        if (elt instanceof Element)
            elt.setAttribute("role", "table");
    }
    static grid(elt) {
        if (elt instanceof Element)
            elt.setAttribute("role", "grid");
    }
    static gridcell(elt) {
        if (elt instanceof Element)
            elt.setAttribute("role", "gridcell");
    }
    static rowgroup(elt) {
        if (elt instanceof Element)
            elt.setAttribute("role", "rowgroup"); //thead, tbody, tfooter
    }
}
