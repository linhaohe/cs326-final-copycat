let menuButton = document.getElementById("mainSidebarButton");
function clickMenu() {
    let sidebar = document.getElementById("sidebar-wrapper");
    let body = document.body;
    if(sidebar.style.width === "200px") {
        // Closing the sidebar
        sidebar.style.width = "0px";
        body.style.padding = "0 0 0 0";
        sidebar.classList.remove("border-right");
        sidebar.classList.remove("border-dark");
    } else {
        // Opening the sidebar
        sidebar.style.width = "200px";
        body.style.padding = "0 0 0 200px";
        sidebar.classList.add("border-right");
        sidebar.classList.add("border-dark");
    }
}

menuButton.addEventListener("click", clickMenu);