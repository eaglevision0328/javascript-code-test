import axios from "axios";
import { API_ENDPOINTS } from "../constants/api";
import { ApiBookResponse, FormattedBook, ErrorMes, BookSearchAPI } from "../constants/interface";



export class BookSearchTypesAPI implements BookSearchAPI {
  private baseUrl = API_ENDPOINTS.BASE;

  async getBooks(query: Record<string, string | number>, format: "json" | "xml"): Promise<FormattedBook[] | ErrorMes> {
    try {
      const searchQuery = this.buildQuery(query);
      const response = await axios.get<ApiBookResponse>(searchQuery.url, {
        params: { ...searchQuery.params, format },
        headers: { "Content-Type": "application/json" },
      });

      return format === "json" ? this.formatJson(response.data) : this.formatXml(response.data);
    } catch (error: any) {
      console.error("API request failed:", error.message);
      return { message: "Failed to fetch books", status: error.response?.status || 500 };
    }
  }

  private buildQuery(query: Record<string, string | number>) {
    if (query.author) {
      return { url: API_ENDPOINTS.SEARCH_BY_AUTHOR, params: { q: query.author, limit: query.limit } };
    } else if (query.publisher) {
      return { url: API_ENDPOINTS.SEARCH_BY_PUBLISHER, params: { publisher: query.publisher, limit: query.limit } };
    } else if (query.year) {
      return { url: API_ENDPOINTS.SEARCH_BY_YEAR, params: { year: query.year, limit: query.limit } };
    } else {
      throw new Error("Invalid search parameters");
    }
  }

  private formatJson(apiResponse: ApiBookResponse): FormattedBook[] {
    return apiResponse.data.map((item) => ({
      title: item.book.title,
      author: item.book.author,
      isbn: item.book.isbn,
      quantity: parseInt(item.stock.quantity, 10),
      price: parseFloat(item.stock.price),
    }));
  }

  private formatXml(xmlString: any): FormattedBook[] {
    try {
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlString, "application/xml");
      const bookNodes = Array.from(xml.getElementsByTagName("data"));

      return bookNodes.map((bookNode) => ({
        title: bookNode.getElementsByTagName("title")[0]?.textContent || "",
        author: bookNode.getElementsByTagName("author")[0]?.textContent || "",
        isbn: bookNode.getElementsByTagName("isbn")[0]?.textContent || "",
        quantity: Number(bookNode.getElementsByTagName("quantity")[0]?.textContent) || 0,
        price: Number(bookNode.getElementsByTagName("price")[0]?.textContent) || 0,
      }));
    } catch (error) {
      console.error("Error parsing XML:", error);
      return [];
    }
  }
}

// Factory Pattern to Support Multiple APIs
export class BookSearchApiClient {
  constructor(private apiProvider: BookSearchAPI) {}

  async searchBooks(query: Record<string, string | number>, format: "json" | "xml"): Promise<FormattedBook[] | ErrorMes> {
    return this.apiProvider.getBooks(query, format);
  }
}
