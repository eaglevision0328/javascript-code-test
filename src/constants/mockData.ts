import { ApiBookResponse } from "./interface";

export const mockBookResponse: ApiBookResponse = {
  data: [
    {
      book: {
        title: "Test_title",
        author: "Shakespeare_test",
        isbn: "123456789",
      },
      stock: {
        quantity: "10",
        price: "30.5",
      },
    },
    {
      book: {
        title: "Test1_title",
        author: "Shakespeare_test1",
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
            <title>Macbeth</title>
            <author>William Shakespeare</author>
            <isbn>123456789</isbn>
        </book>
        <stock>
            <quantity>2</quantity>
            <price>9.99</price>
        </stock>
    </data>
    <data>
        <book>
            <title>Richard II</title>
            <author>William Shakespeare</author>
            <isbn>123456780</isbn>
        </book>
        <stock>
            <quantity>9</quantity>
            <price>11.99</price>
        </stock>
    </data>
    <status>200</status>
</root>`;
