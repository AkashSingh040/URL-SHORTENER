const form = document.getElementById("url-form");

const originalUrlInput = document.getElementById("original-url");

const result = document.getElementById("result");
const shortUrl = document.getElementById("short-url");

const errorMessage = document.getElementById("error");

const copyButton = document.getElementById("copy-btn");
const copyMessage = document.getElementById("copy-message");


form.addEventListener("submit", async (event) => {
    event.preventDefault();

    hideMessages();

    const originalUrl = originalUrlInput.value.trim();

    if (!originalUrl) {
        showError("Please enter a URL.");
        return;
    }

    try {
        const response = await fetch("/api/v1/urls", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                originalUrl
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to shorten URL."
            );
        }

        shortUrl.textContent = data.data.shortUrl;
        shortUrl.href = data.data.shortUrl;

        result.classList.remove("hidden");

        originalUrlInput.value = "";

    } catch (error) {
        showError(error.message);
    }
});


copyButton.addEventListener("click", async () => {

    try {
        await navigator.clipboard.writeText(
            shortUrl.textContent
        );

        copyMessage.textContent = "Copied to clipboard!";

    } catch (error) {
        copyMessage.textContent = "Failed to copy URL.";
    }
});


function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}


function hideMessages() {
    errorMessage.classList.add("hidden");

    result.classList.add("hidden");

    copyMessage.textContent = "";
}