let menuButton = document.getElementById("mainSidebarButton");
function clickMenu() {
    let sidebar = document.getElementById("sidebar-wrapper");
    let mainNav = document.getElementById("mainNav");
    let body = document.body;
    if(sidebar.style.width === "200px") {
        // Closing the sidebar
        sidebar.style.width = "0px";
        body.style.padding = "70px 0 0 5px";
        sidebar.style.padding = "70px 0 0 0";
        sidebar.classList.remove("border-end");
        sidebar.classList.remove("border-dark");
        mainNav.style.margin = "0 0 0 0";
    } else {
        // Opening the sidebar
        sidebar.style.width = "200px";
        sidebar.style.padding = "70px 0 0 0";
        body.style.padding = "70px 0 0 205px";
        sidebar.classList.add("border-end");
        sidebar.classList.add("border-dark");
        mainNav.style.margin = "0 0 0 200px";
    }
}

menuButton.addEventListener("click", clickMenu);