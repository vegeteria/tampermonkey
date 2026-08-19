// ==UserScript==
// @name         HubCloud Direct Redirector
// @namespace    http://tampermonkey.net/
// @version      9.0
// @description  Bypasses the click-hijacker and redirects directly to Gamerxyt.
// @match        *://hubcloud.cx/*
// @match        *://*.hubcloud.cx/*
// @match        *://hubcloud.club/*
// @match        *://*.hubcloud.club/*
// @run-at       document-end
// @grant        none
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/vegeteria/tampermonkey/main/HubCloud%20Direct%20Redirector.user.js
// @downloadURL  https://raw.githubusercontent.com/vegeteria/tampermonkey/main/HubCloud%20Direct%20Redirector.user.js
// ==/UserScript==

(function() {
    'use strict';

    console.log("🚦 Scanning for Gamerxyt link...");

    const checkInterval = setInterval(() => {
        const btn = document.getElementById('download');

        // If the button is found and contains the gamerxyt link
        if (btn && btn.href && btn.href.includes('gamerxyt.com')) {
            clearInterval(checkInterval);

            console.log("✅ Link found! Bypassing the ad-hijacker and redirecting...");

            // window.location.replace forces the browser to go to the link
            // without ever "clicking" the button, perfectly bypassing their trap.
            window.location.replace(btn.href);
        }
    }, 500);

})();