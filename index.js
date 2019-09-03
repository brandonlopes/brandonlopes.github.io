let meditations = new Book("Meditations", "Marcus Aurelius", "Philosophy");
let gameOfThrones = new Book("Game of Thrones", "George R.R Martin", "Fantasy");

let myLibrary = [meditations, gameOfThrones];

function Book(title, author, genre){
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.info = function (){
        return `${this.title} by ${this.author}, ${this.genre}`;
    }
}

function addBookToLibrary(){
    
}

function render(){
    for (let i = 0; i < myLibrary.length; i++) {
        console.log(myLibrary[i].info());
    }
}

render();