function init() {
  console.log("Initializing SN FastTrack");
  var link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
  document.head.appendChild(link);

  let iframe = document.getElementsByTagName("macroponent-f51912f4c700201072b211d4d8c26010")[0].shadowRoot.getElementById("gsft_main");
  let innerDocument = iframe.contentWindow.document;

  findAsset(innerDocument).then(() => {
    assetDiscovery(innerDocument).then(() => {
      markInStockUsed();
    })
  });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function assetFound(innerDocument) {
  var iframe = document.getElementsByTagName("macroponent-f51912f4c700201072b211d4d8c26010")[0].shadowRoot.getElementById("gsft_main");
  innerDocument = iframe.contentWindow.document;
  var assetEntry = null;
  assetEntry = innerDocument.querySelector("a.linked.formlink");
  if(assetEntry) {
    if(assetEntry.attributes['1'].value.includes(assetSerial.toUpperCase())) {
      return true;
    }
  }
  return false;
}

async function assetDiscovery(innerDocument) {
  //Look for asset in table for 6 seconds
  var counter = 0;
  while(!assetFound(innerDocument)) {
    await sleep(200);
    console.log("Checking for asset...");
    counter++;
    if(counter > 30) {
      throw new Error("Asset table checking timed out");
    }
  }
  console.log("found asset! moving on to page...");

  //Update innerDocument
  iframe = document.getElementsByTagName("macroponent-f51912f4c700201072b211d4d8c26010")[0].shadowRoot.getElementById("gsft_main");
  innerDocument = iframe.contentWindow.document;

  //Click on entry
  assetEntry = innerDocument.querySelector("a.linked.formlink");
  assetEntry.click();
}

async function findAsset(innerDocument) {
    //Set serial in searchbar
    var searchBox = innerDocument.querySelector(`[id$="_text"]`);
    searchBox.value = assetSerial;
    searchBox.focus();

    //Trigger enter key
    await sleep(200);
    searchBox.dispatchEvent(new KeyboardEvent('keydown', {bubbles: true, cancelable: true, keyCode: 13}));
    searchBox.dispatchEvent(new KeyboardEvent('keyup', {bubbles: true, cancelable: true, keyCode: 13}));
    searchBox.dispatchEvent(new KeyboardEvent('keypress', {bubbles: true, cancelable: true, keyCode: 13}));
}

function checkAssetPageLoad() {
  var iframe = document.getElementsByTagName("macroponent-f51912f4c700201072b211d4d8c26010")[0].shadowRoot.getElementById("gsft_main");
  var innerDocument = iframe.contentWindow.document;

  if(innerDocument.getElementById("alm_hardware.do")) {
    return true;
  }
  return false;
}

async function markInStockUsed()
{
  while(!checkAssetPageLoad()) {
    await sleep(200);
    console.log("Waiting for asset page load...");
  }

  //Give extra functions time to get page cleaned up
  await sleep(400);

  console.log("Asset page loaded. Marking asset in stock");
  try{
    //Get document reference inside iframe
    var iframe = document.getElementsByTagName("macroponent-f51912f4c700201072b211d4d8c26010")[0].shadowRoot.getElementById("gsft_main");
    var innerDocument = iframe.contentWindow.document;

    //Get the "State" dropdown
    var installState = innerDocument.getElementById("alm_hardware.install_status");
    //19 -> In recovery, 18 -> Legal Hold, 6 -> In Stock, 1 -> Installed, 3 -> In Maintenance, 7 -> Retired
    //console.log(installState);

    //Change "State" value to 6, meaning "In Stock"
    installState.value = 6;

    //Inject a call to onChange which causes the website to change the "Substate" menu to the one which contains "New" and "Used" options
    var actualCode = `onChange("alm_hardware.install_status", false)`;
    var script = innerDocument.createElement('script');
    script.textContent = actualCode;
    (innerDocument.head||innerDocument.documentElement).appendChild(script);
    script.remove();

    //Get the "Substate" dropdown
    var substate = innerDocument.getElementById("alm_hardware.substatus");
    //'' or 'new' or 'used'

    console.log("Waiting for dropdown change...")
    waitForDropdownChange(innerDocument, function(){
      console.log("Dropdown changed.");
      //Set "Substate" value to "used" (Not sure why this is a string and the other is a number?)
      substate.value = "used";

      //Inject a call to onChange which causes the website to recognize the change to substate and remove the red star
      var actualCode = `onChange("alm_hardware.substatus", false)`;
      var script = innerDocument.createElement('script');
      script.textContent = actualCode;
      (innerDocument.head||innerDocument.documentElement).appendChild(script);
      script.remove();

      //Get the "Location" element
      var location = innerDocument.getElementById("sys_display.alm_hardware.location");

      //Set "Location" element to "701 - Service Desk"
      location.value = "701 - Service Desk";

      //Inject a call to onChange which causes the website to recognize the change to location and remove any red highlighting
      var actualCode = `onChange("alm_hardware.location")`;
      var script = innerDocument.createElement('script');
      script.textContent = actualCode;
      (innerDocument.head||innerDocument.documentElement).appendChild(script);
      script.remove();

      //Inject an event for focus/blurring element and fire on location element to force server-side form viability update
      var actualCode = `document.getElementById('sys_display.alm_hardware.location').focus()`;//const fireEvent = (element, eventType="focus") => element && element.dispatchEvent(new Event(eventType)); fireEvent(document.getElementById('sys_display.alm_hardware.location'));`;//`if (!this.ac) addLoadEvent(function() {var e = gel('sys_display.alm_hardware.location'); if (!e.ac) new AJAXReferenceCompleter(gel('sys_display.alm_hardware.location'), 'alm_hardware.location', '', ''); e.ac.onFocus();})`;
      var script = innerDocument.createElement('script');
      script.textContent = actualCode;
      (innerDocument.head||innerDocument.documentElement).appendChild(script);
      script.remove();

      //Copy serial number
      setTimeout(function () {
        var actualCode = `document.getElementById('alm_hardware.serial_number').focus(); document.getElementById('alm_hardware.serial_number').select(); document.execCommand('copy');`;//const fireEvent2 = (element, eventType="focus") => element && element.dispatchEvent(new Event(eventType)); fireEvent2(document.getElementById('sysverb_update'));`;
        var script = innerDocument.createElement('script');
        script.textContent = actualCode;
        (innerDocument.head||innerDocument.documentElement).appendChild(script);
        script.remove();
      }, 100);

      //Inject a confirm disable/automation function
      setTimeout(function () {
        var actualCode = `window.confirm = function confirm(msg) { console.log("Hidden Confirm " + msg); return true; };`;
        var script = innerDocument.createElement('script');
        script.textContent = actualCode;
        (innerDocument.head||innerDocument.documentElement).appendChild(script);
        script.remove();
      }, 200);

      //Inject a call for form submission
      setTimeout(function () {
        var actualCode = `document.getElementById('sysverb_update').click()`;
        var script = innerDocument.createElement('script');
        script.textContent = actualCode;
        (innerDocument.head||innerDocument.documentElement).appendChild(script);
        script.remove();
      }, 600);
    });
  }
  catch (exception) {
      console.log(exception);
  }
}
init();

function waitForDropdownChange(innerDocument, callback) {
  var startTimeInMs = Date.now();
  var options = innerDocument.getElementById("alm_hardware.substatus");

  (function loopSearch() {
    var hasUsed = false;
    for(let i = 0; i < options.length; i++) {
      if(options[i].value=="used") {
        hasUsed = true;
        break;
      }
    }
    if (hasUsed) {
      callback();
      return;
    }
    else {
      console.log("Failed to recognize dropdown change. Trying again...");
      setTimeout(function () {
        if (2000 && Date.now() - startTimeInMs > 2000)
          return;
        loopSearch();
      }, 50);
    }
  })();
}