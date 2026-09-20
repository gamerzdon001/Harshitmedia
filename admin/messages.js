document.addEventListener("DOMContentLoaded", function () {

    const messagesList = document.querySelector(".messages-list");

    if (!messagesList) {
        return;
    }

    const messages = JSON.parse(
        localStorage.getItem("clientMessages") || "[]"
    );

    if (messages.length === 0) {
        return;
    }

    messagesList.innerHTML = "";

    messages.forEach(function (message) {

        const messageCard = document.createElement("div");

        messageCard.className = "message-card";

        messageCard.innerHTML = `
            <h3>${message.name || "Client"}</h3>
            <p>${message.email || ""}</p>
            <p>${message.message || ""}</p>
            <button onclick="deleteMessage(this)">
                Delete
            </button>
        `;

        messagesList.appendChild(messageCard);
    });

});
function logout() {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "index.html";
}
function deleteMessage(button) {

    const card = button.closest(".message-card");

    if (card) {
        card.remove();
    }
}
