//! Update your cookie.js library file to handle any possible

//! wrong call of all implemented function by firing error message.

//! e.g there should be an error message if getCookie was called

//! without passing any parameter or with more than one parameter

function getCookie(cookieName) {
    if (arguments.length !== 1) {
        throw new Error('getCookie requires exactly 1 parameter');
    }
    if (typeof cookieName !== 'string' || cookieName.trim() === '') {
        throw new Error('cookieName must be a non-empty string');
    }
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + '=')) {
            return cookie.substring(cookieName.length + 1);
        }
    }
    return null;
}

function setCookie(cookieName, cookieValue, expiryDate) {
    if (arguments.length < 2 || arguments.length > 3) {
        throw new Error('setCookie requires 2 or 3 parameters');
    }
    if (typeof cookieName !== 'string' || cookieName.trim() === '') {
        throw new Error('cookieName must be a non-empty string');
    }
    if (typeof cookieValue !== 'string') {
        throw new Error('cookieValue must be a string');
    }
    if (expiryDate && !(expiryDate instanceof Date)) {
        throw new Error('expiryDate must be a Date object');
    }
    let cookieString = cookieName + '=' + cookieValue;
    if (expiryDate) {
        cookieString += '; expires=' + expiryDate.toUTCString();
    }
    document.cookie = cookieString;
}

function deleteCookie(cookieName) {
    if (arguments.length !== 1) {
        throw new Error('deleteCookie requires exactly 1 parameter');
    }
    if (typeof cookieName !== 'string' || cookieName.trim() === '') {
        throw new Error('cookieName must be a non-empty string');
    }
    document.cookie = cookieName + '=; expires=Sat, 01 Mar 2025 00:00:00 UTC; path=/;';

}

function allCookieList() {
    if (arguments.length !== 0) {
        throw new Error('allCookieList does not accept any parameters');
    }
    const cookies = document.cookie.split(';');
    const cookieList = [];
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        cookieList.push(cookie);
    }
    return cookieList;
}

function hasCookie(cookieName) {
    if (arguments.length !== 1) {
        throw new Error('hasCookie requires exactly 1 parameter');
    }
    if (typeof cookieName !== 'string' || cookieName.trim() === '') {
        throw new Error('cookieName must be a non-empty string');
    }
    return getCookie(cookieName) !== null;
}