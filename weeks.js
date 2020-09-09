window.addEventListener("resize", collapserLeftMenu = () => {
    if (screen.width <= 768) {
        document.getElementById("collapseExample").className = "collapse";
    } else if (screen.width > 768) {
        document.getElementById("collapseExample").className = "collapse show";
    }
});

let getInfoResource = () => {
    var div1 = document.getElementById("info");
    if (div1.hasAttribute("hidden")) {
        div1.removeAttribute("hidden");
    } else {
        div1.setAttribute("hidden", null);
    }

}