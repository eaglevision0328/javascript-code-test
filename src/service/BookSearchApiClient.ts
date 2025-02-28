import axios from "axios";
import { API_ENDPOINTS } from "../constants/api";
import { Book, ApiBookResponse, FormattedBook, ErrorMes } from "../constants/interface";

export class BookSearchApiClient {
  private baseUrl = API_ENDPOINTS.SEARCH_BY_AUTHOR;

  async getBooks(query: Record<string, string | number>, format: "json" | "xml"): Promise<FormattedBook[] | ErrorMes> {
    try {
      const response = await axios.get<ApiBookResponse>(this.baseUrl, {
        params: { ...query, format },
        headers: { "Content-Type": "application/json" },
      });

      return format === "json" ? this.formatJson(response.data) : this.formatXml(response.data);
    } catch (error: any) {
      console.error("API request failed:", error.message);
      return { message: "Failed to fetch books", status: error.response?.status || 500 };
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
