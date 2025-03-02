import { ApiBookResponse } from "./interface";

export const mockBookResponse: ApiBookResponse = {
  data: [
    {
      book: {
        title: "Hamlet",
        author: "William Shakespeare",
        isbn: "123456789",
      },
      stock: {
        quantity: "10",
        price: "30.5",
      },
    },
    {
      book: {
        title: "Romeo and Juliet",
        author: "William Shakespeare",
        isbn: "123456788",
      },
      stock: {
        quantity: "5",
        price: "25.5",
      },
    },
  ],
  status: 200,
};

export const xmlBookResponse: string = `<?xml version="1.0" encoding="UTF-8" ?>
<root>
    <data>
        <book>
            <title>Hamlet</title>
            <author>William Shakespeare</author>
            <isbn>123456789</isbn>
        </book>
        <stock>
            <quantity>10</quantity>
            <price>30.5</price>
        </stock>
    </data>
    <data>
        <book>
            <title>Romeo and Juliet</title>
            <author>William Shakespeare</author>
            <isbn>123456788</isbn>
        </book>
        <stock>
            <quantity>5</quantity>
            <price>25.5</price>
        </stock>
    </data>
    <status>200</status>
</root>`;

export const formattedBookResponse = [
  {
    title: "Hamlet",
    author: "William Shakespeare",
    isbn: "123456789",
    quantity: 10,
    price: 30.5,
  },
  {
    title: "Romeo and Juliet",
    author: "William Shakespeare",
    isbn: "123456788",
    quantity: 5,
    price: 25.5,
  },
];
