const socket = io();

const form = document.getElementById('chatForm');
const input = document.getElementById('messageInput');
const messages = document.getElementById('messages');

function addMessage(data, isSender) {
    const item = document.createElement('li');
    const messageDiv = document.createElement('div');
    const ipDiv = document.createElement('div');
    
    messageDiv.textContent = data.message;
    ipDiv.textContent = `IP: ${data.ip || '-'}`;
    ipDiv.className = 'sender-ip';
    
    item.appendChild(messageDiv);
    item.appendChild(ipDiv);
    item.className = isSender ? 'sent' : 'received';
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (message) {
        const messageData = {
            message: message,
            sender: socket.id
        };
        socket.emit('chatMessage', messageData);
        addMessage(messageData, true);
        input.value = '';
    }
});

socket.on('chatMessage', (data) => {
    if (data.sender !== socket.id) {
        addMessage(data, false);
    }
});