// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
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

// Show alert
UI.prototype.showAlert = function(message, className) {

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
  }, 3000);
}

// Clear fields
UI.prototype.clearFields = function() {
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('isbn').value = '';
}

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

  // show success
  ui.showAlert('Book Added', 'success')

  // Clear fields
  ui.clearFields();
}

  e.preventDefault();
});
