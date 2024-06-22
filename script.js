const myLibrary = [];

Book.prototype.toggle = function () {
    if (this.read === "Yes") {
        this.read = "No";
    } else {
        this.read = "Yes";
    }
};

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        if (read === "Yes") {
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
const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 304, "Yes");
const sorcerersStone = new Book(
    "The Sorcerer's Stone",
    "J.K. Rowling",
    223,
    "Yes"
);
const eastOfEden = new Book("East Of Eden", "John Steinbeck", 601, "No");
const threeBodyProblem = new Book(
    "The Three Body Problem",
    "Liu Cixin",
    416,
    "Yes"
);

function addBookToLibrary(book) {
    myLibrary.push(book);
}

addBookToLibrary(theHobbit);
addBookToLibrary(sorcerersStone);
addBookToLibrary(eastOfEden);
addBookToLibrary(threeBodyProblem);

const library = document.querySelector(".library");
const libraryStart = document.querySelector(".library-start");
const bookCardTemplate = document.querySelector(".book-template");

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

function publishLibrary(myLibrary) {
    if (myLibrary.length !== 0) {
        while (library.childElementCount > 0) {
            library.firstChild.remove();
        }
        for (let i = 0; i < myLibrary.length; i++) {
            let bookCard = bookCardTemplate.cloneNode(true);
            bookCard
                .querySelector(".delete")
                .addEventListener("click", (event) => {
                    deleteBook(event.target);
                });
            bookCard.querySelector(".delete").setAttribute("data-index", i);
            bookCard.querySelector(".book-title").textContent =
                myLibrary[i].title;
            bookCard.querySelector(".author").textContent = myLibrary[i].author;
            bookCard.querySelector(".pages").textContent = myLibrary[i].pages;
            bookCard.querySelector(".read").textContent = myLibrary[i].read;
            if (myLibrary[i].read === "Yes") {
                bookCard.querySelector(".read-toggle-image").src =
                    "./imgs/book-open-svgrepo-com.svg";
            }
            bookCard
                .querySelector(".read-toggle")
                .addEventListener("click", (event) => {
                    toggleRead(event.target);
                });
            bookCard.classList.remove("hidden", "book-template");
            library.appendChild(bookCard);
        }
        library.classList.remove("hidden");
        libraryStart.classList.add("hidden");
    } else {
        library.classList.add("hidden");
        libraryStart.classList.remove("hidden");
    }
}

function deleteBook(target) {
    let bookIndex = target.closest(".book").querySelector(".delete")
        .dataset.index;
    myLibrary.splice(bookIndex, 1);
    publishLibrary(myLibrary);
}

function toggleRead(target) {
    let bookIndex = target.closest(".book").querySelector(".delete")
        .dataset.index;
    myLibrary[bookIndex].toggle();
    publishLibrary(myLibrary);
}

const form = document.querySelector("form");

form.addEventListener("submit", addBook);

function addBook(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const dataObject = Object.fromEntries(data.entries());
    let newBook = new Book(
        dataObject.title,
        dataObject.author,
        dataObject.pages,
        dataObject.read
    );
    addBookToLibrary(newBook);
    publishLibrary(myLibrary);
    form.reset();
}

publishLibrary(myLibrary);
