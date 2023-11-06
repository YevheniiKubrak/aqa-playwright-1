import BasePage from "../BasePage.js";
import {expect} from "@playwright/test";
import SignUpPopup from "../components/SignUpPopup.js";


export default class WelcomePage extends BasePage {
    constructor(page) {
        super(page, '/', page.locator('button', {hasText: 'Guest log in'}));
    }

    async openSignupPopup(){
        const signUpButton = this._page.locator('button:text("Sign up")');
        await expect(signUpButton, "Registration link should be visible").toBeVisible();
        await signUpButton.click();
        return new SignUpPopup(this._page)
    }
}