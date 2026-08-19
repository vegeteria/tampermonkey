// ==UserScript==
// @name         Just Bypass Pahe Links
// @namespace    http://tampermonkey.net/
// @version      8.0.0
// @description  Tested with Tampermonkey on Mozilla Firefox. Resolves Pahe link relays while preserving server-required verification, CAPTCHA, and waits.
// @author       artphoney
// @match        *://oii.la/*
// @match        *://*.oii.la/*
// @match        *://tpi.li/*
// @match        *://*.tpi.li/*
// @match        *://teknoasian.com/*
// @match        *://*.teknoasian.com/*
// @match        *://pahe.plus/*
// @match        *://*.pahe.plus/*
// @match        *://old.pahe.plus/*
// @match        *://*.old.pahe.plus/*
// @match        *://linegee.net/*
// @match        *://*.linegee.net/*
// @match        *://ouo.io/*
// @match        *://*.ouo.io/*
// @match        *://ouo.press/*
// @match        *://*.ouo.press/*
// @match        *://uii.io/*
// @match        *://*.uii.io/*
// @match        *://wordcounter.icu/*
// @match        *://*.wordcounter.icu/*
// @match        *://spacetica.com/*
// @match        *://*.spacetica.com/*
// @match        *://intercelestial.com/*
// @match        *://*.intercelestial.com/*
// @match        *://wp2hostt.com/*
// @match        *://*.wp2hostt.com/*
// @match        *://blogmystt.com/*
// @match        *://*.blogmystt.com/*
// @match        *://hosttbuzz.com/*
// @match        *://*.hosttbuzz.com/*
// @match        *://policiesreview.com/*
// @match        *://*.policiesreview.com/*
// @match        *://healthylifez.com/*
// @match        *://*.healthylifez.com/*
// @match        *://insurancemyst.com/*
// @match        *://*.insurancemyst.com/*
// @match        *://hostingbixby.com/*
// @match        *://*.hostingbixby.com/*
// @match        *://policiesbuzzz.com/*
// @match        *://*.policiesbuzzz.com/*
// @match        *://hostingzbuzz.com/*
// @match        *://*.hostingzbuzz.com/*
// @match        *://bixbyfortech.com/*
// @match        *://*.bixbyfortech.com/*
// @match        *://serverguidez.com/*
// @match        *://*.serverguidez.com/*
// @match        *://comparepolicyy.com/*
// @match        *://*.comparepolicyy.com/*
// @match        *://cheaplann.com/*
// @match        *://*.cheaplann.com/*
// @match        *://vpshostplans.com/*
// @match        *://*.vpshostplans.com/*
// @match        *://ensureguide.com/*
// @match        *://*.ensureguide.com/*
// @match        *://fitnessplanss.com/*
// @match        *://*.fitnessplanss.com/*
// @match        *://sharedwebs.com/*
// @match        *://*.sharedwebs.com/*
// @match        *://hostserverz.com/*
// @match        *://*.hostserverz.com/*
// @match        *://cloudhostingz.com/*
// @match        *://*.cloudhostingz.com/*
// @match        *://carensureplan.com/*
// @match        *://*.carensureplan.com/*
// @match        *://playareaz.com/*
// @match        *://*.playareaz.com/*
// @match        *://fitnesstipz.com/*
// @match        *://*.fitnesstipz.com/*
// @match        *://ensuretips.com/*
// @match        *://*.ensuretips.com/*
// @match        *://softdevelopp.com/*
// @match        *://*.softdevelopp.com/*
// @match        *://vpzserver.com/*
// @match        *://*.vpzserver.com/*
// @match        *://tophostdeal.com/*
// @match        *://*.tophostdeal.com/*
// @match        *://evensuregd.com/*
// @match        *://*.evensuregd.com/*
// @match        *://bestensuree.com/*
// @match        *://*.bestensuree.com/*
// @match        *://hostzteam.com/*
// @match        *://*.hostzteam.com/*
// @match        *://devsoftwr.com/*
// @match        *://*.devsoftwr.com/*
// @match        *://zpserver.com/*
// @match        *://*.zpserver.com/*
// @match        *://fitpractise.com/*
// @match        *://*.fitpractise.com/*
// @match        *://autoshieldd.com/*
// @match        *://*.autoshieldd.com/*
// @run-at       document-start
// @grant        none
// @downloadURL  https://update.greasyfork.org/scripts/561205/Just%20Bypass%20Pahe%20Links.user.js
// @updateURL    https://update.greasyfork.org/scripts/561205/Just%20Bypass%20Pahe%20Links.meta.js
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    const LOCK_KEY = '__oii_tpi_instant_bypass';
    const LOCK_TTL = 10000;
    const TEKNO_STATE_KEY = '__teknoasian_instant_bypass';
    const TEKNO_STATE_TTL = 120000;
    const LINEGEE_STATE_KEY = '__linegee_auto_bypass';
    const LINEGEE_STATE_TTL = 30000;
    const LINEGEE_WAIT = 5000;
    const linegeeStartedAt = Date.now();
    const OUO_STATE_KEY = '__ouo_auto_bypass';
    const OUO_STATE_TTL = 30000;
    const OUO_CLICK_WAIT = 2500;
    const OUO_FORM_WAIT = 5000;
    const ouoStartedAt = Date.now();
    const PAHE_MIRROR_STATE_KEY = '__pahe_mirror_auto_bypass';
    const PAHE_MIRROR_STATE_TTL = 120000;
    const paheMirrorStartedAt = Date.now();
    const PAHE_MIRROR_HOSTS = new Set([
        'spacetica.com',
        'old.pahe.plus',
        'intercelestial.com',
        'wp2hostt.com',
        'blogmystt.com',
        'hosttbuzz.com',
        'policiesreview.com',
        'healthylifez.com',
        'insurancemyst.com',
        'hostingbixby.com',
        'policiesbuzzz.com',
        'hostingzbuzz.com',
        'bixbyfortech.com',
        'serverguidez.com',
        'comparepolicyy.com',
        'cheaplann.com',
        'vpshostplans.com',
        'ensureguide.com',
        'fitnessplanss.com',
        'sharedwebs.com',
        'hostserverz.com',
        'cloudhostingz.com',
        'carensureplan.com',
        'playareaz.com',
        'fitnesstipz.com',
        'ensuretips.com',
        'softdevelopp.com',
        'vpzserver.com',
        'tophostdeal.com',
        'evensuregd.com',
        'bestensuree.com',
        'hostzteam.com',
        'devsoftwr.com',
        'zpserver.com',
        'fitpractise.com',
        'autoshieldd.com'
    ]);
    const PAHE_ADLINK_HOSTS = new Set(['uii.io', 'wordcounter.icu']);
    const currentHost = location.hostname.replace(/^www\./i, '').toLowerCase();
    const matchingRoot = function (roots) {
        for (const root of roots) {
            if (currentHost === root || currentHost.endsWith(`.${root}`)) return root;
        }
        return '';
    };
    const paheMirrorRoot = matchingRoot(PAHE_MIRROR_HOSTS);
    const paheAdlinkRoot = matchingRoot(PAHE_ADLINK_HOSTS);
    const currentRoot = paheMirrorRoot || paheAdlinkRoot || (currentHost === 'oii.la' || currentHost.endsWith('.oii.la')
        ? 'oii.la'
        : currentHost === 'tpi.li' || currentHost.endsWith('.tpi.li')
            ? 'tpi.li'
            : currentHost === 'teknoasian.com' || currentHost.endsWith('.teknoasian.com')
                ? 'teknoasian.com'
                : currentHost === 'pahe.plus' || currentHost.endsWith('.pahe.plus')
                    ? 'pahe.plus'
                    : currentHost === 'linegee.net' || currentHost.endsWith('.linegee.net')
                        ? 'linegee.net'
                        : currentHost === 'ouo.io' || currentHost.endsWith('.ouo.io')
                            ? 'ouo.io'
                            : currentHost === 'ouo.press' || currentHost.endsWith('.ouo.press')
                                ? 'ouo.press'
                                : currentHost);
    const isTeknoAsian = currentRoot === 'teknoasian.com';
    const isPaheMirror = Boolean(paheMirrorRoot);
    const isPaheAdlink = Boolean(paheAdlinkRoot);
    const isPahePlus = currentRoot === 'pahe.plus' && !isPaheMirror;
    const isLinegee = currentRoot === 'linegee.net';
    const isOuo = currentRoot === 'ouo.io' || currentRoot === 'ouo.press';
    let redirecting = false;
    let teknoAttempted = false;
    let paheCaptchaSubmitted = false;
    let paheAjaxHooked = false;
    const paheGuardedForms = new WeakSet();
    const linegeeGuardedLinks = new WeakSet();
    const ouoGuardedForms = new WeakSet();
    const paheMirrorGuardedForms = new WeakSet();
    const paheMirrorClaims = new Map();
    let ouoCaptchaClicked = false;
    let ouoSubmitted = false;
    let observer = null;
    let observerTimer = 0;
    let interval = 0;
    let timeout = 0;
    let linegeeTimer = 0;

    function stop() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        if (observerTimer) {
            clearTimeout(observerTimer);
            observerTimer = 0;
        }
        if (interval) {
            clearInterval(interval);
            interval = 0;
        }
        if (timeout) {
            clearTimeout(timeout);
            timeout = 0;
        }
        if (linegeeTimer) {
            clearTimeout(linegeeTimer);
            linegeeTimer = 0;
        }
    }

    function decodeBase64(value) {
        try {
            let encoded = String(value || '').replace(/-/g, '+').replace(/_/g, '/');
            while (encoded.length % 4) encoded += '=';
            return atob(encoded);
        } catch (_) {
            return '';
        }
    }

    function externalDestination(value) {
        const match = String(value || '').match(/^https?:\/\/[^\s\x00-\x1f]+/i);
        if (!match) return '';
        try {
            const target = new URL(match[0]);
            const targetHost = target.hostname.replace(/^www\./i, '').toLowerCase();
            if (targetHost === currentRoot || targetHost.endsWith(`.${currentRoot}`)) return '';
            if (isOuo && (
                targetHost === 'ouo.io' || targetHost.endsWith('.ouo.io') ||
                targetHost === 'ouo.press' || targetHost.endsWith('.ouo.press')
            )) return '';
            return target.href;
        } catch (_) {
            return '';
        }
    }

    function decodeCandidate(value) {
        let candidate = value;
        for (let depth = 0; depth < 3; depth++) {
            const decoded = decodeBase64(candidate);
            const target = externalDestination(decoded);
            if (target) return target;
            const nested = decoded.match(/(?:aHR0c(?:HM6Ly|DovLy)|YUhSMG)[A-Za-z0-9+/_=-]*/);
            if (!nested) return '';
            candidate = nested[0];
        }
        return '';
    }

    function tokenDestination() {
        for (const input of document.querySelectorAll('input[name="token"]')) {
            const candidates = (input.value || '').match(/(?:aHR0c(?:HM6Ly|DovLy)|YUhSMG)[A-Za-z0-9+/_=-]*/g) || [];
            for (let index = candidates.length - 1; index >= 0; index--) {
                const target = decodeCandidate(candidates[index]);
                if (target) return target;
            }
        }
        return '';
    }

    function markTeknoState() {
        try {
            sessionStorage.setItem(TEKNO_STATE_KEY, JSON.stringify({ time: Date.now() }));
        } catch (_) {
        }
    }

    function teknoStateActive() {
        try {
            const state = JSON.parse(sessionStorage.getItem(TEKNO_STATE_KEY) || 'null');
            return Boolean(state && Date.now() - state.time < TEKNO_STATE_TTL);
        } catch (_) {
            return false;
        }
    }

    function clearTeknoState() {
        try {
            sessionStorage.removeItem(TEKNO_STATE_KEY);
        } catch (_) {
        }
    }

    function teknoPayload(source) {
        const text = typeof source === 'string'
            ? source
            : Array.from(document.scripts, script => script.textContent || '').join('\n');
        const match = text.match(/var\s+LLPayload\s*=\s*(['"])([^'"]+)\1/);
        return match ? match[2] : '';
    }

    function teknoForm(html, baseUrl) {
        const parsed = new DOMParser().parseFromString(html, 'text/html');
        const form = parsed.querySelector('form#xq');
        const field = form && form.querySelector('input[name="hq"]');
        if (!form || !field || !field.value) return null;
        try {
            return {
                url: new URL(form.getAttribute('action') || baseUrl, baseUrl).href,
                value: field.value
            };
        } catch (_) {
            return null;
        }
    }

    function teknoFinalDestination(html, baseUrl) {
        const parsed = new DOMParser().parseFromString(html, 'text/html');
        const link = parsed.querySelector('a#xxc[href]');
        if (!link) return '';
        try {
            return externalDestination(new URL(link.getAttribute('href'), baseUrl).href);
        } catch (_) {
            return '';
        }
    }

    async function teknoPost(url, name, value, referrer) {
        const body = new URLSearchParams();
        body.set(name, value);
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            redirect: 'follow',
            referrer,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body
        });
        if (!response.ok) throw new Error(`TeknoAsian HTTP ${response.status}`);
        return { html: await response.text(), url: response.url };
    }

    async function resolveTeknoAsian(payload) {
        const first = await teknoPost(location.href, 'hw', payload, location.href);
        const next = teknoForm(first.html, first.url);
        if (!next) throw new Error('TeknoAsian next form was not found');

        const second = await teknoPost(next.url, 'hq', next.value, first.url);
        const secondPayload = teknoPayload(second.html);
        if (!secondPayload) throw new Error('TeknoAsian article payload was not found');

        const third = await teknoPost(next.url, 'hw', secondPayload, second.url);
        const target = teknoFinalDestination(third.html, third.url);
        if (!target) throw new Error('TeknoAsian final destination was not found');

        clearTeknoState();
        redirectOnce(target);
    }

    function handleTeknoAsian() {
        if (!teknoStateActive() || teknoAttempted) return false;
        const payload = teknoPayload(document);
        if (!payload) return false;
        teknoAttempted = true;
        resolveTeknoAsian(payload).catch(() => {});
        return true;
    }

    function paheDestinationFromResult(result) {
        let data = result;
        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
            } catch (_) {
                return '';
            }
        }
        return data && typeof data === 'object' ? externalDestination(data.url) : '';
    }

    function hookPaheAjax() {
        if (paheAjaxHooked || typeof window.jQuery !== 'function') return false;
        paheAjaxHooked = true;
        window.jQuery(document).on('ajaxSuccess.instantPaheBypass', function (_, __, settings, result) {
            try {
                const requestUrl = new URL(settings.url, location.href);
                if (requestUrl.origin !== location.origin || !requestUrl.pathname.startsWith('/links/go')) return;
                const target = paheDestinationFromResult(result);
                if (target) redirectOnce(target);
            } catch (_) {
            }
        });
        return true;
    }

    function paheReadyDestination() {
        const links = document.querySelectorAll('a.get-link[href], .skip-ad a[href]');
        for (const link of links) {
            if (link.classList.contains('disabled')) continue;
            const target = externalDestination(link.href);
            if (target) return target;
        }
        return '';
    }

    function paheCaptchaResponse() {
        const fields = document.querySelectorAll([
            'textarea[name="h-captcha-response"]',
            'input[name="h-captcha-response"]',
            'textarea[name="g-recaptcha-response"]',
            'input[name="g-recaptcha-response"]'
        ].join(','));
        for (const field of fields) {
            const value = String(field.value || '').trim();
            if (value.length > 20) return value;
        }
        return '';
    }

    function paheCaptchaForm() {
        const form = document.querySelector('form#link-view');
        const action = form && form.querySelector('input[name="action"][value="captcha"]');
        if (!form || !action) return null;
        if (!paheGuardedForms.has(form)) {
            paheGuardedForms.add(form);
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                event.stopImmediatePropagation();
                submitPaheCaptcha(form);
            }, true);
        }
        return form;
    }

    function submitPaheCaptcha(candidate) {
        const form = candidate || paheCaptchaForm();
        if (!form || paheCaptchaSubmitted || !paheCaptchaResponse()) return false;
        paheCaptchaSubmitted = true;
        HTMLFormElement.prototype.submit.call(form);
        return true;
    }

    function handlePahePlus() {
        hookPaheAjax();
        const target = paheReadyDestination();
        if (target) return redirectOnce(target);
        const form = paheCaptchaForm();
        return form ? submitPaheCaptcha(form) : false;
    }

    function linegeeFinalDestination() {
        const link = document.querySelector('a#xxc[href]');
        return link ? externalDestination(link.href) : '';
    }

    function linegeeInternalDestination() {
        const source = Array.from(document.scripts, script => script.textContent || '').join('\n');
        const pattern = /location\.href\s*=\s*atob\(\s*(['"])([^'"]+)\1\s*\)/gi;
        let match = null;
        let candidate = null;
        while ((match = pattern.exec(source))) candidate = match[2];
        if (!candidate) return '';
        try {
            const target = new URL(decodeBase64(candidate), location.href);
            if (target.origin !== location.origin || !target.searchParams.has('ddx')) return '';
            return target.href;
        } catch (_) {
            return '';
        }
    }

    function linegeeAttemptAllowed() {
        try {
            const state = JSON.parse(sessionStorage.getItem(LINEGEE_STATE_KEY) || 'null');
            return !state || state.path !== location.pathname || Date.now() - state.time >= LINEGEE_STATE_TTL;
        } catch (_) {
            return true;
        }
    }

    function navigateLinegeeInternal(target) {
        if (redirecting || !linegeeAttemptAllowed()) return false;
        try {
            const destination = new URL(target);
            if (destination.origin !== location.origin || !destination.searchParams.has('ddx')) return false;
            sessionStorage.setItem(LINEGEE_STATE_KEY, JSON.stringify({ path: location.pathname, time: Date.now() }));
            redirecting = true;
            stop();
            location.replace(destination.href);
            return true;
        } catch (_) {
            return false;
        }
    }

    function scheduleLinegeeNavigation() {
        if (redirecting || new URLSearchParams(location.search).has('ddx')) return false;
        const target = linegeeInternalDestination();
        if (!target || !linegeeAttemptAllowed()) return false;
        const remaining = Math.max(0, LINEGEE_WAIT - (Date.now() - linegeeStartedAt));
        if (!remaining) return navigateLinegeeInternal(target);
        if (!linegeeTimer) {
            linegeeTimer = setTimeout(function () {
                linegeeTimer = 0;
                navigateLinegeeInternal(target);
            }, remaining);
        }
        return true;
    }

    function guardLinegeeLink() {
        const link = document.querySelector('a.btn-primary.btn-xs');
        if (!link) return false;
        if (!linegeeGuardedLinks.has(link)) {
            linegeeGuardedLinks.add(link);
            link.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopImmediatePropagation();
                scheduleLinegeeNavigation();
            }, true);
        }
        return true;
    }

    function handleLinegee() {
        const target = linegeeFinalDestination();
        if (target) return redirectOnce(target);
        guardLinegeeLink();
        return scheduleLinegeeNavigation();
    }

    function ouoNextDestination() {
        if (typeof window.nextUrl === 'string') {
            const target = externalDestination(window.nextUrl);
            if (target) return target;
        }
        const link = document.querySelector('a#xxc[href], a#destination[href], a.get-link[href]:not(.disabled)');
        if (link) {
            const target = externalDestination(link.href);
            if (target) return target;
        }
        const refresh = document.querySelector('meta[http-equiv="refresh" i][content]');
        if (refresh) {
            const match = refresh.content.match(/url\s*=\s*['"]?([^'"]+)/i);
            if (match) {
                try {
                    const target = externalDestination(new URL(match[1].trim(), location.href).href);
                    if (target) return target;
                } catch (_) {
                }
            }
        }
        return '';
    }

    function ouoVerificationToken(form) {
        const fields = [
            form.querySelector('input[name="x-token"]'),
            form.querySelector('[name="cf-turnstile-response"]'),
            form.querySelector('[name="g-recaptcha-response"]')
        ];
        for (const field of fields) {
            const value = String(field && field.value || '').trim();
            if (value.length > 5) return value;
        }
        return '';
    }

    function ouoButtonActive(button) {
        return Boolean(button && !button.disabled && button.getAttribute('aria-disabled') !== 'true' && !button.classList.contains('disabled'));
    }

    function ouoPhaseKey(form) {
        try {
            return `${location.pathname}|${form.id}|${new URL(form.action, location.href).pathname}`;
        } catch (_) {
            return `${location.pathname}|${form.id}`;
        }
    }

    function ouoAttemptAllowed(form) {
        try {
            const state = JSON.parse(sessionStorage.getItem(OUO_STATE_KEY) || 'null');
            const key = ouoPhaseKey(form);
            return !state || state.key !== key || Date.now() - state.time >= OUO_STATE_TTL;
        } catch (_) {
            return true;
        }
    }

    function submitOuoForm(form) {
        if (!form || ouoSubmitted || !ouoAttemptAllowed(form)) return false;
        try {
            sessionStorage.setItem(OUO_STATE_KEY, JSON.stringify({ key: ouoPhaseKey(form), time: Date.now() }));
        } catch (_) {
        }
        ouoSubmitted = true;
        stop();
        HTMLFormElement.prototype.submit.call(form);
        return true;
    }

    function guardOuoForm(form) {
        if (!form || ouoGuardedForms.has(form)) return Boolean(form);
        ouoGuardedForms.add(form);
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            handleOuo();
        }, true);
        return true;
    }

    function guardOuoCaptchaForm(form) {
        if (!form || ouoGuardedForms.has(form)) return Boolean(form);
        ouoGuardedForms.add(form);
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (!ouoVerificationToken(form)) return;
            event.stopImmediatePropagation();
            submitOuoForm(form);
        }, true);
        return true;
    }

    function clickOuoCaptchaButton(form) {
        if (ouoCaptchaClicked || Date.now() - ouoStartedAt < OUO_CLICK_WAIT) return false;
        const button = form.querySelector('#btn-main, #captcha button[type="submit"], button.btn-main, button[type="submit"]');
        if (!ouoButtonActive(button)) return false;
        ouoCaptchaClicked = true;
        const originalOpen = window.open;
        const blockedOpen = function () { return null; };
        try {
            window.open = blockedOpen;
            button.click();
        } catch (_) {
        }
        setTimeout(function () {
            if (window.open === blockedOpen) window.open = originalOpen;
        }, 1500);
        return true;
    }

    function ouoCountdownPending() {
        const elements = document.querySelectorAll('#timer, #countdown, .countdown .timer, .countdown-number');
        for (const element of elements) {
            const value = parseInt(String(element.textContent || '').replace(/[^0-9]/g, ''), 10);
            if (Number.isFinite(value) && value > 0) return true;
        }
        return false;
    }

    function handleOuoCaptcha(form) {
        guardOuoCaptchaForm(form);
        if (ouoVerificationToken(form)) return submitOuoForm(form);
        clickOuoCaptchaButton(form);
        return true;
    }

    function handleOuoGo(form) {
        guardOuoForm(form);
        if (Date.now() - ouoStartedAt < OUO_FORM_WAIT || ouoCountdownPending()) return true;
        const button = form.querySelector('button[type="submit"], input[type="submit"], button');
        if (button && !ouoButtonActive(button)) return true;
        return submitOuoForm(form);
    }

    function handleOuo() {
        const target = ouoNextDestination();
        if (target) return redirectOnce(target);
        const captchaForm = document.querySelector('form#form-captcha');
        if (captchaForm) return handleOuoCaptcha(captchaForm);
        const goForm = document.querySelector('form#form-go');
        if (goForm) return handleOuoGo(goForm);
        if (/^\/xreallcygo(?:\/|$)/i.test(location.pathname)) {
            const finalForm = document.querySelector('form[action*="xreallcygo"], form');
            if (finalForm) return handleOuoGo(finalForm);
        }
        return false;
    }

    function paheMirrorDestination() {
        const tokenTarget = tokenDestination();
        if (tokenTarget) return tokenTarget;
        const selectors = [
            'a#xxc[href]',
            'a#destination[href]',
            'a.get-link[href]:not(.disabled)',
            '.skip-ad a[href]',
            'a#showlink[href]',
            'a#getnewlink[href]',
            'a#lite-end-sora-button[href]'
        ];
        for (const selector of selectors) {
            const link = document.querySelector(selector);
            if (!link || link.getAttribute('aria-disabled') === 'true') continue;
            const target = externalDestination(link.href);
            if (target) return target;
        }
        const refresh = document.querySelector('meta[http-equiv="refresh" i][content]');
        if (!refresh) return '';
        const match = refresh.content.match(/url\s*=\s*['"]?([^'"]+)/i);
        if (!match) return '';
        try {
            return externalDestination(new URL(match[1].trim(), location.href).href);
        } catch (_) {
            return '';
        }
    }

    function paheMirrorElementActive(element) {
        if (!element || element.disabled || element.getAttribute('aria-disabled') === 'true' || element.classList.contains('disabled')) return false;
        const style = getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden' && element.getClientRects().length > 0;
    }

    function paheMirrorCountdownPending() {
        const selectors = [
            '#timer',
            '#countdown',
            '.countdown',
            '.countdown-number',
            'center span[id^="_"]',
            '.humanVerify h4',
            '.Skipper h4',
            '.notifx'
        ];
        for (const element of document.querySelectorAll(selectors.join(','))) {
            const text = String(element.textContent || '').trim();
            const match = text.match(/(-?\d+)\s*(?:seconds?|secs?)?/i);
            if (match && Number(match[1]) > 0 && (/wait|second|count/i.test(text) || /^\d+$/.test(text))) return true;
        }
        return false;
    }

    function paheMirrorPhaseKey(kind, element) {
        const form = element && element.closest('form');
        const identity = form
            ? `${form.id}|${form.getAttribute('action') || ''}`
            : `${element && element.id || ''}|${element && element.className || ''}`;
        return `${currentHost}|${location.pathname}|${location.search}|${kind}|${identity}`;
    }

    function claimPaheMirrorPhase(kind, element) {
        const now = Date.now();
        const key = paheMirrorPhaseKey(kind, element);
        const memoryTime = paheMirrorClaims.get(key) || 0;
        if (now - memoryTime < PAHE_MIRROR_STATE_TTL) return false;
        try {
            const state = JSON.parse(sessionStorage.getItem(PAHE_MIRROR_STATE_KEY) || '{}');
            if (state[key] && now - state[key] < PAHE_MIRROR_STATE_TTL) {
                paheMirrorClaims.set(key, state[key]);
                return false;
            }
            for (const savedKey of Object.keys(state)) {
                if (now - state[savedKey] >= PAHE_MIRROR_STATE_TTL) delete state[savedKey];
            }
            state[key] = now;
            paheMirrorClaims.set(key, now);
            sessionStorage.setItem(PAHE_MIRROR_STATE_KEY, JSON.stringify(state));
            return true;
        } catch (_) {
            paheMirrorClaims.set(key, now);
            return true;
        }
    }

    function guardPaheMirrorForm(form) {
        if (!form || paheMirrorGuardedForms.has(form)) return Boolean(form);
        paheMirrorGuardedForms.add(form);
        form.addEventListener('submit', function (event) {
            if (claimPaheMirrorPhase('submit', form)) return;
            event.preventDefault();
            event.stopImmediatePropagation();
        }, true);
        return true;
    }

    function clickPaheMirrorControl(element, kind) {
        if (Date.now() - paheMirrorStartedAt < 800 || document.readyState === 'loading') return false;
        if (!paheMirrorElementActive(element) || paheMirrorCountdownPending()) return false;
        if (!claimPaheMirrorPhase(kind, element)) return true;
        const form = element.closest('form');
        if (form) guardPaheMirrorForm(form);
        const originalOpen = window.open;
        const blockedOpen = function () { return null; };
        try {
            window.open = blockedOpen;
            element.click();
        } catch (_) {
        }
        setTimeout(function () {
            if (window.open === blockedOpen) window.open = originalOpen;
        }, 1200);
        return true;
    }

    function handlePaheMirrorControls() {
        const controls = [
            ['postnext', 'form#xxc .postnext, form .postnext'],
            ['skipcontent', '.Skipper > .skipcontent'],
            ['verify', '.humanVerify .verify'],
            ['getnewlink', '#getnewlink'],
            ['showlink', '#showlink, #lite-end-sora-button'],
            ['generater', '#generater, #lite-start-sora-a'],
            ['start', '#startButton'],
            ['getlink', 'button#getlink'],
            ['captcha', '#invisibleCaptchaShortlink'],
            ['adlink', 'a.get-link[href]:not(.disabled)']
        ];
        for (const [kind, selector] of controls) {
            for (const element of document.querySelectorAll(selector)) {
                if (clickPaheMirrorControl(element, kind)) return true;
            }
        }
        return false;
    }

    function handlePaheMirror() {
        const target = paheMirrorDestination();
        if (target) return redirectOnce(target);
        return handlePaheMirrorControls();
    }

    function handlePaheAdlink() {
        hookPaheAjax();
        const target = paheMirrorDestination();
        if (target) return redirectOnce(target);
        const form = document.querySelector('form#link-view');
        const action = form && form.querySelector('input[name="action"][value="captcha"]');
        if (form && action && paheCaptchaResponse()) return submitPaheCaptcha(form);
        return handlePaheMirrorControls();
    }

    function redirectOnce(value) {
        if (redirecting) return false;
        const target = externalDestination(value);
        if (!target || target === location.href) return false;
        try {
            const previous = JSON.parse(sessionStorage.getItem(LOCK_KEY) || 'null');
            if (previous && previous.url === target && Date.now() - previous.time < LOCK_TTL) return false;
            sessionStorage.setItem(LOCK_KEY, JSON.stringify({ url: target, time: Date.now() }));
        } catch (_) {
        }
        redirecting = true;
        stop();
        location.replace(target);
        return true;
    }

    function run() {
        if (redirecting) return;
        if (isPaheMirror) {
            handlePaheMirror();
            return;
        }
        if (isPaheAdlink) {
            handlePaheAdlink();
            return;
        }
        if (isTeknoAsian) {
            handleTeknoAsian();
            return;
        }
        if (isPahePlus) {
            handlePahePlus();
            return;
        }
        if (isLinegee) {
            handleLinegee();
            return;
        }
        if (isOuo) {
            handleOuo();
            return;
        }
        const target = tokenDestination();
        if (target) redirectOnce(target);
    }

    function startObserver() {
        if (redirecting || observer) return;
        if (!document.documentElement) {
            observerTimer = setTimeout(startObserver, 0);
            return;
        }
        observerTimer = 0;
        observer = new MutationObserver(run);
        observer.observe(document.documentElement, { childList: true, subtree: true });
        run();
    }

    if (isTeknoAsian && new URLSearchParams(location.search).has('ht')) markTeknoState();
    run();
    interval = setInterval(run, 100);
    timeout = setTimeout(stop, isPahePlus || isPaheAdlink || isOuo ? 600000 : isPaheMirror ? 120000 : 15000);
    startObserver();
})();
