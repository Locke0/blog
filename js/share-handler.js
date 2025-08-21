function copyShareUrl(button, url) {
    event.preventDefault(); // Prevent default button action

    let messageDialog = document.getElementById("message");
    let messageText = "Article URL copied to clipboard.";

    // Use Web Share API if available
    if (navigator.share) {
        navigator.share({ url: url }).then(() => {
            // Optional: provide feedback if share dialog is dismissed
        }).catch(err => {
            // User cancelled share or error occurred
            console.error('Web Share API failed or cancelled: ', err);
        });
    }
    // Fallback to Clipboard API
    else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            messageDialog.textContent = messageText;
            messageDialog.setAttribute("open", "");
            setTimeout(() => {
                messageDialog.removeAttribute("open");
            }, 3000);
        }).catch(err => {
            console.error('Failed to copy to clipboard: ', err);
            // Fallback to Twitter if clipboard fails (e.g., not secure context)
            window.open("https://twitter.com/intent/tweet?url=" + encodeURIComponent(url), "_blank");
        });
    }
    // Final fallback to Twitter for very old browsers
    else {
        window.open("https://twitter.com/intent/tweet?url=" + encodeURIComponent(url), "_blank");
    }
}