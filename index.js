
let myLibrary = [];

function Book(title, author, genre, coverSource, contentSource) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    if (!customImageExists() && this.coverSource === null) {
        this.coverSource = "images/booklet.svg";
    } else {
        this.coverSource = coverSource;
    }
    this.contentSource = contentSource;
    this.info = `${this.title} by ${this.author}`;
}

function setDefaultBooks() {
    let meditations = new Book(
        "Meditations",
        "Marcus Aurelius",
        "Philosophy",
        "images/marcusaurelius.jpeg",
        "books/Meditations - Marcus Aurelius.html"
    );

    let artOfWar = new Book(
        "The Art of War",
        "Sun Tzu",
        "Translated by Thomas Cleary",
        "images/artofwar.jpeg",
        "books/The Art of War, by Sun Tzu.html"
    );
    myLibrary = [meditations, artOfWar];
}

function initializeBooks() {
    if (localStorage.getItem("clearedLibrary")) {
        return;
    }

    if (!localStorage.getItem("library")) {
        setDefaultBooks();
    }
    else {
        myLibrary = JSON.parse(localStorage.getItem("library"));
    }
}

function initializeEventListeners() {
    document.getElementById("image_upload").addEventListener("change", function () {
        const reader = new FileReader();
        const file = document.getElementById("image_upload").files[0]; 
        let previewImg = document.getElementById("previewImg")
        if (file) { 
            reader.addEventListener("load", function () {
                previewImg.src = reader.result;
            });
            reader.readAsDataURL(file); 
        }
    });

    document.getElementById("newBookButton").addEventListener("click", function () {
        toggleDisplay("bookForm");
        toggleDisplay("newBookButton");
        clearInputFields();
    });

    document.getElementById("addBookButton").addEventListener("click", function () {
        createCustomBook();
        toggleClearStorageButton();
        render();
    });

    document.getElementById("closeButton").addEventListener("click", function () {
        toggleDisplay("bookForm");
    });

    document.getElementById("clearStorage").addEventListener("click", function () {
        let answer = prompt(`You are about to blow up the library. Type "blow it up" to continue`);
        if (answer === "blow it up") {
            myLibrary = [];
            localStorage.removeItem("library");
            localStorage.setItem("clearedLibrary", "true");
            render();
            toggleDisplay("clearStorage");
            toggleClearStorageButton();
        }
    });
}

function updateLocalStorage() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
    localStorage.removeItem("clearedLibrary");
}

function render() {
    document.getElementById("bookList").innerHTML = "";
    let i;
    for (i = 0; i < myLibrary.length; i++) {
        createBookCard(myLibrary[i]);
    }
}

function createCustomBook() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let genre = document.getElementById("genre").value;
    let book = new Book(title, author, genre, null, null);

    if (customImageExists()) {
        book.coverSource = previewImg.src;
    }
    if (title && author) {
        addBookToLibrary(book);
        toggleDisplay("bookForm");
    }
    else {
        displayFormError();
    }
}

function customImageExists() {    
    let imageRegex = new RegExp("(.html)$");
    let githubRegex = new RegExp("(.io/$)");
    if (!imageRegex.exec(previewImg.src) && !githubRegex.exec(previewImg.src)) { return true; }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    updateLocalStorage();
}

function displayFormError() {
    let formError = document.getElementById("formError");
    formError.innerText = "Books must have a title and an author";
}

function createBookCard(Book) {
    let bookCard = document.createElement("div");
    bookCard.setAttribute("class", "bookCard");

    let bookCover = document.createElement("img");
    bookCover.setAttribute("src", `${Book.coverSource}`);
    bookCover.setAttribute("alt", `${Book.info}`);
    bookCard.appendChild(bookCover);

    let bookInfo = document.createElement("div");
    bookInfo.setAttribute("id", `${Book.info}`);
    if (Book.coverSource === "images/booklet.svg") {
        bookInfo.setAttribute("class", "booklet");
    }
    let bookInfoText = document.createElement("h4");
    bookInfoText.innerText = `${Book.info}`;

    let deleteBookButton = document.createElement("img");
    deleteBookButton.src = "images/delete.svg";
    deleteBookButton.setAttribute("class", "icons");
    deleteBookButton.style.right = "0px";

    deleteBookButton.addEventListener("click", function () {
        deleteBook(Book);
        toggleClearStorageButton();
        render();
    });

    if(Book.contentSource) {
    let bookLink = document.createElement("a");
    bookLink.setAttribute("href", Book.contentSource);
    let readBookButton = document.createElement("img");
    readBookButton.src = "images/openbook.svg";
    readBookButton.setAttribute("class", "icons");
    readBookButton.style.left = "0";
    bookLink.appendChild(readBookButton);
    bookInfo.appendChild(bookLink);
    }

    bookInfo.appendChild(bookInfoText);
    bookInfo.appendChild(deleteBookButton);
    bookCard.appendChild(bookInfo);
    document.getElementById("bookList").appendChild(bookCard);
}

function deleteBook(Book) {
    myLibrary.splice(myLibrary.indexOf(Book), 1);
    updateLocalStorage();
}

function clearInputFields() {
    let inputFields = document.getElementsByTagName("input");
    let i;
    for (i = 0; i < inputFields.length; i++) {
        inputFields[i].value = "";
    }
    previewImg.src = "";
}

function toggleDisplay(elementID) {
    let element = document.getElementById(elementID);
    if (element.style.display) {
        element.style.display = (
            element.style.display === "none" ? "block" : "none");
    }
}

function toggleVisibility(elementID) {
    let element = document.getElementById(elementID);
    if (element.style.visibility) {
        element.style.visibility = (
            element.style.visibility === "hidden" ? "visible" : "hidden");
    }
}

function toggleClearStorageButton() {
    let bomb = document.getElementById("clearStorage");
    if (myLibrary.length > 0) {
        bomb.style.display = "block";
    }
    else {
        bomb.style.display = "none";
    }
}

function toggleClass(elementID, classID) {
    let element = document.getElementById(elementID);
    if (element.classList) {
        element.classList.toggle(classID);
    }
}

document.body.onload = initializeEventListeners();
document.body.onload = initializeBooks();
document.body.onload = toggleClearStorageButton();
document.body.onload = render();