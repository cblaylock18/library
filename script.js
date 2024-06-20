const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        if (read === true) {
            return (
                this.title +
                " by " +
                this.author +
                ", " +
                this.pages +
                " pages, read."
            );
        } else {
            return (
                this.title +
                " by " +
                this.author +
                ", " +
                this.pages +
                " pages, not read yet."
            );
        }
    };
}
const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 600, false);
const sorcerersStone = new Book(
    "The Sorcerer's Stone",
    "J.K. Rowling",
    300,
    true
);
const eastOfEden = new Book("East Of Eden", "John Steinbeck", 700, false);
const threeBodyProblem = new Book(
    "The Three Body Problem",
    "Someone ??",
    500,
    true
);

function addBookToLibrary(book) {
    myLibrary.push(book);
}

addBookToLibrary(theHobbit);
addBookToLibrary(sorcerersStone);
addBookToLibrary(eastOfEden);
addBookToLibrary(threeBodyProblem);
console.table(myLibrary);

let library = document.querySelector(".library");
let bookCardTemplate = document.querySelector(".book");

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

function publishLibrary(myLibrary) {
    if (myLibrary.length !== 0) {
        for (let i = 0; i < myLibrary.length; i++) {
            let bookCard = bookCardTemplate.cloneNode(true);
            bookCard.querySelector(".book-title").textContent =
                myLibrary[i].title;
            bookCard.querySelector(".author").textContent = myLibrary[i].author;
            bookCard.querySelector(".pages").textContent = myLibrary[i].pages;
            bookCard.querySelector(".read").textContent = myLibrary[i].read;
            bookCard.classList.add(camelize(myLibrary[i].title));
            library.appendChild(bookCard);
        }
        bookCardTemplate.classList.add("hidden");
    } else {
        bookCardTemplate.classList.remove("hidden");
    }
}

publishLibrary(myLibrary);
