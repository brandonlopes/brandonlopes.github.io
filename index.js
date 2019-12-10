let myLibrary = [];

function Book(title, author, genre, coverSource, readStatus) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.coverSource = coverSource;
    if (coverSource == null) this.coverSource = "images/booklet.svg";
    this.readStatus = "Unread";
    if (readStatus == true) this.readStatus = "Read";
    this.info = `${this.title}. \n ${this.author}`;

}

function initializeBooks() {
    if (!localStorage.length) {
        let meditations = new Book("Meditations", "Marcus Aurelius", "Philosophy", "images/marcusaurelius.jpeg", true);
        let artOfWar = new Book("The Art of War", "Sun Tzu", "Translated by Thomas Cleary", "images/artofwar.jpeg");
        myLibrary.push(meditations, artOfWar);
        updateLocalStorage();
    }
    else {
        myLibrary = JSON.parse(localStorage.getItem("The Library"));
    }
}

function createEventListeners() {
    document.getElementById("image_upload").addEventListener("change", generatePreviewImg);

    function generatePreviewImg() {
        let reader = new FileReader();
        let file = document.getElementById("image_upload").files[0];
        let previewImg = document.getElementById("previewImg");

        reader.addEventListener("load", function () {
            previewImg.src = reader.result;
        });
        if (file) reader.readAsDataURL(file);
    }

    let newBookButton = document.getElementById("newBookButton");
    newBookButton.addEventListener("click", function () {
        toggleDisplay("bookForm");
        toggleDisplay("newBookButton");
        // toggleDisplay("clearStorage");
        clearInputFields();
    });

    document.getElementById("addBookButton").addEventListener("click", function () {
        addBookToLibrary();
        toggleDisplay("bookForm");

    });

    let closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", function () {
        toggleDisplay("bookForm");
        // toggleDisplay("clearStorage")
    });
}

function updateLocalStorage(){
    localStorage.setItem("The Library", JSON.stringify(myLibrary));
}

function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let genre = document.getElementById("genre").value;

    let book = new Book(title, author, genre);

    let imageRegex = new RegExp("(.html)$")
    if (!imageRegex.exec(previewImg.src)) book.coverSource = previewImg.src;

    myLibrary.push(book);
    updateLocalStorage();
    render();
}

function render() {
    bookList.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        createBookCard(myLibrary[i])
    }
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
    if (Book.coverSource == "images/booklet.svg") {
        bookInfo.setAttribute("class", "booklet");
    }
    let bookInfoText = document.createElement("h4");
    bookInfoText.innerText = `${Book.info}`;

    let deleteBookButton = document.createElement("img");
    deleteBookButton.src = "images/delete.svg";
    deleteBookButton.setAttribute("class", "icons")
    deleteBookButton.style.right = "0px";

    deleteBookButton.addEventListener("click", function () {
        deleteBook(Book);
    });

    let readBookButton = document.createElement("img");
    readBookButton.src = "images/openbook.svg";
    readBookButton.setAttribute("class", "icons");
    readBookButton.style.left = "0";


    bookInfo.appendChild(bookInfoText);
    bookInfo.appendChild(readBookButton);
    bookInfo.appendChild(deleteBookButton);
    bookCard.appendChild(bookInfo);
    document.getElementById("bookList").appendChild(bookCard);
}

function deleteBook(Book) {
    myLibrary.splice(myLibrary.indexOf(Book), 1);
    updateLocalStorage();
    render();
}

function toggleDisplay(elementID) {
    let element = document.getElementById(elementID);
    if (element.style.display) element.style.display = (element.style.display === "none") ? "block" : "none";
}

function toggleVisibility(elementID) {
    let element = document.getElementById(elementID);
    if (element.style.visibility) element.style.visibility = (element.style.visibility === "hidden") ? "visible" : "hidden";
}

function toggleClass(elementID, classID) {
    let element = document.getElementById(elementID);
    if (element.classList) {
        element.classList.toggle(classID);
    }
}

function clearInputFields() {
    let inputFields = document.getElementsByTagName("input");
    for (let i = 0; i < inputFields.length; i++) {
        inputFields[i].value = "";
    }
    previewImg.src = "";
}

let clearStorageButton = document.getElementById("clearStorage");
clearStorageButton.addEventListener("click", clearStorage);

function clearStorage() {
    localStorage.clear();
    render();
    toggleDisplay("clearStorage");

    alert("All books have been deleted");
}

let body = document.getElementsByTagName("body")[0];
body.addEventListener("load", function(){
    createEventListeners();
    initializeBooks();
    render();
});

// document.body.onload = createEventListeners();
// document.body.onload = initialBooks();
// document.body.onload = render();