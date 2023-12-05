import {test as base, request} from "@playwright/test";
import GaragePage from "../pageObjects/garagePage/GaragePage";
import { STORAGE_STATE_USER_PATH } from "../data/storageState";
import ProfilePage from "../pageObjects/profilePage/ProfilePage";
import { CookieJar } from "tough-cookie";
import AuthController from "../controllers/AuthController";
import { USERS } from "../data/dict/users";
import CarController from "../controllers/CarController";
import UserController from "../controllers/UserController";
import { config } from "../../config/config";

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
        },
        client: async ({page}, use)=>{
            const cookie = new CookieJar()
            const options = {
                baseUrl: config.apiURL,
                cookies: cookie
            }
            const authController = new AuthController(options)
            await authController.signIn({
                email: USERS.OKEY_KOSS.email,
                password: USERS.OKEY_KOSS.password,
            })
            await use({
                cars: new CarController(options),
                auth: authController
            })
        },
        clientWithUser: async ({page}, use)=>{
          async  function getClient(userData){
                const cookie = new CookieJar()
                const options = {
                    baseUrl: config.apiURL,
                    cookies: cookie
                }
                const authController = new AuthController(options)
                await authController.signIn(userData)
    
              return {
                  cars: new CarController(options),
                  auth: authController
              }
            }
            await use(getClient)
        },
        clientWithNewUser: async ({page}, use)=>{
            const userData = {
                "name": faker.person.firstName(),
                "lastName": faker.person.lastName(),
                "email": faker.internet.email({firstName : 'aqa'}),
                "password": "Qwerty12345",
                "repeatPassword": "Qwerty12345"
            }
            console.log(userData.email)
            const cookie = new CookieJar()
            const options = {
                baseUrl: config.apiURL,
                cookies: cookie
            }
            const authController = new AuthController(options)
            const userController = new UserController(options)
            await authController.signUp(userData)
            await authController.signIn({
                email: userData.email,
                password: userData.password,
            })
            await use({
                cars: new CarController(options),
                auth: authController,
                users: userController
            })
    
            await userController.deleteCurrentUser()
        },
        unauthorizedClient : async ({page}, use) => {
            const options = {
                baseUrl: config.apiURL,
            }
            const authController = new AuthController(options)
            await use({
                cars: new CarController(options),
                auth: authController
            })
        }
            
    })
)