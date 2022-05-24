function init() {
    chrome.commands.onCommand.addListener((command) => {
        console.log(`Command "${command}" called`);
        chrome.tabs.executeScript({
            code: 'var config = ' + JSON.stringify(config)
          }, function() {
            chrome.tabs.executeScript({
              file: 'servicenowlib/servicenowlib.js'
            });
          });
    });
}