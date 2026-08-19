// ==UserScript==
// @name         HDHub4u & HBLinks Auto-Selector
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  Zeroes timers and aggressively scans for all fake button types.
// @match        *://*.greenmountmotors.com/*
// @match        *://greenmountmotors.com/*
// @match        *://*.hblinks.co/*
// @match        *://hblinks.co/*
// @run-at       document-start
// @grant        none
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/vegeteria/tampermonkey/main/HDHub4u%20%26%20HBLinks%20Auto-Selector.user.js
// @downloadURL  https://raw.githubusercontent.com/vegeteria/tampermonkey/main/HDHub4u%20%26%20HBLinks%20Auto-Selector.user.js
// ==/UserScript==

(function() {
    'use strict';

    // 1. THE NUKE: Inject timer-killers directly into the website's actual code
    const injectTimerKill = `
        const _setTimeout = window.setTimeout;
        const _setInterval = window.setInterval;
        window.setTimeout = (fn, delay, ...args) => _setTimeout(fn, 0, ...args);
        window.setInterval = (fn, delay, ...args) => _setInterval(fn, 10, ...args);
    `;
    const scriptTag = document.createElement('script');
    scriptTag.textContent = injectTimerKill;
    document.documentElement.appendChild(scriptTag);
    scriptTag.remove();

    const host = window.location.hostname.toLowerCase();

    const startAutomation = () => {

        // ==========================================
        // STAGE 1A: GreenmountMotors (Aggressive Clicker)
        // ==========================================
        if (host.includes('greenmountmotors')) {
            console.log("🚦 Mediator Page: Scanning for hidden/fake buttons...");

            setInterval(() => {
                // Look for links, real buttons, OR anything with 'btn' or 'button' in its class
                const elements = document.querySelectorAll('a, button, .btn, [class*="button"]');

                for (let el of elements) {

                    // Check if it's actually visible (ignores display:none or opacity:0)
                    const style = window.getComputedStyle(el);
                    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
                        continue;
                    }

                    // Grab all text inside it, even if nested in weird tags, and make it lowercase
                    const text = (el.textContent || el.innerText || '').toLowerCase().replace(/\s+/g, ' ');

                    if (text.includes('continue') || text.includes('get link') || text.includes('start') || text.includes('go to link')) {
                        console.log("✅ Found active button! Triggering:", text);

                        // 1. If it happens to be a real link with a destination, just go there
                        if (el.tagName === 'A' && el.href && el.href.startsWith('http')) {
                            window.location.replace(el.href);
                            return;
                        }

                        // 2. Standard Click
                        el.click();

                        // 3. Synthetic Mouse Events (Tricks sites that listen for real mouse clicks instead of code clicks)
                        ['mousedown', 'mouseup', 'click'].forEach(evt => {
                            el.dispatchEvent(new MouseEvent(evt, { bubbles: true, cancelable: true, view: window }));
                        });
                    }
                }
            }, 500);
        }

        // ==========================================
        // STAGE 1B: HBLinks (Select Hub Cloud)
        // ==========================================
        else if (host.includes('hblinks')) {
            console.log("🚦 HBLinks: Looking for Hub Cloud...");

            const loop = setInterval(() => {
                const links = document.querySelectorAll('a');
                for (let a of links) {
                    const style = window.getComputedStyle(a);
                    if (style.display !== 'none' && style.opacity !== '0') {

                        const text = (a.textContent || '').toLowerCase();
                        const href = (a.href || '').toLowerCase();

                        if (text.includes('hub cloud') || text.includes('hubcloud') || href.includes('hubcloud')) {
                            clearInterval(loop);
                            console.log("✅ Hub Cloud found! Redirecting...");
                            window.location.replace(a.href);
                        }
                    }
                }
            }, 500);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startAutomation);
    } else {
        startAutomation();
    }

})();