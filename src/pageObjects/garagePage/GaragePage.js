import { expect } from "@playwright/test";
import BasePage from "../BasePage";


export default class GaragePage extends BasePage {
    constructor(page) {
        super(page, '/panel/garage', page.locator('button', {hasText: 'Add car'}));
        this.addCarButton = this._page.locator('button', {hasText: 'Add car'});
        this.firstCarName = this._page.locator('p.car_name');
    }
}