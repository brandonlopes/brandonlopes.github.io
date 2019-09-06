let meditations = new Book("Meditations", "Marcus Aurelius", "Philosophy", "images/marcusaurelius.jpeg");
let gameOfThrones = new Book("Game of Thrones", "George R.R Martin", "Fantasy", "images/GoT.jpeg");

let myLibrary = [meditations, gameOfThrones];

function Book(title, author, genre, coverSource) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.coverSource = coverSource;
    this.readStatus = false;
    this.info = function () {
        return `${this.title} by ${this.author} - ${this.genre}`;
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
    bookList.innerHTML += `<img src="${Book.coverSource}" class="w3-card w3-hover-opacity" onmouseover="toggle('${Book.title}')" onmouseout="toggle('${Book.title}')"> <p id="${Book.title}" style="display: none;">${Book.info()}</p>`;
}

function toggle(x) {
    let element = document.getElementById(x);
    element.style.display = (element.style.display === "none") ? "block" : "none";
}