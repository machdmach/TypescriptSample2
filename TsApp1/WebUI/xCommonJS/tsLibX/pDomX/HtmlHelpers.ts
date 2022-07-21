export class HtmlHelpers {

    static showFullScreenButton() {
        let fs = document.createElement("button");

        let elem = document.documentElement;
        function openFullscreen() {
            return elem.requestFullscreen();
            // if (elem.requestFullscreen) {
            //     elem.requestFullscreen();
            // } else if (elem.mozRequestFullScreen) { /* Firefox */
            //     elem.mozRequestFullScreen();
            // } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            //     elem.webkitRequestFullscreen();
            // } else if (elem.msRequestFullscreen) { /* IE/Edge */
            //     elem.msRequestFullscreen();
            // }
            //fs.style.display = "none";
        }
        function closeFullscreen() {

            if (document.fullscreenEnabled && document.exitFullscreen) {
                document.exitFullscreen();
            }
            //else if (document.mozCancelFullScreen) {
            //     document.mozCancelFullScreen();
            // } else if (document.webkitExitFullscreen) {
            //     document.webkitExitFullscreen();
            // } else if (document.msExitFullscreen) {
            //     document.msExitFullscreen();
            // }
        }

        fs.className = "btnx";
        let st = fs.style;
        st.backgroundColor = "lightblue";
        st.position = "fixed";
        st.right = "10px";
        st.fontSize = "20pt";
        st.top = "10px";
        fs.textContent = "Open full screen";
        fs.addEventListener("click", async () => {
            let text = fs.textContent + "";
            if (text.includes("Open")) {
                await openFullscreen();
                fs.textContent = "Exit full screen";
            }
            else {
                closeFullscreen();
                fs.textContent = "Open full screen";
            }
        });
        document.body.appendChild(fs);
        //openFullscreen();
    }
}
