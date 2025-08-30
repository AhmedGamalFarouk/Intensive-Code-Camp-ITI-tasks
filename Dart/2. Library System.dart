abstract class Book {
  void borrow();
  void returnBook();
}

class EBook extends Book {
  num? fileSize;

  void download() {
    print('Downloading ebook, size: $fileSize');
  }

  @override
  void borrow() {
    print('Borrowing an ebook');
  }

  @override
  void returnBook() {
    print('Returning an ebook');
  }
}

class PrintedBook extends Book {
  bool _availability = true;

  bool get isAvailable => _availability;

  void printAvailabilityStatus() {
    if (_availability) {
      print('The printed book is available.');
    } else {
      print('The printed book is not available.');
    }
  }

  @override
  void borrow() {
    if (_availability) {
      print('Borrowing printed book.');
      _availability = false;
    } else {
      print('Printed book is not available to borrow.');
    }
  }

  @override
  void returnBook() {
    print('Returning printed book.');
    _availability = true;
  }
}

class Library {
  List _books = [
    "The Great Gatsby",
    "To Kill a Mockingbird",
    "1984",
    "Pride and Prejudice",
    "The Catcher in the Rye",
    "The Hobbit",
    "Harry Potter and the Sorcerer's Stone",
    "The Lord of the Rings",
    "The Da Vinci Code",
    "The Alchemist"
  ];

  void addBook(Book book) {
    _books.add(book);
    print('Added book to the library.');
  }

  void checkOutBook(Book book) {
    if (!_books.contains(book)) {
      print('This book does not belong to this library.');
      return;
    }

    if (book is PrintedBook) {
      if (book.isAvailable) {
        book.borrow();
      } else {
        print('Sorry, this printed book is currently not available.');
      }
    } else if (book is EBook) {
      book.borrow();
    }
  }

  void returnBookToLibrary(Book book) {
    book.returnBook();
    print('Book returned to the library system.');
  }

  void displayAvailableBooks() {
    print('\n--- Available Books in Library ---');
    bool found = false;
    for (var book in _books) {
      if (book is PrintedBook) {
        if (book.isAvailable) {
          print('Printed Book: Available');
          found = true;
        }
      } else if (book is EBook) {
        print('EBook: Available for download/borrow');
        found = true;
      }
    }
    if (!found) {
      print('No books currently available.');
    }
    print('--------------------------------');
  }
}
