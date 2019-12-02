function Book(title, author, genre, coverSource, readStatus) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.coverSource = coverSource;
    if (coverSource == null) this.coverSource = "images/booklet.svg";
    this.readStatus = "Unread";
    if(readStatus == true) this.readStatus = "Read";
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

    let bookCover = document.createElement("img");
    bookCover.setAttribute("src", `${Book.coverSource}`);
    bookCover.addEventListener("mouseover", function () { toggleVisibility(`${Book.info}`); });
    bookCover.addEventListener("mouseout", function () { toggleVisibility(`${Book.info}`); });

    let bookInfoDiv = document.createElement("div");
    bookInfoDiv.setAttribute("id", `${Book.info}`);

    let bookInfoParagraph = document.createElement("p");
    bookInfoParagraph.innerText = `${Book.info}`;
    
    bookInfoDiv.style.visibility = "hidden";
    bookInfoDiv.appendChild(bookInfoParagraph);

    bookCard.appendChild(bookCover);
    bookCard.appendChild(bookInfoDiv);
    document.getElementById("bookList").appendChild(bookCard);
}

function toggleDisplay(x) {
    let element = document.getElementById(x);
    if (element.style.display) element.style.display = (element.style.display === "none") ? "block" : "none";
}

function toggleVisibility(x) {
    let element = document.getElementById(x);
    if (element.style.visibility) element.style.visibility = (element.style.visibility === "hidden") ? "visible" : "hidden";
}

document.body.onload = render();