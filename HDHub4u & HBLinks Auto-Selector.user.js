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

    // 1. Zero out timers directly in page context (safe for Firefox & Chromium)
    try {
        const _setTimeout = window.setTimeout;
        const _setInterval = window.setInterval;
        window.setTimeout = (fn, delay, ...args) => _setTimeout(fn, 0, ...args);
        window.setInterval = (fn, delay, ...args) => _setInterval(fn, 10, ...args);
    } catch (e) {
        console.error("Timer override error:", e);
    }

    const host = window.location.hostname.toLowerCase();

    const startAutomation = () => {

        // ==========================================
        // STAGE 1A: GreenmountMotors (Aggressive Clicker)
        // ==========================================
        if (host.includes('greenmountmotors')) {
            console.log("🚦 Mediator Page: Scanning for hidden/fake buttons...");

            setInterval(() => {
                const elements = document.querySelectorAll('a, button, .btn, [class*="button"]');

                for (let el of elements) {
                    const style = window.getComputedStyle(el);
                    
                    // Firefox safety check: ignore null, hidden, or invisible elements
                    if (!style || style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
                        continue;
                    }

                    const text = (el.textContent || el.innerText || '').toLowerCase().replace(/\s+/g, ' ');

                    if (text.includes('continue') || text.includes('get link') || text.includes('start') || text.includes('go to link')) {
                        console.log("✅ Found active button! Triggering:", text);

                        if (el.tagName === 'A' && el.href && el.href.startsWith('http')) {
                            window.location.replace(el.href);
                            return;
                        }

                        el.click();

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
                    
                    if (style && style.display !== 'none' && style.opacity !== '0') {
                        const text = (a.textContent || '').toLowerCase();
                        const href = (a.href || '').toLowerCase();

                        if (text.includes('hub cloud') || text.includes('hubcloud') || href.includes('hubcloud')) {
                            clearInterval(loop);
                            console.log("✅ Hub Cloud found! Redirecting...");
                            window.location.replace(a.href);
                            return;
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
