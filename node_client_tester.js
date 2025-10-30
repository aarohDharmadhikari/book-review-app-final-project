/**
 * Node.js Client Program for Book Review Application
 *
 * This script demonstrates the use of Axios with Promises and Async/Await
 * to interact with the simulated REST API endpoints.
 *
 * NOTE: This script assumes a backend server is running at http://localhost:3000.
 * To run this script, you must have Node.js and the axios package installed:
 *
 * 1. Open your terminal in the folder containing this file.
 * 2. Run: npm install axios
 * 3. Run: node node_client_tester.js
 */

const axios = require('axios');

const API_URL = 'http://localhost:3000'; // Assume API runs locally

// --- Task 10: Get all books – Using async callback function ---
// This pattern simulates an older callback style often wrapped by async/await
const getAllBooksCallback = (callback) => {
    console.log("\n--- Task 10: Get All Books (Async Callback Style) ---");
    // Simulate an API call to /books
    axios.get(`${API_URL}/books`)
        .then(response => {
            // Success: Call the callback with null error and the data
            callback(null, response.data);
        })
        .catch(error => {
            // Error: Call the callback with the error
            callback(error.message, null);
        });
};

// --- Task 11: Search by ISBN – Using Promises ---
const searchByISBNPromise = (isbn) => {
    console.log(`\n--- Task 11: Search by ISBN (${isbn}) (Promises) ---`);
    return new Promise((resolve, reject) => {
        // Simulate an API call to /books/isbn/:isbn
        axios.get(`${API_URL}/books/isbn/${isbn}`)
            .then(response => {
                if (response.data) {
                    resolve(response.data);
                } else {
                    reject(`Book with ISBN ${isbn} not found.`);
                }
            })
            .catch(error => {
                reject(`Error during ISBN search: ${error.message}`);
            });
    });
};

// --- Task 12: Search by Author – Using Async/Await ---
const searchByAuthorAsync = async (author) => {
    console.log(`\n--- Task 12: Search by Author (${author}) (Async/Await) ---`);
    try {
        // Simulate an API call to /books/author/:author
        const response = await axios.get(`${API_URL}/books/author/${author}`);
        return response.data;
    } catch (error) {
        // In a real application, you'd handle specific HTTP error codes (e.g., 404)
        console.error(`Error during Author search: ${error.message}`);
        return []; // Return empty array on failure
    }
};

// --- Task 13: Search by Title – Using Async/Await ---
const searchByTitleAsync = async (title) => {
    console.log(`\n--- Task 13: Search by Title (${title}) (Async/Await) ---`);
    try {
        // Simulate an API call to /books/title/:title
        const response = await axios.get(`${API_URL}/books/title/${title}`);
        return response.data;
    } catch (error) {
        console.error(`Error during Title search: ${error.message}`);
        return []; // Return empty array on failure
    }
};


// --- Execution Wrapper for Demonstration ---
const runTests = async () => {
    // Note: These will only work if a backend API server is actually running.

    // 1. Task 10: Callback-based function call
    getAllBooksCallback((err, data) => {
        if (err) {
            console.error("Task 10 Error:", err);
        } else {
            // Only log a sample of data as the real list might be long
            console.log("Task 10 Result (Partial List):", data.slice(0, 2).map(b => b.title));
        }
    });

    // 2. Task 11: Promise Chain
    searchByISBNPromise("978-0321765723")
        .then(book => {
            console.log("Task 11 Result:", book.title, 'by', book.author);
        })
        .catch(error => {
            console.error("Task 11 Error:", error);
        });
    
    // 3. Task 12: Async/Await
    const authorResults = await searchByAuthorAsync("Austen");
    console.log("Task 12 Result:", authorResults.map(b => b.title));

    // 4. Task 13: Async/Await
    const titleResults = await searchByTitleAsync("Gatsby");
    console.log("Task 13 Result:", titleResults.map(b => b.title));
};

// If you run this file with 'node node_client_tester.js', uncomment the line below:
// runTests(); 

console.log("To run the Node.js client program, please ensure you have 'axios' installed and a backend server running at http://localhost:3000, then run this file using 'node node_client_tester.js'.");

module.exports = {
    getAllBooksCallback,
    searchByISBNPromise,
    searchByAuthorAsync,
    searchByTitleAsync
};
