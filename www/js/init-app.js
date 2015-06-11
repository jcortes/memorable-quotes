/*
 * Please see the included README.md file for license terms and conditions.
 */
// This file is a suggested initialization place for your code.
// It is completely optional and not required.
// It implements a Cordova 'hide splashscreen' function, that may be useful.
// Note the reference that includes it in the index.html file.

/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false */
/*global myEventHandler:false, cordova:false, device:false */

// there should only be one of these...
window.app = window.app || {};

// Set to 'true' if you want the console.log messages to appear.
app.LOG = true;
app.LOG = app.LOG || false;

// only emits console.log messages if app.LOG != false
app.consoleLog = function() {
    if(app.LOG) {
        var args = Array.prototype.slice.call(arguments, 0) ;
        console.log.apply(console, args) ;
    }
};

// App init point (runs on custom app.Ready event from init-dev.js).
// Runs after underlying device native code and webview/browser is ready.
// Where you should 'kick off' your application by initializing app events, etc.
// NOTE: Customize this function to initialize your application, as needed.
app.initEvents = function() {
    'use strict' ;
    var fName = 'app.initEvents():';
    app.consoleLog(fName, 'entry');

    appModule.initClock();
    appModule.initDb();
    appModule.initBg();
    appModule.initQuote();

    // just for debug, not required; keep it if you want it or get rid of it
    app.initDebug();
    
    // after init is good time to remove splash screen; using a splash screen is optional
    app.hideSplashScreen();

    app.consoleLog(fName, 'exit');
};

document.addEventListener('app.Ready', app.initEvents, false);

// Just a bunch of useful debug console.log() messages.
// Runs after underlying device native code and webview/browser is ready.
// The following is just for debug, not required; keep it if you want or get rid of it.
app.initDebug = function() {
    'use strict';
    var fName = 'app.initDebug():';
    app.consoleLog(fName, 'entry');

    // old Cordova 2.x version detection
    if(window.device && device.cordova) {
        // print the cordova version string...
        app.consoleLog('device.version: ' + device.cordova);
        app.consoleLog('device.model: ' + device.model);
        app.consoleLog('device.platform: ' + device.platform);
        app.consoleLog('device.version: ' + device.version);
    }

    // only works in Cordova 3.x
    if(window.cordova && cordova.version) {
        // print new Cordova 3.x version string...
        app.consoleLog('cordova.version: ' + cordova.version);

        // print included cordova plugins
        if( cordova.require ) {
            app.consoleLog(JSON.stringify(cordova.require('cordova/plugin_list').metadata, null, 1));
        }
    }

    app.consoleLog(fName, 'exit');
};

// Using a splash screen is optional. This function will not fail if none is present.
// This is also a simple study in the art of multi-platform device API detection.
// /js/splash-screen/index.js reference
app.hideSplashScreen = function() {
    'use strict';
    var fName = 'app.hideSplashScreen():';
    app.consoleLog(fName, 'entry');

    // see https://github.com/01org/appframework/blob/master/documentation/detail/%24.ui.launch.md
    // Do the following if you disabled App Framework autolaunch (in index.html, for example)
    // $.ui.launch();
    // Cordova API detected
    if(navigator.splashscreen && navigator.splashscreen.hide) {
        navigator.splashscreen.hide();
    }
    
    // Intel XDK device API detected, but...
    if(window.intel && intel.xdk && intel.xdk.device) {
        // ...hideSplashScreen() is inside the base plugin
        if(intel.xdk.device.hideSplashScreen) {
            intel.xdk.device.hideSplashScreen();
        }
    }

    app.consoleLog(fName, 'exit');
};
