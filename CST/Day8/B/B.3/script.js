function generateCard() {
    const selectedCard = document.querySelector('input[name="gallery-image"]:checked');
    if (!selectedCard) {
        alert('Please select a card first!');
        return;
    }

    const imgElement = selectedCard.nextElementSibling.querySelector('img');
    const fullSrc = imgElement.src;
    const cardSrc = imgElement.getAttribute('src');
    console.log('Card source being saved:', cardSrc);

    const personalMessage = document.getElementById('personal-message').value;
    console.log('Message being saved:', personalMessage);

    const encodedCardSrc = encodeURIComponent(cardSrc);
    const encodedMessage = encodeURIComponent(personalMessage);

    window.location.href = `cardPage.html?cardSrc=${encodedCardSrc}&message=${encodedMessage}`;
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function loadCardData() {
    const selectedCardSrc = getUrlParameter('cardSrc');
    const personalMessage = getUrlParameter('message');

    console.log('Selected Card Source:', selectedCardSrc);
    console.log('Personal Message:', personalMessage);

    if (selectedCardSrc) {
        document.getElementById('selected-card').src = selectedCardSrc;
    } else {
        console.error('No card source found in URL parameters');
    }

    if (personalMessage) {
        document.getElementById('personal-message').textContent = personalMessage;
    } else {
        document.getElementById('personal-message').textContent = 'No personal message provided.';
        console.log('No personal message found in URL parameters');
    }
}

if (window.location.href.includes('cardPage.html')) {
    window.onload = loadCardData;
}