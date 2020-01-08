document.body.onload = themeSelector().loadTheme(), mobileMenu();

function themeSelector() {
    let lightSwitch = document.getElementById("light-switch");
    let root = document.documentElement;
    let currentTheme = "";

    let darkMode = {
        backgroundColor: "#24292e",
        textColor: "white",
    }

    let lightMode = {
        backgroundColor: "white",
        textColor: "#24292e",
    }

    function loadTheme() {
        if (localStorage.getItem("currentTheme")) {
            currentTheme = localStorage.getItem("currentTheme");
            changeTheme(JSON.parse(currentTheme));
        } else saveTheme(lightMode);
    }

    function saveTheme(theme) {
        localStorage.setItem("currentTheme", JSON.stringify(theme))
    }

    function changeTheme(theme) {
        root.style.setProperty('--background-color', theme.backgroundColor);
        root.style.setProperty('--text-color', theme.textColor);
        if (theme.backgroundColor === darkMode.backgroundColor) {
            lightSwitch.checked = true;
        }
    }

    lightSwitch.addEventListener("click", function () {
        if (lightSwitch.checked) {
            changeTheme(darkMode);
            saveTheme(darkMode);
        }
        else {
            changeTheme(lightMode);
            saveTheme(lightMode);
        }
    })

    return {
        loadTheme: loadTheme
    };
}

function mobileMenu() {
    let menuIcon = document.getElementById("menu-icon");
    let root = document.documentElement;
    let currentTheme = JSON.parse(localStorage.getItem("currentTheme"));

    menuIcon.addEventListener("click", function () {
        menuIcon.classList.toggle("change");
        toggleMobileMenu();   
        for (let i = 0; i < menuIcon.children; i++) {
            menuIcon.children[i].backgroundColor = currentTheme.textColor;
        }   
    });

    function toggleMobileMenu(){
        if(menuIcon.classList.contains("change")) {
            root.style.setProperty("--mobile-menu-display", "block");
        } else {
            root.style.setProperty("--mobile-menu-display", "none");
        }
    }
}