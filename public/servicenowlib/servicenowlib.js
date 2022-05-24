function init() {
    console.log("Initializing instock marker");
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
    document.head.appendChild(link);
    markInStockUsed();
  }
function markInStockUsed()
  {
    try{
      //Get document reference inside iframe
      var iframe = document.getElementsByTagName("macroponent-f51912f4c700201072b211d4d8c26010")[0].shadowRoot.getElementById("gsft_main")
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
        }, 100);

        //Inject a call for form submission
        setTimeout(function () {
          var actualCode = `document.getElementById('sysverb_update').click()`;
          var script = innerDocument.createElement('script');
          script.textContent = actualCode;
          (innerDocument.head||innerDocument.documentElement).appendChild(script);
          script.remove();
        }, 750);
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