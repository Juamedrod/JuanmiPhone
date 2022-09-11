const chatRef = document.querySelector('.chat');
const inputChat = document.getElementById('inputChat');
const preRef = document.getElementById('result');

const chatArr = [{ user: 'bot', message: 'Bienvenido a JuanmiPhone, ¿en qué puedo ayudarte?' }];
let intent = 'app.hi';

for (const chat of chatArr) {
    chatRef.innerHTML += `<p class=${chat.user}>${chat.message}</p>`;
}

inputChat.addEventListener('change', addChatMessage);

async function addChatMessage(event) {
    console.log(event.target.value);
    chatArr.push({ user: 'user', message: event.target.value });
    const body = JSON.stringify({ input: event.target.value });
    let response;
    switch (intent) {
        case "app.bonos":
            response = await fetch('/get_bonos',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body
                });
            break;

        case "app.saldo":
            response = await fetch('/get_saldo',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body
                });
            break;

        default:
            response = await fetch('/chatbot',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body
                });
            break;
    }
    const data = await response.json();
    inputChat.value = '';
    console.log(data);
    intent = data.intent;
    const botResponse = data.answer ? data.answer : "No he entendido lo que me quieres decir.";
    chatArr.push({ user: 'bot', message: botResponse });
    chatRef.innerHTML = '';
    preRef.innerHTML = JSON.stringify(data, null, 4);
    for (const chat of chatArr) {
        chatRef.innerHTML += `<p class=${chat.user}>${chat.message}</p>`;
    }
}