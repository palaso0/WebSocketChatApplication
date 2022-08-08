var userName;
var socket = new WebSocket("ws://localhost:8000");

function enter() {
    userName = document.getElementById('userName').value;
    console.log(userName);
    document.getElementById('LoginDiv').style.display = 'none';
    document.getElementById('chatDiv').style.display = 'flex';
    document.getElementById('WelcomeText').innerText = 'Welcome ' + userName;
    document.getElementById("containerForText").display = "block";
    document.getElementById("containerForText").style.position = "fixed";
}

function chatTogle() {
    var x = document.getElementById('chatsView');
    var y = document.getElementById("containerForText");
    if (x.style.display === 'none') {
        x.style.display = 'block';
        y.style.display = 'block';
    } else {
        x.style.display = 'none';
        y.style.display = 'none';
    }
}

function createMessage({ user, text, date, avatar }) {
    if (user == userName) {
        const element = document.createElement('div');
        element.className = 'container container__sended';
        element.innerHTML = `<img
            src="${avatar}"
            alt="Avatar"
            class="right"
        />
        <p class="userUp">${user}</p> 
        <p>${text}</p>
        <span class="time-left">${date}</span>`;
        document.getElementById('chatsView').appendChild(element);
    } else {
        const element = document.createElement('div');
        element.className = 'container container__received';
        element.innerHTML = `<img
            src="${avatar}"
            alt="Avatar"
        />
        <p class="userUp">${user}</p> 
        <p>${text}</p>
        <span class="time-right">${date}</span>`;
        document.getElementById('chatsView').appendChild(element);
    }
}

document.querySelector('#sendMessage').addEventListener('click', () => {
    let user = document.querySelector('#userName').value;
    let text = document.querySelector('#message').value;
    let payload = {
        user,
        text,
        date: new Date(),
        avatar: "https://imagenes.elpais.com/resizer/elGQL0GmeUTR_xUL3rrpOkMVwx8=/1960x1470/filters:focal(1745x609:1755x619)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7G364PMCSFGIHFZNHHJLNQL4SU.jpg"
    };
    socket.send(JSON.stringify(payload));
    return false;
});

socket.onmessage = function(e) {
    console.log(e);
    let response;
    e.data.text().then(data => {
        response = JSON.parse(data)
        createMessage(response);
    });
}
