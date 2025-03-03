# Javascript Code Test

# 📚 BookSearch API Client
A **TypeScript-based book search client** that fetches book data from a remote API and supports **both JSON and XML formats**.  
Includes a **Jest test suite** and a **GitHub Actions CI/CD pipeline** for continuous integration.

 * Interface-based API extensibility
 * Strategy pattern to manage different APIs
 * Factory pattern for handling multiple API providers
 * Adapter pattern to normalize different API response formats
 * Support for multiple query types (author, publisher, year)
 * Unit tests with Jest
 * CI/CD with GitHub Actions

---
# 👨‍💻 Contributors
### Name-Git account (Danyl Goodall - eaglevision0328)
  Feel free to open a pull request! 🚀

# **📚 FAQ**
### **1️. How could you easily add other book seller APIs in the future?**
This project follows a **Factory Pattern**, allowing **new API providers** to be added **without modifying core logic**. Implement a new class that extends BookSearchAPI.

### **2️. How would you manage differences in response payloads between different APIs?**
This project uses an Adapter Pattern, which transforms responses into a common **FormattedBook[]** structure. This avoids modifying the client code.
### **3. How would you implement different query types (author, publisher, year, etc.)?**
This project dynamically builds correct API query URL based on the provided search parameters.
No hardcoded conditions.
### **4. FAQ - How Your Code Would Be Tested?**
This project uses Jest for unit testing and GitHub Actions for continuous integration.


---
---
---
<br>
<br>

`BookSearchApiClient` is a simple class that makes a call to a http API to retrieve a list of books and return them.

You need to refactor the `BookSearchApiClient` class, and demonstrate in `example-client.js` how it would be used. Refactor to what you consider to be production ready code. You can change it in anyway you would like and can use javascript or typescript.

Things you will be asked about:

1. How could you easily add other book seller APIs in the the future
2. How would you manage differences in response payloads between different APIs without needing to make future changes to whatever code you have in example-client.js
3. How would you implement different query types for example: by publisher, by year published etc
4. How your code would be tested
