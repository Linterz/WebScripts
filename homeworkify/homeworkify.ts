// ==UserScript==
// @name        quick homeworkify
// @match       https://homeworkify.net/
// @grant       MIT
// @version     1.0
// @author      Linterz
// ==/UserScript==

const captchaSubmit = (capInsert) => {
    let captchaButton = document.getElementById(
        "verify-captcha"
    ) as HTMLButtonElement;

    capInsert.addEventListener("keydown", (e) => {
        let keyboardEvent = <KeyboardEvent>e;
        if (keyboardEvent.key === "Enter") {
            console.log("Enter pressed for captcha");
            captchaButton.click();
            setTimeout(() => {
                console.log("pressed view solution");

                let viewSolution = document.getElementById(
                    "view-solution"
                ) as HTMLButtonElement;

                viewSolution?.click();
            }, 300);
        }
    });
};

const captcha = () => {
    console.log("in captcha");

    const observer = new MutationObserver(() => {
        let notRobotDiv = document.querySelector(
            ".message.success.loggedin"
        ) as HTMLElement;
        if (notRobotDiv !== null) {
            let notRobotButton = document.querySelector(
                ".captcha_container"
            ) as HTMLElement;
            notRobotButton?.click();
            observer.disconnect();
            console.log("disconnected");
        }
    });
    const target = document.querySelector("body") as HTMLElement;
    const config = { attributes: true, childList: true, subtree: true };
    observer.observe(target, config);

    var captchaInsert = document.getElementById(
        "cp-user-input"
    ) as HTMLInputElement;

    const observer2 = new MutationObserver(() => {
        captchaInsert = document.getElementById(
            "cp-user-input"
        ) as HTMLInputElement;

        if (captchaInsert !== null) {
            captchaInsert.focus();
            observer2.disconnect();
            console.log("disconnected2");
            captchaSubmit(captchaInsert);
        }
    });
    const target2 = document.querySelector("body") as HTMLElement;
    const config2 = { attributes: true, childList: true, subtree: true };
    observer2.observe(target2, config2);
};

const main = () => {
    if (document.readyState === "complete") {
        var isAuthCalled = false;
        const linkInput = document.querySelector(
            ".hw-header-input"
        ) as HTMLInputElement;
        const searchButton = document.querySelector(
            ".hw-header-button"
        ) as HTMLButtonElement;
        linkInput?.focus();
        linkInput?.addEventListener("keydown", (e) => {
            let keyboardEvent = <KeyboardEvent>e;
            if (keyboardEvent.key === "Enter" && isAuthCalled === false) {
                isAuthCalled = true;
                console.log("Enter pressed for search");
                searchButton?.click();
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
    } else {
        console.log("not complete");
        setTimeout(() => {
            main();
        }, 200);
    }
};

main();

export {};
