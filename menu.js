let xmark = document.getElementById("xmark");
let bars = document.getElementById("bars").parentElement;
let menu = document.getElementsByClassName("menu")[0];


function showMenu() {
    console.log(1);
    bars.style.visibility = "hidden";
    xmark.style.visibility = "visible";
    menu.style.visibility = "visible";
    menu.style.right = "0";
}
function hideMenu() {
    console.log(2);
    menu.style.right = "-80%"
    bars.style.visibility = "visible";
    xmark.style.visibility = "hidden";
}

bars.onclick = showMenu;
xmark.onclick = hideMenu;

