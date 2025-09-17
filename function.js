export function initChat(db) {
    const chatRef = db.ref('chat');

    
    function setupMessageListener() {
        chatRef.on('child_added', (snapshot) => {
            const message = snapshot.val().message;
            const messageId = snapshot.key;
            
           
            let messageDiv = document.createElement('div');
            messageDiv.setAttribute('data-id', messageId);
            messageDiv.classList.add('message-container');
            
            
            let pTag = document.createElement('p');
            let editButtonTag = document.createElement('button');
            let deleteButtonTag = document.createElement('button');
            
            pTag.innerText = `Message: ${message}`;
            editButtonTag.innerText = "edit";
            deleteButtonTag.innerText = "delete";
            

            deleteButtonTag.addEventListener('click', () => {
                deleteMessage(messageId);
            });
            
            
            messageDiv.appendChild(pTag);
            messageDiv.appendChild(editButtonTag);
            messageDiv.appendChild(deleteButtonTag);
            
            
            let chatContainer = document.getElementById('chat');
            chatContainer.appendChild(messageDiv);
        });

       
        chatRef.on('child_removed', (snapshot) => {
            const messageId = snapshot.key;
            const messageElement = document.querySelector(`[data-id="${messageId}"]`);
            if (messageElement) {
                messageElement.remove();
            }
        });
    }

   
    function sendMessage(message) {
        return chatRef.push({
            message: message,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    }

   
    return {
        setupMessageListener,
        sendMessage
    };
}