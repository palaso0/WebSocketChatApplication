var userName;
function enter() {
    userName = document.getElementById('userName').value;
    console.log(userName);
    document.getElementById('LoginDiv').style.display = 'none';
    document.getElementById('chatDiv').style.display = 'flex';
    document.getElementById('WelcomeText').innerText = 'Welcome ' + userName;
    console.log('Welcome: ' + userName);
    document.getElementsByClassName('chatView').style.display = 'flex';
}

function chatTogle() {
    var x = document.getElementById('chatsView');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}
