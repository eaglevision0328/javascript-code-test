import React, { useState } from "react";
import { BookSearchApiClient, BookSearchTypesAPI } from "./service/BookSearchApiClient";
import { FormattedBook } from "./constants/interface";

const client = new BookSearchApiClient(new BookSearchTypesAPI());

const App: React.FC = () => {
  const [books, setBooks] = useState<FormattedBook[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<"author" | "publisher" | "year">("author");
  const [query, setQuery] = useState<string>("");

  // Fetch books based on search input
  const fetchBooks = async () => {
    if (!query.trim()) {
      setError("Please enter a search term.");
      return;
    }

    setLoading(true);
    setError(null);

    let queryParams: Record<string, string | number> = { limit: "10" };
    if (searchType === "author") queryParams.author = query;
    if (searchType === "publisher") queryParams.publisher = query;
    if (searchType === "year") queryParams.year = query;

    const response = await client.searchBooks(queryParams, "json");

    if ("message" in response) {
      setError(response.message);
      setBooks([]); // Clear books on error
    } else {
      setBooks(response);
    }
    setLoading(false);
  };

  // Handle Enter key press for search
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchBooks();
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "auto" }}>
      <h1>📚 Book Finder</h1>

      {/* Search Input & Selection */}
      <div style={{ marginBottom: "20px" }}>
        <label>Search by: </label>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value as "author" | "publisher" | "year")}>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
          <option value="year">Year</option>
        </select>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress} // Allows pressing Enter to search
          placeholder={`Enter ${searchType} name`}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
        <button onClick={fetchBooks} style={{ marginLeft: "10px", padding: "5px 10px" }}>
          Search
        </button>
      </div>

      {/* Loading & Error Handling */}
      {loading && <p>Loading books...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display Books */}
      {!loading && !error && books.length > 0 && (
        <table border={1} cellPadding={10} cellSpacing={0} style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.quantity}</td>
                <td>${book.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && books.length === 0 && <p>No books found.</p>}
    </div>
  );
};

export default App;
