//https://stackoverflow.com/questions/588040/window-onload-vs-document-onload

window.addEventListener('DOMContentLoaded', function () {
    console.log('window - DOMContentLoaded - capture'); // 1st
}, true);
document.addEventListener('DOMContentLoaded', function () {
    console.log('document - DOMContentLoaded - capture'); // 2nd
}, true);
document.addEventListener('DOMContentLoaded', function () {
    console.log('document - DOMContentLoaded - bubble'); // 2nd
});
window.addEventListener('DOMContentLoaded', function () {
    console.log('window - DOMContentLoaded - bubble'); // 3rd
});

window.addEventListener('load', function () {
    console.log('window - load - capture'); // 4th
}, true);
document.addEventListener('load', function (e: Event) {
    /* Filter out load events not related to the document */
    let target = e.target as HTMLElement;
    if (target && target.tagName) {
        if (['style', 'script'].indexOf(target.tagName.toLowerCase()) < 0)
            console.log('document - load - capture'); // DOES NOT HAPPEN
    }
}, true);
document.addEventListener('load', function () {
    console.log('document - load - bubble'); // DOES NOT HAPPEN
});
window.addEventListener('load', function () {
    console.log('window - load - bubble'); // 4th
});

window.onload = function () {
    console.log('window - onload'); // 4th
};
document.onload = function () {
    console.log('document - onload'); // DOES NOT HAPPEN
};
