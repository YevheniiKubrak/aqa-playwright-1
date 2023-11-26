import { expect } from "@playwright/test";
import { test } from "../../../src/fixtures/test.fixture";
import { CUSTOM_PROFILE_RESPONSE_BODY } from "./fixtures/profileData";

test.describe("Garage page", ()=>{
    test('Frontend should show username returned in response', async ({userProfilePage})=>{
        const { page } = userProfilePage
        await page.route('/api/users/profile', async route => {
            route.fulfill({body: JSON.stringify(CUSTOM_PROFILE_RESPONSE_BODY)})
        })
        await page.reload();
        await page.pause();
        await expect(userProfilePage.userName).toHaveText(`${CUSTOM_PROFILE_RESPONSE_BODY.data.name} ${CUSTOM_PROFILE_RESPONSE_BODY.data.lastName}`)
    })
})