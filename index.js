const table = document.querySelector("table");
const add = document.querySelector("#add");
const dialogue = document.querySelector("#favDialog");
const confirmBtn = document.querySelector("#confirmBtn");
const closeButton = document.querySelector("#cancelBtn");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const selectEl = document.querySelector("#read");
const newBook = [];

const myLibrary = [
    new Book("The Hobbit", "J.R.R Tolkien", "295", "not read"),
    new Book("1984", "George Orwell", "328", "read"),
    new Book("To Kill a Mockingbird", "Harper Lee", "281", "not read"),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", "180", "read"),
    new Book("Moby Dick", "Herman Melville", "635", "not read")
];

for (let i of myLibrary){
    renderBook(i);
}

function Book(title, author, pages, read) {
    if (!new.target)throw Error("add new keyword to create");
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function renderBook(i) {
    const book = document.createElement("tr");
    for (let property in i){
        let data = document.createElement("td");
        data.textContent = i[property];
        book.appendChild(data);
    }
    table.appendChild(book);
    //console.log(book);
}
/*
function addBookToLibrary(arr) {
    if (arr.length === 0)return;
    myLibrary.push(newBook);
    const book = document.createElement("tr");
    for (let property of arr){
        let data = document.createElement("td");
        data.textContent = property;
        book.appendChild(data);
    }
    //console.log(book);
    table.appendChild(book);
}*/

add.addEventListener("click", () => {
    dialogue.showModal();
});

// Prevent the "confirm" button from the default behavior of submitting the form, 
// and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault(); //don't want to submit this fake form
    
    const newBook = new Book(
        title.value,
        author.value,
        pages.value,
        selectEl.value
    );
    renderBook(newBook);
    favDialog.close();

    title.value = "";
    author.value = "";
    pages.value = "";
    selectEl.value = "not read";
});

closeButton.addEventListener("click", () => {
    favDialog.close();
});