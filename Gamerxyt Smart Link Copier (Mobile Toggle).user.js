// ==UserScript==
// @name         Gamerxyt Smart Link Copier (Mobile Toggle)
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Adds a floating toggle button to intercept download buttons on Gamerxyt only when turned ON.
// @match        *://*.gamerxyt.com/*
// @match        *://gamerxyt.com/*
// @run-at       document-end
// @grant        none
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/vegeteria/tampermonkey/main/Gamerxyt%20Smart%20Link%20Copier%20%28Mobile%20Toggle%29.user.js
// @downloadURL  https://raw.githubusercontent.com/vegeteria/tampermonkey/main/Gamerxyt%20Smart%20Link%20Copier%20%28Mobile%20Toggle%29.user.js
// ==/UserScript==

(function() {
    'use strict';

    // 1. State variable: OFF by default so you can navigate normally
    let isCopyMode = false;

    // 2. Create the floating button
    const toggleBtn = document.createElement('div');
    toggleBtn.innerHTML = "📋 Copy Mode: OFF";
    Object.assign(toggleBtn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#dc3545', // Red when OFF
        color: 'white',
        padding: '12px 18px',
        borderRadius: '50px',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: '14px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        zIndex: '999999', // Stays on top
        userSelect: 'none',
        transition: 'background-color 0.3s'
    });

    // 3. Add toggle functionality
    toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        isCopyMode = !isCopyMode;

        if (isCopyMode) {
            toggleBtn.innerHTML = "✅ Copy Mode: ON";
            toggleBtn.style.backgroundColor = '#28a745'; // Green when ON
        } else {
            toggleBtn.innerHTML = "📋 Copy Mode: OFF";
            toggleBtn.style.backgroundColor = '#dc3545'; // Red when OFF
        }
    });

    document.body.appendChild(toggleBtn);

    console.log("📋 Gamerxyt Copier ready. Turn on Copy Mode to intercept links!");

    // 4. Intercept clicks ONLY if Copy Mode is ON
    document.addEventListener('click', function(e) {

        // Ignore clicks on our floating button
        if (e.target === toggleBtn || toggleBtn.contains(e.target)) return;

        // If Copy Mode is OFF, let the site work normally
        if (!isCopyMode) return;

        // Check if what you clicked is a link (or inside a link button)
        let target = e.target.closest('a');

        if (target && target.href && target.href.startsWith('http')) {

            // STOP the website from actually downloading the file or opening an ad
            e.preventDefault();
            e.stopImmediatePropagation();

            // Copy the URL to your clipboard
            navigator.clipboard.writeText(target.href).then(() => {

                // Give visual feedback so you know it worked
                const originalHTML = target.innerHTML;
                const originalBg = target.style.backgroundColor || "";
                const originalColor = target.style.color || "";

                target.style.transition = "all 0.2s";
                target.style.backgroundColor = "#28a745"; // Green success color
                target.style.color = "#ffffff";
                target.innerText = "✅ Direct Link Copied!";

                // Revert the button and turn Copy Mode OFF after 1.5 seconds
                setTimeout(() => {
                    target.style.backgroundColor = originalBg;
                    target.style.color = originalColor;
                    target.innerHTML = originalHTML;

                    isCopyMode = false;
                    toggleBtn.innerHTML = "📋 Copy Mode: OFF";
                    toggleBtn.style.backgroundColor = '#dc3545';
                }, 1500);

            }).catch(err => {
                alert("Failed to copy link! Check console for errors.");
                console.error("Clipboard Error:", err);
            });
        }
    }, true);

})();