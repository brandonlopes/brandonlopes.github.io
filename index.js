function Book(title, author, genre, coverSource, readStatus) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.coverSource = coverSource;
    if (coverSource == null) this.coverSource = "images/booklet.svg";
    this.readStatus = "Unread";
    if (readStatus == true) this.readStatus = "Read";
    this.info = `${this.title} by ${this.author}`;
}

let meditations = new Book("Meditations", "Marcus Aurelius", "Philosophy", "images/marcusaurelius.jpeg", true);
let artOfWar = new Book("The Art of War", "Sun Tzu", "Translated by Thomas Cleary", "images/artofwar.jpeg");

let myLibrary = [meditations, artOfWar];

let newBookButton = document.getElementById("newBookButton");
newBookButton.addEventListener("click", function () {
    toggleDisplay("bookForm");
    toggleDisplay("newBookButton");
});

document.getElementById("addBookButton").addEventListener("click", addBookToLibrary);

let closeButton = document.getElementById("closeButton");
closeButton.addEventListener("click", function () {
    toggleDisplay("bookForm");
    toggleDisplay("newBookButton");
});

function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let genre = document.getElementById("genre").value;

    let book = new Book(title, author, genre);
    myLibrary.push(book);
    render();
}

function render() {
    bookList.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        createBookCard(myLibrary[i]);
    }
}

function createBookCard(Book) {
    let bookCard = document.createElement("div");
    bookCard.setAttribute("class", "bookCard");
    // bookCard.setAttribute("id", `${Book.info}`);

    let bookCover = document.createElement("img");
    bookCover.setAttribute("src", `${Book.coverSource}`);
    // bookCover.addEventListener("mouseover", function () { toggleVisibility(`${Book.info}`); });
    // bookCover.addEventListener("mouseout", function () { toggleVisibility(`${Book.info}`); });

    let bookInfo = document.createElement("div");
    bookInfo.setAttribute("id", `${Book.info}`);
    let bookInfoText = document.createElement("p");
    bookInfoText.innerText = `${Book.info}`;

    bookInfo.appendChild(bookInfoText);
    // bookInfo.style.visibility = "hidden";

    bookCard.appendChild(bookCover);
    bookCard.appendChild(bookInfo);
    document.getElementById("bookList").appendChild(bookCard);
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

document.body.onload = render();