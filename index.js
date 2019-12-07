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

let myLibrary = [];

function initialBooks() {
    let meditations = new Book("Meditations", "Marcus Aurelius", "Philosophy", "images/marcusaurelius.jpeg", true);
    let artOfWar = new Book("The Art of War", "Sun Tzu", "Translated by Thomas Cleary", "images/artofwar.jpeg");
    let noCover = new Book("A Book Without a Cover", "The Author", "Fantasy");
    myLibrary.push(meditations, artOfWar, noCover);
    for (let i = 0; i < myLibrary.length; i++) {
        localStorage.setItem(`library${[i]}`, JSON.stringify(myLibrary[i]));
        
    }
}

document.getElementById("image_upload").addEventListener("change", generatePreviewImg);

function generatePreviewImg() {
    let reader = new FileReader();
    let file = document.getElementById("image_upload").files[0];
    let previewImg = document.getElementById("previewImg");
    
    reader.addEventListener("load", function () {
        previewImg.src = reader.result;
        localStorage.setItem("image", reader.result);
    });
    if (file) reader.readAsDataURL(file);
    return reader.result;
}

let newBookButton = document.getElementById("newBookButton");
newBookButton.addEventListener("click", function () {
    localStorage.setItem("image", "images/booklet.svg")
    toggleDisplay("bookForm");
    toggleDisplay("newBookButton");
    clearInputFields();
});

document.getElementById("addBookButton").addEventListener("click", function () {
    addBookToLibrary();
    toggleDisplay("bookForm");
    toggleDisplay("newBookButton");
});

let closeButton = document.getElementById("closeButton");
closeButton.addEventListener("click", function () {
    toggleDisplay("bookForm");
    toggleDisplay("newBookButton");
});

function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let genre = document.getElementById("genre").value;

    let book = new Book(title, author, genre, localStorage.getItem("image"));
    // if(localStorage.getItem("image")) book.coverSource = localStorage.getItem("image");
    console.log("img src: "+ book.coverSource);
    
    myLibrary.push(book);
    localStorage.setItem(book.title, JSON.stringify(myLibrary[3]));
    render();
}

function render() {
    bookList.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        createBookCard(JSON.parse(localStorage.getItem(`library${[i]}`)));
        console.log(JSON.parse(localStorage.getItem(`library${[i]}`)));
        
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

    bookInfo.appendChild(bookInfoText);
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

function clearInputFields() {
    let inputFields = document.getElementsByTagName("input");
    for (let i = 0; i < inputFields.length; i++) {
        inputFields[i].value = "";
    }
    previewImg.src = "";
    console.log(previewImg.src);
    
}

document.body.onload = initialBooks();
document.body.onload = render();