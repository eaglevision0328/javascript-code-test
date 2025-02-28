// const BookSearchApiClient = require("./BookSearchApiClient.js");

// const client = BookSearchApiClient();
// const booksByShakespeare = client.getBooksByAuthor("Shakespeare", 10);
import { BookSearchApiClient } from "./service/BookSearchApiClient";

const client = new BookSearchApiClient();

async function fetchBooks() {
  // fetch function that get book by author
  const books = await client.getBooks({ q: "Shakespeare", limit: "10" }, "json");
  console.log("Books:", books);
}

fetchBooks();