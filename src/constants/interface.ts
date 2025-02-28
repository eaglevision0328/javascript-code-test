export type Book = {
  book: {
    title: string;
    author: string;
    isbn: string;
  };
  stock: {
    quantity: string;
    price: string;
  };
};
  
export type FormattedBook = {
  title: string;
  author: string;
  isbn: string;
  quantity: number;
  price: number;
};

export type ApiBookResponse = {
  data: Book[];
  status: number;
};

export type ErrorMes = {
  message: string;
  status: number;
};

export interface BookSearchAPI {
  getBooks(query: Record<string, string | number>, format: "json" | "xml"): Promise<FormattedBook[] | ErrorMes>;
}
  