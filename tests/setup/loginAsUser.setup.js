import { USERS } from "../../src/data/dict/users";
import { test } from "../../src/fixtures/test.fixture";
import WelcomePage from "../../src/pageObjects/welcomePage/WelcomePage";
import { STORAGE_STATE_USER_PATH } from "../../src/data/storageState";

test('Login as user and save storag state', async ({page, context})=>{
    const welcomePage = new WelcomePage(page)
    await welcomePage.navigate()
    const popup = await welcomePage.openSignInPopup()
    await popup.login({
        email: USERS.OKEY_KOSS.email,
        password: USERS.OKEY_KOSS.password
    })
    await context.storageState({
        path: STORAGE_STATE_USER_PATH
    })
})