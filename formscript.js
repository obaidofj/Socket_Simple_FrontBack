
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
 
// old

// Select the file input element (e.g., using an HTML input with type="file" and multiple attribute)
const fileInput = document.getElementById("fileInput");

// Select the button element to trigger the file selection dialog
const browseButton = document.getElementById("browseButton");

// Add an event listener to handle the button click and trigger file selection
browseButton.addEventListener("click", () => {
  fileInput.click();
});

// Add an event listener to handle file selection
fileInput.addEventListener("change", () => {
  const selectedFiles = fileInput.files;

  // Create a FormData object and append the selected files to it
  const formData = new FormData();
  for (let i = 0; i < selectedFiles.length; i++) {
    formData.append("files", selectedFiles[i]);
  }

  // Send a POST request to the server to upload the selected files
  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        // Handle a successful file upload
        console.log("Files uploaded successfully.");
      } else {
        // Handle an error during file upload
        console.error("File upload failed.");
      }
    })
    .catch((error) => {
      // Handle network or fetch-related errors
      console.error("Fetch error:", error);
    });
});

