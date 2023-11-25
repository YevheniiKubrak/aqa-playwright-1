import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/test.fixture";

test.describe('Garage page', ()=>{
    test('user car is Audi TT', async({userGaragePage})=>{
        await expect(userGaragePage.firstCarName).toContainText('Audi TT')
    })
})