// ==UserScript==
// @name        Homeworkify.net
// @match       https://homeworkify.net/
// @grant       none
// @version     1.0
// @author
// ==/UserScript==
const captchaSubmit = (capInsert) => {
    let captchaButton = document.getElementById("verify-captcha");
    capInsert.addEventListener("keydown", (e) => {
        let keyboardEvent = e;
        if (keyboardEvent.key === "Enter") {
            console.log("Enter pressed for captcha");
            captchaButton.click();
            setTimeout(() => {
                console.log("pressed view solution");
                let viewSolution = document.getElementById("view-solution");
                viewSolution === null || viewSolution === void 0 ? void 0 : viewSolution.click();
            }, 300);
        }
    });
};
const captcha = () => {
    console.log("in captcha");
    const observer = new MutationObserver(() => {
        let notRobotDiv = document.querySelector(".message.success.loggedin");
        if (notRobotDiv !== null) {
            let notRobotButton = document.querySelector(".captcha_container");
            notRobotButton === null || notRobotButton === void 0 ? void 0 : notRobotButton.click();
            observer.disconnect();
            console.log("disconnected");
        }
    });
    const target = document.querySelector("body");
    const config = { attributes: true, childList: true, subtree: true };
    observer.observe(target, config);
    var captchaInsert = document.getElementById("cp-user-input");
    const observer2 = new MutationObserver(() => {
        captchaInsert = document.getElementById("cp-user-input");
        if (captchaInsert !== null) {
            captchaInsert.focus();
            observer2.disconnect();
            console.log("disconnected2");
            captchaSubmit(captchaInsert);
        }
    });
    const target2 = document.querySelector("body");
    const config2 = { attributes: true, childList: true, subtree: true };
    observer2.observe(target2, config2);
};
const main = () => {
    if (document.readyState === "complete") {
        var isAuthCalled = false;
        const linkInput = document.querySelector(".hw-header-input");
        const searchButton = document.querySelector(".hw-header-button");
        linkInput === null || linkInput === void 0 ? void 0 : linkInput.focus();
        linkInput === null || linkInput === void 0 ? void 0 : linkInput.addEventListener("keydown", (e) => {
            let keyboardEvent = e;
            if (keyboardEvent.key === "Enter" && isAuthCalled === false) {
                isAuthCalled = true;
                console.log("Enter pressed for search");
                searchButton === null || searchButton === void 0 ? void 0 : searchButton.click();
                captcha();
                main();
            }
        });
        searchButton.onclick = () => {
            if (isAuthCalled === false) {
                isAuthCalled = true;
                captcha();
                main();
            }
        };
        console.log("in main");
    }
    else {
        console.log("not complete");
        setTimeout(() => {
            main();
        }, 200);
    }
};
main();
export {};
