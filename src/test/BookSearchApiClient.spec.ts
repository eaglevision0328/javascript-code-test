import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BookSearchApiClient, BookSearchTypesAPI } from "../service/BookSearchApiClient";
import { mockBookResponse, formattedBookResponse, xmlBookResponse } from "../constants/mockData";
import { FormattedBook, ErrorMes } from "../constants/interface";
import { API_ENDPOINTS } from "../constants/api";

describe("BookSearchApiClient", () => {
  let client: BookSearchApiClient;
  let mock: MockAdapter;

  beforeAll(() => {
    client = new BookSearchApiClient(new BookSearchTypesAPI());
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  // Test 1: Ensure JSON API Fetch Works for Author
  it("should fetch books by author in JSON format", async () => {
    mock.onGet(API_ENDPOINTS.SEARCH_BY_AUTHOR).reply(200, mockBookResponse);

    const books = await client.searchBooks({ author: "Shakespeare", limit: "10" }, "json");

    expect(books).toBeInstanceOf(Array);
    expect(books).toHaveLength(2);
    expect((books as FormattedBook[])[0].title).toBe("Hamlet");
    expect((books as FormattedBook[])[0].author).toBe("William Shakespeare");
    expect(books).toEqual(formattedBookResponse);
  });

  // Test 2: Ensure JSON API Fetch Works for Publisher
  it("should fetch books by publisher in JSON format", async () => {
    mock.onGet(API_ENDPOINTS.SEARCH_BY_PUBLISHER).reply(200, mockBookResponse);

    const books = await client.searchBooks({ publisher: "DD", limit: "10" }, "json");

    expect(books).toHaveLength(2);
    expect((books as FormattedBook[])[1].title).toBe("Romeo and Juliet");
    expect((books as FormattedBook[])[1].author).toBe("William Shakespeare");
    expect(books).toEqual(formattedBookResponse);
  });

  // Test 3: Ensure JSON API Fetch Works for Year
  it("should fetch books by year in JSON format", async () => {
    mock.onGet(API_ENDPOINTS.SEARCH_BY_YEAR).reply(200, mockBookResponse);

    const books = await client.searchBooks({ year: "2020", limit: "10" }, "json");

    expect(books).toHaveLength(2);
    expect(books).toEqual(formattedBookResponse);
  });

  // Test 4: Ensure XML API Fetch Works
  it("should fetch books and parse XML format correctly", async () => {
    mock.onGet(API_ENDPOINTS.SEARCH_BY_AUTHOR).reply(200, xmlBookResponse);

    const books = await client.searchBooks({ author: "Shakespeare", limit: "10" }, "xml");

    expect(books).toBeInstanceOf(Array);
    expect(books).toHaveLength(2);
    expect((books as FormattedBook[])[0].title).toBe("Hamlet");
    expect((books as FormattedBook[])[0].author).toBe("William Shakespeare");
    expect(books).toEqual(formattedBookResponse);
  });

  // Test 5: Handle API Errors Properly
  it("should handle API errors gracefully", async () => {
    mock.onGet(API_ENDPOINTS.SEARCH_BY_AUTHOR).reply(500, { message: "Internal Server Error" });

    const response = await client.searchBooks({ author: "Shakespeare", limit: "10" }, "json");

    expect(response).toHaveProperty("message");
    expect((response as ErrorMes).status).toBe(500);
  });
});
