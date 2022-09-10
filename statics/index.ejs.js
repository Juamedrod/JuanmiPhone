const chatRef = document.querySelector('.chat');
const inputChat = document.getElementById('inputChat');

const chatArr = [{ user: 'bot', message: 'Bienvenido a JuanmiPhone, ¿en qué puedo ayudarte?' }];

for (const chat of chatArr) {
    chatRef.innerHTML += `<p class=${chat.user}>${chat.message}</p>`;
}

inputChat.addEventListener('change', addChatMessage);

async function addChatMessage(event) {
    console.log(event.target.value);
    chatArr.push({ user: 'user', message: event.target.value });
    const body = JSON.stringify({ input: event.target.value });
    const response = await fetch('/chatbot',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        });
    const data = await response.json();
    inputChat.value = '';
    console.log(data);
    const botResponse = data.answer ? data.answer : "No he entendido lo que me quieres decir.";
    chatArr.push({ user: 'bot', message: botResponse });
    chatRef.innerHTML = '';
    for (const chat of chatArr) {
        chatRef.innerHTML += `<p class=${chat.user}>${chat.message}</p>`;
    }
}