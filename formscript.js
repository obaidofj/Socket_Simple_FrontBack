// main.js
document.addEventListener('DOMContentLoaded', function () {
    const chatForm = document.getElementById('chat-form');
    const senderInput = document.getElementById('sender');
    const messageInput = document.getElementById('message');
    const chatMessages = document.getElementById('chat-messages');
  
    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const sender = senderInput.value;
      const message = messageInput.value;
  
      if (!sender || !message) {
        alert('Please enter both sender and message');
        return;
      }
  
      // Send a POST request to your Express API to save the chat message
      fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender, message }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Chat message saved') {
            // Display the message in the chat window
            const li = document.createElement('li');
            li.textContent = `${sender}: ${message}`;
            chatMessages.appendChild(li);
  
            // Clear the message input
            messageInput.value = '';
          }
        })
        .catch((error) => {
          console.error('An error occurred:', error);
        });
    });
  });
  