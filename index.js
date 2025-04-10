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

/*
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
*/

function updateLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

let myLibrary = [];

const storedLibrary = localStorage.getItem("myLibrary");
if (storedLibrary) {
    const parsed = JSON.parse(storedLibrary);
    myLibrary = parsed.map(book => new Book(book.title, book.author, book.pages, book.read));
} else {
    myLibrary = [
        new Book("The Hobbit", "J.R.R Tolkien", "295", "not read"),
        new Book("1984", "George Orwell", "328", "read"),
        new Book("To Kill a Mockingbird", "Harper Lee", "281", "not read"),
        new Book("The Great Gatsby", "F. Scott Fitzgerald", "180", "read"),
        new Book("Moby Dick", "Herman Melville", "635", "not read")
    ];
    updateLocalStorage(); // Save initial books if nothing exists yet
}

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
    book.dataset.rowId = i.id;
    for (let property in i){
        let data = document.createElement("td");
        data.textContent = i[property];
        book.appendChild(data);
    }
    const readCell = document.createElement("td");
    const readButton = document.createElement("button");
    readButton.textContent = "(un)read"
    readCell.appendChild(readButton);
    book.appendChild(readCell);
    readButton.addEventListener("click", () => {
        const status = book.querySelectorAll("td")[4];
        if (status.textContent === "read"){
            status.textContent = "unread";
        }
        else status.textContent = "read";
    });

    const cell = document.createElement("td");
    const button = document.createElement("button");
    button.textContent = "delete";
    cell.appendChild(button);
    book.appendChild(cell);
    table.appendChild(book);
    button.addEventListener("click", () => {
        const row = document.querySelector(`[data-row-id="${i.id}"]`);
        table.removeChild(row);
        for (let j = 0; j < myLibrary.length; ++j){
            if (i.id === myLibrary[j].id){
                myLibrary.splice(j, 1);
                updateLocalStorage();
                //console.log(myLibrary);
                break;
            }
        }
    });
}

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
    myLibrary.push(newBook);
    updateLocalStorage();
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