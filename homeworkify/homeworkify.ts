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
        let notRobotDiv = document.querySelector(
            ".message.success.loggedin"
        ) as HTMLElement;
        if (notRobotDiv !== null) {
            let notRobotButton = document.querySelector(
                ".captcha_container"
            ) as HTMLElement;
            notRobotButton?.click();
            observe.disconnect();
            console.log("disconnected");
        }
    });
    const target = document.querySelector("body") as HTMLElement;
    const config = { attributes: true, childList: true, subtree: true };
    observe.observe(target, config);
    
    let captchaInsert = document.querySelector('input[placeholder="Type here..."]') as HTMLInputElement;
    captchaInsert?.focus();
    authFlag = false
};

const main = () => {
    setTimeout(() => {
        var isAuthCalled = false;
        const linkInput = document.querySelector(".hw-header-input");
        const searchButton = document.querySelector(
            ".hw-header-button"
        ) as HTMLButtonElement;

        linkInput?.addEventListener("keydown", (e) => {
            let keyboardEvent = <KeyboardEvent>e;
            if (keyboardEvent.key === "Enter" && isAuthCalled === false) {
                isAuthCalled = true
                console.log("Enter pressed for search");
                searchButton?.click();
                captcha(isAuthCalled);
            }
        });
        
        searchButton.onclick = () => {
            if (isAuthCalled === false){
                isAuthCalled = true
                captcha(isAuthCalled);
            }
        };
    }, 200);
};

main();

export {};
