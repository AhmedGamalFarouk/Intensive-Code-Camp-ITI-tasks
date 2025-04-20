// =============
// ES6 lab3 :-
// =============
// 1- Create a Simple Promise
// Write a function delayedMessage that returns a Promise that resolves after 3 seconds with the message "Hello, World!".


function delayedMessage() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hello, World!");
        }, 3000);
    });
}
delayedMessage().then(message => {
    console.log(message);
});

//! --------------------------------------------------------------------------------------------------

// 2- Promise Chaining
// Create a function fetchData() that returns a Promise. The promise should resolve after 2 seconds with the string "Data received".
// Then, chain another .then() to convert the string to uppercase.
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data received");
        }, 2000);
    });
}
fetchData()
    .then(data => {
        console.log(data);
        return data.toUpperCase();
    })
    .then(upperCaseData => {
        console.log(upperCaseData);
    });
// !--------------------------------------------------------------------------------------------------

// 3- Handling Promise Rejection
// Modify fetchData() so that it randomly fails with an error message "Network Error".
// If it fails, catch the error and log "Error: Network Error".

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Randomly succeed or fail (roughly 50% chance of each)
            const shouldSucceed = Math.random() > 0.5;

            if (shouldSucceed) {
                resolve("Data received");
            } else {
                reject("Network Error");
            }
        }, 2000);
    });
}

fetchData()
    .then(data => {
        console.log(data);
        return data.toUpperCase();
    })
    .then(upperCaseData => {
        console.log(upperCaseData);
    })
    .catch(error => {
        console.log("Error:", error);
    });
//! --------------------------------------------------------------------------------------------------

// 4- Make an AJAX Request
// => Write a function fetchUsers() that uses XMLHttpRequest to get data from https://jsonplaceholder.typicode.com/users and logs the response.
// => Displays user names in an HTML list (<ul>)in the DOM.

function fetchUsers() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const users = JSON.parse(xhr.responseText);
            console.log(users);

            const userList = document.createElement('ul');

            users.forEach(user => {
                const listItem = document.createElement('li');
                listItem.textContent = user.name;
                userList.appendChild(listItem);
            });

            document.body.appendChild(userList);
        }
    };

    xhr.onerror = function () {
        console.error('Error fetching users');
    };

    xhr.send();
}

fetchUsers();

//! --------------------------------------------------------------------------------------------------

// 5- Fetch Data Using fetch()
// Write a function getPosts() that uses fetch() to retrieve posts from https://jsonplaceholder.typicode.com/posts and logs the first 5 posts.

function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            const firstFivePosts = posts.slice(0, 5);
            console.log(firstFivePosts);
        });
}
getPosts();
//! --------------------------------------------------------------------------------------------------

// 6- Handle Fetch Errors
// Modify getPosts() to handle errors using .catch().
// If the network request fails, log "Error fetching posts".

function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(posts => {
            // Log only the first 5 posts
            const firstFivePosts = posts.slice(0, 5);
            console.log(firstFivePosts);
        })
        .catch(error => {
            console.log("Error fetching posts");
        });
}
getPosts();
//! ---------------------------------------------------------------------------------------------------

// 7- Use async/await with fetch()
// Convert getPosts() to use async/await instead of .then().

async function getPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const posts = await response.json();

        // Log only the first 5 posts
        const firstFivePosts = posts.slice(0, 5);
        console.log(firstFivePosts);
    } catch (error) {
        console.log("Error fetching posts");
    }
}

getPosts();
//! ---------------------------------------------------------------------------------------------------

// 8- Create a Math Module
// => Create a file math.js and export the following functions:
// 	export function add(a, b) { return a + b; }
// 	export function subtract(a, b) { return a - b; }
// => In app.js, import these functions and use them.
//! ---------------------------------------------------------------------------------------------------

// 9- Renaming Imports
// Modify app.js to rename the add function as sum while importing.
//! ---------------------------------------------------------------------------------------------------

// 10- Default Export and Import
// => In logger.js, export a default function that logs a message:
// 	export default function logMessage(msg) {
//  	 	console.log("Log:", msg);
// 	}
// => Import it in app.js with a different name and use it.
// ---------------------------------------------------------------------------------------------------

// 11- Fetch API with Modules
// => Create api.js
// => Export an async function fetchUsers() that fetches user data from https://jsonplaceholder.typicode.com/users.
// => Create app.js
// => Import fetchUsers() and display user names in the console.
// ---------------------------------------------------------------------------------------------------


