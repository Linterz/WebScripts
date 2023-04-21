// ==UserScript==
// @name        New script - homeworkify.net
// @match       https://homeworkify.net/
// @grant       none
// @version     1.0
// @author      Linterz
// ==/UserScript==
const captcha = (authFlag) => {
    console.log("in captcha");
    const observe = new MutationObserver(() => {
        let notRobotDiv = document.querySelector(".message.success.loggedin");
        if (notRobotDiv !== null) {
            let notRobotButton = document.querySelector(".captcha_container");
            notRobotButton === null || notRobotButton === void 0 ? void 0 : notRobotButton.click();
            observe.disconnect();
            console.log("disconnected");
        }
    });
    const target = document.querySelector("body");
    const config = { attributes: true, childList: true, subtree: true };
    observe.observe(target, config);
    let captchaInsert = document.querySelector('input[placeholder="Type here..."]');
    captchaInsert === null || captchaInsert === void 0 ? void 0 : captchaInsert.focus();
    authFlag = false;
};
const main = () => {
    setTimeout(() => {
        var isAuthCalled = false;
        const linkInput = document.querySelector(".hw-header-input");
        const searchButton = document.querySelector(".hw-header-button");
        linkInput === null || linkInput === void 0 ? void 0 : linkInput.addEventListener("keydown", (e) => {
            let keyboardEvent = e;
            if (keyboardEvent.key === "Enter" && isAuthCalled === false) {
                isAuthCalled = true;
                console.log("Enter pressed for search");
                searchButton === null || searchButton === void 0 ? void 0 : searchButton.click();
                captcha(isAuthCalled);
            }
        });
        searchButton.onclick = () => {
            if (isAuthCalled === false) {
                isAuthCalled = true;
                captcha(isAuthCalled);
            }
        };
    }, 200);
};
main();
export {};
