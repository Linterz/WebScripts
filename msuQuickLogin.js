// ==UserScript==
// @name        MSU quick login
// @namespace   Violentmonkey Scripts
// @match       https://s1.lite.msu.edu/adm/roles?source=login
// @match       https://loncapa.msu.edu/adm/login
// @match       https://d2l.msu.edu/d2l/loginh/*
// @match       https://student.msu.edu/splash.html
// @match       https://auth.msu.edu/app/*
// @grant       MIT
// @version     1.0
// @author      Linterz
// ==/UserScript==
const auth = () => {
    setTimeout(() => { }, 300);
    const observer = new MutationObserver(() => {
        let recieveSmsCode = document.querySelector("input[value='Receive a code via SMS']");
        if (recieveSmsCode !== null) {
            recieveSmsCode.click();
            observer.disconnect();
            console.log("disconnected");
        }
    });
    const target = document.querySelector("body");
    const config = { attributes: true, childList: true, subtree: true };
    observer.observe(target, config);
};
const main = () => {
    var url = window.location.href;
    setTimeout(() => {
        if (url.split("/")[2] === "d2l.msu.edu") {
            url = url.split("/").slice(0, 5).toString();
        }
        console.log("in intimeout");
        switch (url) {
            case "https://s2.lite.msu.edu/adm/roles?source=login":
                let selectButton = document.getElementsByName("stmsu7Z2535691a0b16369msul1001")[0];
                selectButton.click();
                break;
            case "https://loncapa.msu.edu/adm/login":
                let loginButton = document.getElementById("LC_sso_login_link");
                let hrefLink = loginButton === null || loginButton === void 0 ? void 0 : loginButton.getAttribute("href");
                window.location.replace(hrefLink);
                break;
            case "https:,,d2l.msu.edu,d2l,loginh":
                let loginbutton = document.getElementById("loginUrl1");
                let hreflink = loginbutton === null || loginbutton === void 0 ? void 0 : loginbutton.getAttribute("href");
                window.location.replace(hreflink);
                break;
            case "https://student.msu.edu/splash.html":
                let loginbutton1 = document.getElementById("loginUrl1");
                let hreflink2 = loginbutton1 === null || loginbutton1 === void 0 ? void 0 : loginbutton1.getAttribute("href");
                window.location.replace(hreflink2);
                break;
            default:
                console.log("outed");
        }
    }, 50);
    var url = window.location.href;
    if (url.split("/")[2] === "auth.msu.edu") {
        auth();
    }
};
main();
export {};
