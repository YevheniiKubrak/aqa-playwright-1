import {test as base} from "@playwright/test";
import GaragePage from "../pageObjects/garagePage/GaragePage";
import WelcomePage from "../pageObjects/welcomePage/WelcomePage";
import { USERS } from "../data/dict/users";

export const test = base.extend(({
    userGaragePage: async({page}, use)=>{
        const welcomePage = new WelcomePage(page);
        const popup = await welcomePage.openSignInPopup();
        await popup.login({
            email: USERS.OKEY_KOSS.email,
            password: USERS.OKEY_KOSS.password
        })

        const garagePage = new GaragePage(page);
        await use(garagePage); 

    }

}))