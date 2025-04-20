import { add as sum, subtract } from './math.js';
import customLogger from './logger.js';
import { fetchUsers } from './api.js';

console.log('Addition result using sum:', add(10, 5));
console.log('Addition result using sum:', sum(10, 5));
console.log('Subtraction result:', subtract(10, 5));


customLogger('This is a message from the logger');


async function displayUsers() {
    const users = await fetchUsers();


    users.forEach(user => {
        console.log(`User: ${user.name}`);
    });
}


displayUsers();