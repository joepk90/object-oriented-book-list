// OOP Structure:
// Setup UI functionality and Objects (data) in classes, creating them using the class's methods.
// Call these methods within the event handlers.
// Script includes setting Local Storage

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');

    // Create tr element
    const row = document.createElement('tr');

    //Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
 }

 showAlert(message, className) {
   // Create div
   const div = document.createElement('div'),
         container = document.querySelector('.container'),
         form = document.querySelector('#book-form');

   // Add classes
   div.className = `alert ${className}`;

   // Add text
   div.appendChild(document.createTextNode(message));

   // Insert alert div before form
   container.insertBefore(div, form)

   // timeout after 3 seconds
   setTimeout( function() {
     document.querySelector('.alert').remove();
   }, 2000);
 }

 deleteBook(target) {
   if (target.className === 'delete') {
     target.parentElement.parentElement.remove();
   }
 }

 clearFields() {
   document.getElementById('title').value = '';
   document.getElementById('author').value = '';
   document.getElementById('isbn').value = '';
 }

}

// Local Storage class
class Store {

  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    // For the forEach to work be sure to set the books object as an array - [] (set in getBooks())
    books.forEach(function(book){
      const ui  = new UI;

      // Add book to UI
      ui.addBookToList(book);
    });

  }

  static addBook(book) {
    let books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));

  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    // For the forEach to work be sure to set the books object as an array - [] (set in getBooks())
    books.forEach(function(book, index){
     if(book.isbn === isbn) {
      books.splice(index, 1);
     }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}



// Event Listeners

// DOM Load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listeners for add book
document.getElementById('book-form').addEventListener('submit',
function(e) {

  // Get form values
const title = document.getElementById('title').value,
      author = document.getElementById('author').value,
      isbn = document.getElementById('isbn').value;

// Instantiate book
const book = new Book(title, author, isbn);

// Instantiate ui
const ui = new UI();

// Validate
if (title === '' || author === '' | isbn === '') {
  // Error alert
ui.showAlert('Please fill in all fields', 'error');

} else {

  // Add book to List
  ui.addBookToList(book);
  Store.addBook(book);

  // show success
  ui.showAlert('Book Added!', 'success')

  // Clear fields
  ui.clearFields();
}

  e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {

  if (e.target.className === 'delete') {
    //Instantiate UI
    const ui = new UI();

    // Delete book
    ui.deleteBook(e.target);

    // Remove from localStorage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show book removed message
    ui.showAlert('Book Removed!', 'success')
  }

  e.preventDefault();
});
