let meditations = new Book("Meditations", "Marcus Aurelius", "Philosophy");
let gameOfThrones = new Book("Game of Thrones", "George R.R Martin", "Fantasy");

let myLibrary = [meditations, gameOfThrones];
let bookList = document.getElementById("bookList");

function Book(title, author, genre) {
    this.title = title;
    this.author = author;
    this.genre = genre;
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
        // bookList.innerHTML += `${myLibrary[i].info()} <br><br>`;
    }
}

function showForm() {
    let form = document.getElementById("bookForm");
    form.style.display = (form.style.display === "none") ? "block" : "none";
}

function createBookCard(Book){
    let bookCard = document.createElement("p");
    bookCard.className = "w3-card";
    bookCard.innerHTML += `${Book.info()}`;
    bookList.appendChild(bookCard);
    document.bobdy.appendChild(bookCard);
}