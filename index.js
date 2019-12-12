let myLibrary = [];

function Book(title, author, genre, coverSource, bookSource) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.coverSource = coverSource;
    if (coverSource == null) this.coverSource = "images/booklet.svg";
    this.bookSource = bookSource;
    // this.readStatus = "Unread";
    // if (readStatus == true) this.readStatus = "Read";
    this.info = `${this.title}. \n ${this.author}`;

}

function initializeBooks() {
    if (localStorage.getItem("blowed up")) return;

    if (!localStorage.getItem("The Library")) {
        let meditations = new Book("Meditations", "Marcus Aurelius", "Philosophy", "images/marcusaurelius.jpeg", "books/Meditations - Marcus Aurelius.html");
        let artOfWar = new Book("The Art of War", "Sun Tzu", "Translated by Thomas Cleary", "images/artofwar.jpeg", "books/The Art of War, by Sun Tzu.html");
        myLibrary.push(meditations, artOfWar);
    } else myLibrary = JSON.parse(localStorage.getItem("The Library"));
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
        clearInputFields();
    });

    document.getElementById("addBookButton").addEventListener("click", function () {
        addBookToLibrary();
        // toggleDisplay("bookForm");
        toggleDisplay("clearStorage")
    });

    let closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", function () {
        toggleDisplay("bookForm");
    });
}

function updateLocalStorage() {
    localStorage.setItem("The Library", JSON.stringify(myLibrary));
    localStorage.removeItem("blowed up");
}



function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let genre = document.getElementById("genre").value;

    let formError = document.getElementById("formError");

    if (title && author) {
        formError.innerText = "";
        let book = new Book(title, author, genre);

        let imageRegex = new RegExp("(.html)$")
        if (!imageRegex.exec(previewImg.src)) book.coverSource = previewImg.src;

        myLibrary.push(book);
        updateLocalStorage();
        toggleDisplay("bookForm");
        render();
    }

    else formError.innerText = "Books must have a title and an author";
}

function render() {
    bookList.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        createBookCard(myLibrary[i], "bookList");
        toggleClearStorageButton();

    }
    console.log(myLibrary.length);

}

function createBookCard(Book, container) {
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

    let bookLink = document.createElement("a");
    bookLink.setAttribute("href", Book.bookSource);
    let readBookButton = document.createElement("img");
    readBookButton.src = "images/openbook.svg";
    readBookButton.setAttribute("class", "icons");
    readBookButton.style.left = "0";
    bookLink.appendChild(readBookButton);


    bookInfo.appendChild(bookInfoText);
    bookInfo.appendChild(bookLink);
    bookInfo.appendChild(deleteBookButton);
    bookCard.appendChild(bookInfo);
    document.getElementById(container).appendChild(bookCard);
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

function toggleClearStorageButton() {
    let bomb = document.getElementById("clearStorage");
    if (myLibrary.length > 0) {
        console.log(`There are things to blow up. Bomb should be there`);

        bomb.style.display = "block";
    }
    else {
        console.log(`The library is empty so the bomb should be gone`);

        bomb.style.display = "none";
    }
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
    let answer = prompt(`You are about to blow up the library.\n\nType "blow it up" to continue`);
    if (answer === "blow it up") {
        // brandonLibrary = [];
        myLibrary = [];
        localStorage.removeItem("The Library");
        localStorage.setItem("blowed up", "true");
        render();
        toggleDisplay("clearStorage");
    }
}

// document.body.addEventListener("load", function(){
//     createEventListeners();
//     initializeBooks();
//     render();
// });

document.body.onload = createEventListeners();
document.body.onload = initializeBooks();
document.body.onload = render();