document.body.onload = themeSelector().loadTheme(), mobileMenu(), quoteOfTheDay();

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
        } else {
            saveTheme(lightMode);
        }
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
    let content = document.getElementById("wrapper");
    let footer = document.getElementById("footer");
    let root = document.documentElement;

    menuIcon.addEventListener("click", () => {
        menuIcon.classList.toggle("change");
        content.classList.toggle("modal");
        footer.classList.toggle("modal");
        toggleMobileMenu();
    });

    content.addEventListener("click", () => {
        menuIcon.classList.remove("change");
        content.classList.remove("modal");
        footer.classList.remove("modal");
        toggleMobileMenu();
    })

    function toggleMobileMenu() {
        if (menuIcon.classList.contains("change")) {
            root.style.setProperty("--nav-height", "15em");
            setTimeout(function () {
                root.style.setProperty("--mobile-menu-display", "flex");
            }, 200);
        } else {
            root.style.setProperty("--nav-height", "2.5em");
            root.style.setProperty("--mobile-menu-display", "none");
        }
    }

}

function postSearch() {
    let map = {
        'category': getParam('category'),
        'tags': getParam('tags')
    }

}

function quoteOfTheDay() {
    let date = new Date();

    let quotesList = {
        quotes: [
            {
                text: "Less is more. It's also less. That's the point.",
                author: "Greg McKeown"
            },
            {
                text: "All of humanity's problems stem from man's inability to sit quietly in a room alone",
                author: "Blaise Pascal"
            },
            {
                text: "Perfection is achieved when there is nothing left to take away",
                author: "Antoine de Saint-Exupery"
            },
            {
                text: "Learn to enjoy the process. Love the daily discipline of showing up everyday and having the thing itself generate its own satisfaction",
                author: "James Clear"
            },
            {
                text: "Everything needs everything else in order to be anything at all",
                author: "Alan Watts"
            },
            {
                text: "Waste no more time arguing about what a good man should be. Be one.",
                author: "Marcus Aurelius"
            },
            {
                text: "I have just three things to teach: simplicity, patience, compassion. These three are your greatest treasures.",
                author: "Lao Tzu"
            }
        ]
    }

    let today = date.getDay();
    let quoteOfTheDay = quotesList.quotes[today];

    let quoteText = document.getElementById("quoteOfTheDay");
    let quoteAuthor = document.getElementById("quoteAuthor");
    quoteText.innerText = `“${quoteOfTheDay.text}”`;
    quoteAuthor.innerText = `- ${quoteOfTheDay.author}`
}