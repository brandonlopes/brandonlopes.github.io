let meditations = new Book("Meditations", "Marcus Aurelius", "Philosophy", "images/marcusaurelius.jpeg");
let artOfWar = new Book("The Art of War", "Sun Tzu", "Translated by Thomas Cleary", "images/artofwar.jpeg");

let myLibrary = [meditations, artOfWar];

let newBookButton = document.getElementById("newBookButton");

newBookButton.addEventListener("click", function() {
    toggle("bookForm");
    toggle("newBookButton");
});

function Book(title, author, genre, coverSource) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.coverSource = coverSource;
    if (coverSource == null) this.coverSource = "images/booklet.png";
    this.readStatus = false;
    this.info = function () {
        return `${this.title} by ${this.author}`;
    }
}

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
    bookList.innerHTML += `<div class="bookCard">
    <img src="${Book.coverSource}" class="" onmouseover="toggle('${Book.info()}')" onmouseout="toggle('${Book.info()}')">
     <p id="${Book.info()}" class="" style="visibility: hidden;">${Book.info()}</p></div>`;
}

function toggle(x) {
    let element = document.getElementById(x);
    if (element.style.visibility) element.style.visibility = (element.style.visibility === "hidden") ? "visible" : "hidden";
    if (element.style.display) element.style.display = (element.style.display === "none") ? "block" : "none";
}