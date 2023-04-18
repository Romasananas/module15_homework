
let chat = document.querySelector('#chat');
let chatWindow = document.querySelector('#chatWindow');
let sendBtn = document.querySelector('#sendBtn');
let geoLoc = document.querySelector('#geoLoc');
let input = document.querySelector('#input');

sendBtn.innerText = 'Отправить';
geoLoc.innerText = 'Геолокация';


let url = "wss://echo-ws-service.herokuapp.com";
let fromWho;


function writeOnScreen(message) {
    let messageBlock = document.createElement('div');
    let messageText = document.createElement('span');
    messageBlock.classList.add('messageBlock');
    messageText.classList.add('messageText');

    if (fromWho == 'client') {
        messageText.style.float = 'left';
    } else {
        messageText.style.float = 'right';
    }

    messageText.innerText = message;

    messageBlock.appendChild(messageText);
    chatWindow.appendChild(messageBlock);
}

function showGeo(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    let messageBlock = document.createElement('div');
    let mapLink = document.createElement('a');
    messageBlock.classList.add('messageBlock');
    mapLink.classList.add('messageText');
    mapLink.href = `https://www.openstreetmap.org/#map=20/${latitude}/${longitude}`;
    mapLink.target = '_blank';
    mapLink.textContent = 'Моя геопозиция';

    messageBlock.appendChild(mapLink);
    chatWindow.appendChild(messageBlock);      
}

sendBtn.addEventListener('click', (e) => {

    let socket = new WebSocket(url);
    let message = input.value;

    socket.onopen = function(event) {
        fromWho = 'client';
        socket.send(message);
        writeOnScreen(message);
    };

    socket.onmessage = function(event) {
        fromWho = 'server';
        writeOnScreen(`C сервера: ${event.data} `);
        input.value = '';
    };
});

geoLoc.addEventListener('click', (e) => {
    navigator.geolocation.getCurrentPosition(showGeo);
});
