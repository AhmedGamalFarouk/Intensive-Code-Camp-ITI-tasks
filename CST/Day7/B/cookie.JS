// Make your own .js file that should have the following functions:
// • getCookie(cookieName):
// o Retrieves a cookie value based on a cookie name.
// • setCookie(cookieName,cookieValue[,expiryDate]):
// o Sets a cookie based on a cookie name, cookie value,
// and expiration date.
// • deleteCookie(cookieName):
// o Deletes a cookie based on a cookie name.
// • allCookieList():
// o returns a list of all stored cookies
// • hasCookie(cookieName):
// o Check whether a cookie exists or not

function getCookie(cookieName) {
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
    let cookieString = cookieName + '=' + cookieValue;
    if (expiryDate) {
        cookieString += '; expires=' + expiryDate.toUTCString();
    }
    document.cookie = cookieString;
}

function deleteCookie(cookieName) {
    document.cookie = cookieName + '=; expires=Sat, 01 Mar 2025 00:00:00 UTC; path=/;';
}
function allCookieList() {
    const cookies = document.cookie.split(';');
    const cookieList = [];
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        cookieList.push(cookie);
    }
    return cookieList;
}

function hasCookie(cookieName) {
    return getCookie(cookieName) !== null;
}

// Function to save form data to cookies when submit button is clicked
window.onload = function () {
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent form submission

            const name = document.getElementById('name').value;
            const age = document.getElementById('age').value;

            let gender = '';
            const maleRadio = document.getElementById('male');
            const femaleRadio = document.getElementById('female');
            if (maleRadio && maleRadio.checked) {
                gender = 'male';
            } else if (femaleRadio && femaleRadio.checked) {
                gender = 'female';
            }

            const favColor = document.getElementById('favColor').value;

            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 7);

            setCookie('userName', name, expiryDate);
            setCookie('userAge', age, expiryDate);
            setCookie('userGender', gender, expiryDate);
            setCookie('userFavColor', favColor, expiryDate);

            alert('Information saved successfully!');

            window.location.href = 'profilePage.html';
        });
    }
}