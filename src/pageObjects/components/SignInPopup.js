import BaseComponent from "../BaseComponent.js";
import {expect} from "@playwright/test";

export default class SignInPopup extends BaseComponent {

    constructor(page) {
        super(page, page.locator('app-signin-modal'));
        this.emailInput = this._container.locator('input#signinEmail')
        this.passwordInput = this._container.locator('input#signinPassword')
        this.loginButton = this._container.locator('.btn-primary')
        this.errorMessage = this._container.locator('.invalid-feedback')
    }

    async login({email, password}){
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
        await expect(this._page).toHaveURL(/panel\/garage/)
    }

    async fillSignInForm({email, password, switchFocus}){
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        if (switchFocus) await this.passwordInput.blur()
    }

}