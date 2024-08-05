chrome.action.onClicked.addListener((tab) => {
    // Change the icon to the "open" version
    chrome.action.setIcon({
      path: {
        "16": "icons/icon16_open.png",
        "48": "icons/icon48_open.png",
        "128": "icons/icon128_open.png"
      }
    });
  
    // Execute the script to prefix the URL
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: prefixAndOpenUrl
      }
    );
  
    // Revert the icon back after 2 seconds
    setTimeout(() => {
      chrome.action.setIcon({
        path: {
          "16": "icons/icon16.png",
          "48": "icons/icon48.png",
          "128": "icons/icon128.png"
        }
      });
    }, 2000);
  });
  
  function prefixAndOpenUrl() {
    const currentUrl = window.location.href;
    const newUrl = `https://r.jina.ai/${currentUrl}`;
    chrome.runtime.sendMessage({ action: 'open-new-tab', url: newUrl });
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'open-new-tab') {
      chrome.tabs.create({ url: request.url });
    }
  });
  