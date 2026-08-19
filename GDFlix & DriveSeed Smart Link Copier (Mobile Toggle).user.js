// ==UserScript==
// @name         GDFlix & DriveSeed Smart Link Copier (Mobile Toggle)
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Adds a floating toggle button so you can navigate normally, then turn on Copy Mode for the final link.
// @match        *://*.driveseed.org/*
// @match        *://driveseed.org/*
// @match        *://*.gdflix.io/*
// @match        *://gdflix.io/*
// @run-at       document-end
// @grant        none
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/vegeteria/tampermonkey/main/GDFlix%20%26%20DriveSeed%20Smart%20Link%20Copier%20%28Mobile%20Toggle%29.user.js
// @downloadURL  https://raw.githubusercontent.com/vegeteria/tampermonkey/main/GDFlix%20%26%20DriveSeed%20Smart%20Link%20Copier%20%28Mobile%20Toggle%29.user.js
// ==/UserScript==

(function() {
    'use strict';

    // 1. State variable: determines if we are copying or navigating
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
        zIndex: '999999', // Make sure it sits on top of everything
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

    // 4. Intercept clicks ONLY if Copy Mode is ON
    document.addEventListener('click', function(e) {

        // If they are clicking our floating button, ignore it
        if (e.target === toggleBtn || toggleBtn.contains(e.target)) return;

        // If Copy Mode is OFF, do nothing. Let the site work normally.
        if (!isCopyMode) return;

        // Find the closest link
        let target = e.target.closest('a');

        if (target && target.href && target.href.startsWith('http')) {

            // Stop the link from opening
            e.preventDefault();
            e.stopImmediatePropagation();

            // Copy to clipboard
            navigator.clipboard.writeText(target.href).then(() => {

                // Visual feedback on the button you just clicked
                const originalHTML = target.innerHTML;
                const originalBg = target.style.backgroundColor || "";
                const originalColor = target.style.color || "";

                target.style.transition = "all 0.2s";
                target.style.backgroundColor = "#28a745";
                target.style.color = "#ffffff";
                target.innerText = "✅ Link Copied!";

                // Automatically turn Copy Mode back OFF so you can navigate elsewhere
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
    }, true); // 'true' intercepts the click early

})();