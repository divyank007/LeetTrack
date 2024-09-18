// background.js

chrome.runtime.onConnect.addListener((port) => {
    console.assert(port.name === "content-script");

    port.onMessage.addListener(async (msg) => {
        if (msg.action === 'saveQuestion') {
            const { questionId, title } = msg;

            chrome.storage.local.get(['authToken'], async (result) => {
                const authToken = result.authToken;

                if (authToken) {
                    try {
                        const response = await fetch('http://localhost:8080/user/add-question', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${authToken}`
                            },
                            body: JSON.stringify({ questionId, title })
                        });

                        if (response.ok) {
                            port.postMessage({ success: true });
                        } else {
                            port.postMessage({ success: false, error: 'Failed to save question' });
                        }
                    } catch (error) {
                        port.postMessage({ success: false, error: 'Network error' });
                    }
                } else {
                    port.postMessage({ success: false, error: 'Token not found in storage' });
                }
            });
        }
    });
});
