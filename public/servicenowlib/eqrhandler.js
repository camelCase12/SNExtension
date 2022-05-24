function init() {
    console.log("Initializing SN FastTrack");
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
    document.head.appendChild(link);
    markEQRClosed();
  }
function markEQRClosed()
  {
    try{
      //Get document reference inside iframe
      //var iframe = document.getElementById("gsft_main");
      //var innerDocument = iframe.contentWindow.document;

      //Get state dropdown

      var innerDocument = document.getElementsByTagName("macroponent-f51912f4c700201072b211d4d8c26010")[0].shadowRoot.children[0].children[0].children[0].children[0].children['gsft_main'].contentWindow.document
      

      //Focus comments field
      var actualCode = `document.getElementById('activity-stream-comments-textarea').focus()`;//const fireEvent = (element, eventType="focus") => element && element.dispatchEvent(new Event(eventType)); fireEvent(document.getElementById('sys_display.alm_hardware.location'));`;//`if (!this.ac) addLoadEvent(function() {var e = gel('sys_display.alm_hardware.location'); if (!e.ac) new AJAXReferenceCompleter(gel('sys_display.alm_hardware.location'), 'alm_hardware.location', '', ''); e.ac.onFocus();})`;
      var script = innerDocument.createElement('script');
      script.textContent = actualCode;
      (innerDocument.head||innerDocument.documentElement).appendChild(script);
      script.remove();

      setTimeout(function () {
        //Inject an event for focus/blurring element and fire on location element to force server-side form viability update
        var actualCode = `document.getElementById('activity-stream-comments-textarea').focus()`;//const fireEvent = (element, eventType="focus") => element && element.dispatchEvent(new Event(eventType)); fireEvent(document.getElementById('sys_display.alm_hardware.location'));`;//`if (!this.ac) addLoadEvent(function() {var e = gel('sys_display.alm_hardware.location'); if (!e.ac) new AJAXReferenceCompleter(gel('sys_display.alm_hardware.location'), 'alm_hardware.location', '', ''); e.ac.onFocus();})`;
        var script = innerDocument.createElement('script');
        script.textContent = actualCode;
        (innerDocument.head||innerDocument.documentElement).appendChild(script);
        script.remove();

        //Get comments field
        var comments = innerDocument.getElementById("activity-stream-comments-textarea");

        //Insert template
        comments.value = 'Hello,\n\nThis asset has been recovered and the ticket will now be closed.\n\nThank you!';

        var actualCode = `document.getElementById("activity-stream-comments-textarea").dispatchEvent(new Event('input', {bubbles:true}))`;
        var script = innerDocument.createElement('script');
        script.textContent = actualCode;
        (innerDocument.head||innerDocument.documentElement).appendChild(script);
        script.remove();
        

        var state = innerDocument.getElementById("x_wowit_eqr_request.state");
        //Mark complete
        state.value = 3;

        //Inject an event for focus/blurring element and fire on location element to force server-side form viability update
        setTimeout(function () {

          var actualCode = `document.getElementById('sysverb_update').focus()`;//const fireEvent = (element, eventType="focus") => element && element.dispatchEvent(new Event(eventType)); fireEvent(document.getElementById('sys_display.alm_hardware.location'));`;//`if (!this.ac) addLoadEvent(function() {var e = gel('sys_display.alm_hardware.location'); if (!e.ac) new AJAXReferenceCompleter(gel('sys_display.alm_hardware.location'), 'alm_hardware.location', '', ''); e.ac.onFocus();})`;
          var script = innerDocument.createElement('script');
          script.textContent = actualCode;
          (innerDocument.head||innerDocument.documentElement).appendChild(script);
          script.remove();
          //Inject a call for form submission
          setTimeout(function () {
              var actualCode = `document.getElementById('sysverb_update').click()`;
              var script = innerDocument.createElement('script');
              script.textContent = actualCode;
              (innerDocument.head||innerDocument.documentElement).appendChild(script);
              script.remove();
          }, 400);
        }, 200);
    }, 200);
    }
    catch (exception) {
        console.log(exception); //searchBox.dispatchEvent(new KeyboardEvent('keypress', {bubbles: true, cancelable: true, keyCode: 13}));
    }
  }
  init();