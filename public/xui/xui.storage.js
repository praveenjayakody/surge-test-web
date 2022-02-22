/*
	Storage wrapper for $XUI
	Version:1.1.2
	Author:Praveen K.J.
	Description:
         + Wraps the basic localStorage API to allow the use of settings method
         + Extends $x using $x.constructor.prototype.storage...
    Usage: $x.storage.<x>
*/
/*
    LOG.md
    ----------------------
    ## 28Jun2014
    * Currently only supports web local storage
    ## 30Jun2014
    * Changed mcqmaker root key method to unarranged method (settings is on root level with other data)
        + mcqmaker root key method is cumbersome
    * Renamed to xui.storage.js and moved to PLUGINS\XUI folder
    ## 20Jul2014
    * CANCELLED adding chrome.storage support since that api is async and can't be fit into this method (a sync api)
    
    ## 06Sept2014
    * Changed the `storage.load()` function so that when other storage (not 'settings') is loaded no error occurs even if 'settings' store are isn't empty
        + Error was because during loop iteration, 'settings' element skipped means a number was also skipped in `arrStore`
    * NEW VERSION 1.1.0
    * Fixed bug where only one paper is loaded
        + due to misunderstanding of `splice()` method
    * NEW VERSION 1.1.1
    
    ## 14Sept2014 12:00PM
    * Fixed a bug where splicing happens all the time since || operator was used instead of &&
    * NEW VERSION 1.1.2
*/
function XStorage () {
    'use strict';
    var method = "";
    //key is the root object
    if ($x.isMobile === false && $x.isWeb === false) {
        //desktop app
        method = "chromeStorage";
    } else {
        method = "localStorage";
    }
	this.isSupported = function () {
	  try {
	    	return 'localStorage' in window && window.localStorage !== null;
	  } catch (e) {
	    	return false;
	  }
	};
    if (method === "localStorage") {
        if (this.isSupported()) {
            this.load = function (area) {
                var thisKey, thisItem, tempStore = [], settingsIndex = -1; //settingsIndex is the index number of the settings element in the array
                if (area === "settings") {
                    //retrieve settings
                    return JSON.parse(localStorage.getItem("settings")); //return object
                } else {
                    for (var i = 0;i < localStorage.length;i++) {
                        thisKey = localStorage.key(i);
                        //$x.log(localStorage.getItem(thisKey));
                        if (thisKey === "settings") {
                            settingsIndex = i;
                        }
                        thisItem = localStorage.getItem(thisKey);
                        tempStore[i] = thisItem;
                    }
                    if (typeof settingsIndex !== "undefined" && settingsIndex !== -1) {
                        tempStore.splice( (settingsIndex === 0 ? 0: (settingsIndex)), 1);
                    }
                    return tempStore;
                }
            };
            this.save = function (key, savedata) {
                //key stands for key/area
                if (key === "settings") {
                    localStorage.setItem("settings", JSON.stringify(savedata)); 
                } else {
                    localStorage.setItem(key, savedata);
                }
            };
            this.reset = function () {
                localStorage.clear();
            };
            this.removeItem = function (key) {
                localStorage.removeItem(key);
            };
        } else {
            
        }
    } /*else {
        this.load = function (area, fx) {
            var arrStore = [], thisKey, thisItem;
            if (area === "settings") {
                chrome.storage.local.get(function(ox){
                    fx(ox.settings);
                });
            } else {
                chrome.storage.local.get(function(ox) {
                    for (var i = 0;i < ox.length;i++) {
                        thisKey = ox.key(i);
                        if (thisKey !== "settings") {
                            thisItem = ox.getItem(thisKey);
                            arrStore[i] = thisItem;
                        }
                    }
                    fx(arrStore);
                });
            }
        };
        this.save = function (key, savedata) {
            if (key === "settings") {
                chrome.storage.local.set({
                    "settings": savedata
                });
            } else {
                chrome.storage.local.set({
                    key: savedata
                });
            }
        };
        this.removeItem = function (key) {
            
        };
    }*/
}
$x.constructor.prototype.storage = new XStorage();

