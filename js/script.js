document.body.onload = () => { themeSelector().loadTheme(); mobileMenu(); quoteOfTheDay(); fetchGithubLinks(); }

function themeSelector() {
    let colorToggle = document.getElementById("color-toggle");
    let root = document.documentElement;
    let currentTheme = "";

    let darkMode = {
        backgroundColor: "#24292e",
        textColor: "white",
        icon: "../assets/images/sun.svg"
    }

    let lightMode = {
        backgroundColor: "white",
        textColor: "#24292e",
        icon: "../assets/images/moon.svg"
    }

    function loadTheme() {
        if (localStorage.getItem("currentTheme")) {
            currentTheme = JSON.parse(localStorage.getItem("currentTheme"));
            changeTheme(currentTheme);
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
        
        if (theme.backgroundColor === darkMode.backgroundColor){
            colorToggle.src = darkMode.icon;
        }
        else { colorToggle.src = lightMode.icon; }
    }

    colorToggle.addEventListener("click", () => {
        currentTheme = JSON.parse(localStorage.getItem("currentTheme"));
        animateIcon();
        if (currentTheme.backgroundColor === lightMode.backgroundColor) {
            changeTheme(darkMode);
            saveTheme(darkMode);
        }
        else {
            changeTheme(lightMode);
            saveTheme(lightMode);
        }
    });

    function animateIcon(){
        colorToggle.classList.toggle("spin");
        setTimeout(() => {
            colorToggle.classList.toggle("spin");
        }, 30)
    }

    return {
        loadTheme: loadTheme,
        changeTheme: changeTheme
    };
}

function mobileMenu() {
    let menuIcon = document.getElementById("menu-icon");
    let content = document.getElementById("wrapper");
    let footer = document.getElementById("footer");
    let root = document.documentElement;
    let modal = document.getElementById("modal");
    modal.addEventListener("click", () => {
        menuIcon.classList.toggle("change");
        toggleMobileMenu();
    })

    menuIcon.addEventListener("click", () => {
        menuIcon.classList.toggle("change");
        toggleMobileMenu();
    });

    content.addEventListener("click", () => {
        menuIcon.classList.remove("change");
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
    if (document.getElementById("quoteOfTheDay") || document.getElementById("quoteAuthor")) {
        let quoteText = document.getElementById("quoteOfTheDay");
        let quoteAuthor = document.getElementById("quoteAuthor");
        let date = new Date();

        let quoteList = [
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


        let today = date.getDay();
        let quoteOfTheDay = quoteList[today];

        quoteText.innerText = `“${quoteOfTheDay.text}”`;
        quoteAuthor.innerText = `- ${quoteOfTheDay.author}`
    }
}

function fetchGithubLinks() {
    if (document.getElementById("project-list")) {
        let repoList = document.getElementById("project-list");
        fetch(`https://api.github.com/users/brandonlopes/repos`)
            .then(function (response) {
                response.json().then(function (data) {
                    for (repository in data) {
                        if (data[repository].has_pages && data[repository].name != "brandonlopes.github.io") {
                            let link = data[repository].name;
                            let name = prettyName(data[repository].name);
                            let description = data[repository].description === null ? "No description" : data[repository].description;
                            repoList.innerHTML += `<li>
                            <h3>
                            <a href="https://brandonlopes.ca/${link}">${name}</a> 
                            </h3>
                            <p>${description}</p>
                            </li>`;
                        };
                    };
                });
            });
    };

    function prettyName(repo) {
        let name = repo.replace(/_/g, " ");
        return name;
    }
};