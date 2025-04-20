document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('userForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;

        const confirmMessage = `Do you want to submit the following information?\nName: ${name}\nAge: ${age}`;

        if (confirm(confirmMessage)) {
            alert('Form submitted successfully');
            this.submit();
        }
    });

    let inactivityTimer;

    function userInactiveFor10Seconds() {
        const inactiveEvent = new Event('userInactive');
        document.dispatchEvent(inactiveEvent);

        alert("You haven't entered any data for 10 seconds!");
    }

    function restartInactivityTimer() {
        clearTimeout(inactivityTimer);

        inactivityTimer = setTimeout(userInactiveFor10Seconds, 10000);
    }

    restartInactivityTimer();

    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');

    nameInput.addEventListener('input', restartInactivityTimer);
    ageInput.addEventListener('input', restartInactivityTimer);

    document.addEventListener('userInactive', function () {
        console.log("User inactive event fired!");
    });
});