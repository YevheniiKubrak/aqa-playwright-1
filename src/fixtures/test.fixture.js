import {test as base, request} from "@playwright/test";
import GaragePage from "../pageObjects/garagePage/GaragePage";
import { STORAGE_STATE_USER_PATH } from "../data/storageState";
import ProfilePage from "../pageObjects/profilePage/ProfilePage";

export const test = base.extend(({
    userProfilePage: async ({browser}, use)=>{
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })
        const page = await ctx.newPage()
        const profilePage = new ProfilePage(page)
        await profilePage.navigate()
        await use(profilePage)
    },

    userGaragePage: async({browser}, use)=>{
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })
        const page = await ctx.newPage()
        const garagePage = new GaragePage(page);
        await garagePage.navigate();
        await use(garagePage); 
    },
    userAPIClient: async ({},use)=>{
            const ctx = await request.newContext({
                storageState: STORAGE_STATE_USER_PATH
            })
            await use(ctx)

           await ctx.dispose()
        }
    })
)