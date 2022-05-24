/*global chrome*/
import React, { Component } from 'react';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
          uniqueCode: `<cheta>`,
          inputs: {
            priceperword: '0.05'
          }
        }
      }
      handleInputChange = event => {
        const { name, value } = event.target;
        var inputs = this.state.inputs;
        inputs[name] = value;
        this.setState({
          inputs: inputs
        })
      }
      render() {
        return (
          <div>
            <div className="header">
              <h1>SN FastTrack</h1>
              <p>Chrome Extension for Macroing ServiceNow</p>
            </div>
            <div className="contentBox">
              <div className="no-tf-dtctd">
                <p>Choose an option to run the corresponding automation</p>
                <a href="#" onClick={this.handleClick}>Mark In Stock - 701</a>
                <br></br>
                <br></br>
                <a href="#" onClick={this.handleClick2}>Close EQR</a>
                <br></br>
                <br></br>
                <a href="#" onClick={this.handleClick3}>Process Asset</a>
                <br></br>
                <br></br>
                <input id="assetSerial"></input>
              </div>
            </div>
          </div>
        )
      };
    handleClick = () => {
      var config = {
        code: this.state.uniqueCode
      };
  var css = "@import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap'); #cheta-flt-dv { padding: 8px; z-index: 999; position: fixed; width: 140px; bottom: 40%; right: 40px; background-color: #B0FF8B; color: black; border-radius: 20px; text-align: center; box-shadow: 2px 2px 3px #999; } .cheta-flt-p { margin: 2px; font-family: 'Special Elite'; font-size: 22px; } .cheta-pfnt { margin: 2px; font-family: 'Special Elite'; font-size: 14px; }";
      chrome.tabs.insertCSS({code: css});
    chrome.tabs.executeScript({
        code: 'var config = ' + JSON.stringify(config)
      }, function() {
        window.close();
        chrome.tabs.executeScript({
          file: 'servicenowlib/servicenowlib.js'
        });
      })
  }
  handleClick2 = () => {
      var config = {
        code: this.state.uniqueCode
      };
    var css = "@import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap'); #cheta-flt-dv { padding: 8px; z-index: 999; position: fixed; width: 140px; bottom: 40%; right: 40px; background-color: #B0FF8B; color: black; border-radius: 20px; text-align: center; box-shadow: 2px 2px 3px #999; } .cheta-flt-p { margin: 2px; font-family: 'Special Elite'; font-size: 22px; } .cheta-pfnt { margin: 2px; font-family: 'Special Elite'; font-size: 14px; }";
      chrome.tabs.insertCSS({code: css});
    chrome.tabs.executeScript({
        code: 'var config = ' + JSON.stringify(config)
      }, function() {
        window.close();
        chrome.tabs.executeScript({
          file: 'servicenowlib/eqrhandler.js'
        });
      })
  }
  handleClick3 = () => {
    var config = {
      code: this.state.uniqueCode
    };
  var css = "@import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap'); #cheta-flt-dv { padding: 8px; z-index: 999; position: fixed; width: 140px; bottom: 40%; right: 40px; background-color: #B0FF8B; color: black; border-radius: 20px; text-align: center; box-shadow: 2px 2px 3px #999; } .cheta-flt-p { margin: 2px; font-family: 'Special Elite'; font-size: 22px; } .cheta-pfnt { margin: 2px; font-family: 'Special Elite'; font-size: 14px; }";
    chrome.tabs.insertCSS({code: css});
  chrome.tabs.executeScript({
      code: 'var config = ' + JSON.stringify(config) + ';' + ' var assetSerial = \"' + document.getElementById("assetSerial").value + '\";'
    }, function() {
      window.close();
      chrome.tabs.executeScript({
        file: 'servicenowlib/processasset.js'
      });
    })
    
}
}
export default Home;