const myLibrary = [
    new Book("The Hobbit", "J.R.R Tolkien", "295", "not read"),
    new Book("1984", "George Orwell", "328", "read"),
    new Book("To Kill a Mockingbird", "Harper Lee", "281", "not read"),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", "180", "read"),
    new Book("Moby Dick", "Herman Melville", "635", "not read")
];

function Book(title, author, pages, read) {
    if (!new.target)throw Error("add new keyword to create");
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const table = document.querySelector("table");

for (let i of myLibrary){
    const book = document.createElement("tr");
    for (let property in i){
        let data = document.createElement("td");
        data.textContent = i[property];
        //console.log(i[property]);
        book.appendChild(data);
    }
    //console.log(book);
    table.appendChild(book);
}

function addBookToLibrary() {
  // take params, create a book then store it in the array
}
