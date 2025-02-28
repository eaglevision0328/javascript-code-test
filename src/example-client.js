const { BookSearchApiClient, BookSearchTypesAPI } = require("./service/BookSearchApiClient");

// const client = BookSearchApiClient();
// const booksByShakespeare = client.getBooksByAuthor("Shakespeare", 10);

const client = new BookSearchApiClient(new BookSearchTypesAPI());

async function fetchBooks() {
  try {
    // Query by Author**
    const booksByAuthor = await client.searchBooks({ author: "Shakespeare", limit: "10" }, "json");
    console.log("Books by Shakespeare:", booksByAuthor);

    // **Query by Publisher**
    const booksByPublisher = await client.searchBooks({ publisher: "DG", limit: "10" }, "json");
    console.log("Books by Publisher DG:", booksByPublisher);

    // **Query by Year**
    const booksByYear = await client.searchBooks({ year: "2020", limit: "10" }, "json");
    console.log("Books from 2020:", booksByYear);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

fetchBooks();