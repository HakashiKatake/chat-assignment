function deleteMessage(id) {
    db.ref('chat/' + id).remove()
        .then(() => {
            console.log("Message successfully deleted!");
        })
        .catch((error) => {
            console.error("Error removing message:", error);
        });
}

window.deleteMessage = deleteMessage;