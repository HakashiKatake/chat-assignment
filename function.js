export function initChat(db) {
    const chatRef = db.ref('chat');

    // Listen for new messages
    function setupMessageListener() {
        chatRef.on('child_added', (snapshot) => {
            const message = snapshot.val().message;
            const messageId = snapshot.key;
            
            // Create message container
            let messageDiv = document.createElement('div');
            messageDiv.setAttribute('data-id', messageId);
            messageDiv.classList.add('message-container');
            
            // Create message elements
            let pTag = document.createElement('p');
            let editButtonTag = document.createElement('button');
            let deleteButtonTag = document.createElement('button');
            
            pTag.innerText = `Message: ${message}`;
            editButtonTag.innerText = "edit";
            deleteButtonTag.innerText = "delete";
            
            // Add delete functionality
            deleteButtonTag.addEventListener('click', () => {
                deleteMessage(messageId);
            });
            
            // Add to message container
            messageDiv.appendChild(pTag);
            messageDiv.appendChild(editButtonTag);
            messageDiv.appendChild(deleteButtonTag);
            
            // Add to chat container
            let chatContainer = document.getElementById('chat');
            chatContainer.appendChild(messageDiv);
        });

        // Listen for removed messages
        chatRef.on('child_removed', (snapshot) => {
            const messageId = snapshot.key;
            const messageElement = document.querySelector(`[data-id="${messageId}"]`);
            if (messageElement) {
                messageElement.remove();
            }
        });
    }

    // Function to send a new message
    function sendMessage(message) {
        return chatRef.push({
            message: message,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    }

    // Return the public functions
    return {
        setupMessageListener,
        sendMessage
    };
}