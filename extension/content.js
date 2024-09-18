// content.js

const port = chrome.runtime.connect({ name: "content-script" });

const saveQuestion = () => {
    const questionElement = document.querySelector('a[href*="/problems/"]');
    if (!questionElement) {
        alert('Problem element not found');
        return;
    }

    const questionTitle = questionElement.innerText;
    const questionUrl = window.location.href;

    port.postMessage({
        action: 'saveQuestion',
        questionId: questionUrl.split('/').pop(), // Assuming questionId is derived from URL
        title: questionTitle
    });

    port.onMessage.addListener((response) => {
        if (response.success) {
            alert('Question saved successfully!');
        } else {
            const errorMsg = response.error || 'Unknown error';
            alert(`Error saving question: ${errorMsg}`);
        }
    });
};

// Create and append the Save Question button to the page
const button = document.createElement('button');
button.innerText = 'Save Question';
button.style.position = 'fixed';
button.style.top = '10px';
button.style.right = '10px';
button.style.zIndex = '1000';
button.addEventListener('click', saveQuestion);

document.body.appendChild(button);
