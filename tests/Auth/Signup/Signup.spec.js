import { fa, faker } from '@faker-js/faker';
import {expect, test} from "@playwright/test";
import WelcomePage from '../../../src/pageObjects/welcomePage/WelcomePage';

test.describe('Account creation @smoke', ()=>{
    let page
    let welcomePage
    let signUpPopup

        test.beforeAll(async ({browser})=>{
        const context = await browser.newContext({
                    viewport: {
                        width: 1920,
                        height: 1080
                    }
        })

        page = await context.newPage()
        welcomePage = new WelcomePage(page)
    })

    test.beforeEach(async ()=>{
        await welcomePage.open()
        await welcomePage.waitLoaded()
    })

    test('Successful Signup', async({page})=> {
        const signUpData = {
            name: faker.person.firstName(), 
            lastName: faker.person.lastName(),
            email: faker.internet.email({firstName : 'aqa'}),
            password: faker.internet.password({length: 9, prefix: 'Qw1'})
        }
        signUpPopup = await welcomePage.openSignupPopup()
        await signUpPopup.createAccount(signUpData)
        }
    )
});

test.describe('Sign up validation @regression', ()=>{
    let page
    let welcomePage
    let signUpPopup
    let redBorder = 'rgb(220, 53, 69)'

        test.beforeAll(async ({browser})=>{
        const context = await browser.newContext({
                    viewport: {
                        width: 1920,
                        height: 1080
                    }
        })

        page = await context.newPage()
        welcomePage = new WelcomePage(page)
    })

    test.beforeEach(async ()=>{
        await welcomePage.open()
        await welcomePage.waitLoaded()
    })

    test('Should show error message when firstname is empty', async({page})=>{
        const password= faker.internet.password({length: 9, prefix: 'Qw1'})
        const signUpData = {
            name: '',
            lastName: faker.person.lastName(),
            email: faker.internet.email({firstName : 'aqa'}),
            password,
            reenterPassword: password
        }

        signUpPopup = await welcomePage.openSignupPopup()
        await signUpPopup.fillSignupForm(signUpData)
        await expect(signUpPopup.registerButton, "Register button should be disabled").toBeDisabled()
        await expect(signUpPopup.errorMessage, "Error message should be shown when user hasn't entered a name").toHaveText('Name required')
        await expect(signUpPopup.nameInput).toHaveCSS('border-color', redBorder)
    });

    test('Should show error message when lastname is longer than 20 characters', async({page})=>{
        const password= faker.internet.password({length: 9, prefix: 'Qw1'})
        const signUpData = {
            name: faker.person.firstName(), 
            lastName: faker.string.fromCharacters('abc', 21),
            email: faker.internet.email({firstName : 'aqa'}),
            password,
            reenterPassword: password
        }

        signUpPopup = await welcomePage.openSignupPopup()
        await signUpPopup.fillSignupForm(signUpData)
        await expect(signUpPopup.registerButton, "Register button should be disabled").toBeDisabled()
        await expect(signUpPopup.errorMessage, "Error message should be shown when user has entered lastname longer than 20 charecters").toHaveText('Last name has to be from 2 to 20 characters long')
        await expect(signUpPopup.lastNameInput).toHaveCSS('border-color', redBorder)
    });

    test('Should show error message when email has no @', async({page})=>{
        const password= faker.internet.password({length: 9, prefix: 'Qw1'})
        const signUpData = {
            name: faker.person.firstName(), 
            lastName: faker.person.lastName(),
            email: 'email.com',
            password,
            reenterPassword: password        
        }

        signUpPopup = await welcomePage.openSignupPopup()
        await signUpPopup.fillSignupForm(signUpData)
        await expect(signUpPopup.registerButton, "Register button should be disabled").toBeDisabled()
        await expect(signUpPopup.errorMessage, "Error message should be shown when user has entered invalid email").toHaveText('Email is incorrect')
        await expect(signUpPopup.emailInput).toHaveCSS('border-color', redBorder)
    });

    test('Should show error message when password has no numbers', async({page})=>{
        const password= 'Qwertyuiopa'
        const signUpData = {
            name: faker.person.firstName(), 
            lastName: faker.person.lastName(),
            email: faker.internet.email({firstName : 'aqa'}),
            password,
            reenterPassword: password             
        }

        signUpPopup = await welcomePage.openSignupPopup()
        await signUpPopup.fillSignupForm(signUpData)
        await expect(signUpPopup.registerButton, "Register button should be disabled").toBeDisabled()
        await expect(signUpPopup.errorMessage, "Error message should be shown when user has entered password without numbers").toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        await expect(signUpPopup.passwordInput).toHaveCSS('border-color', redBorder)
    });

    test('Should show error message when password do not match', async({page})=>{
        const signUpData = {
            name: faker.person.firstName(), 
            lastName: faker.person.lastName(),
            email: faker.internet.email({firstName : 'aqa'}),
            password: faker.internet.password({length: 9, prefix: 'Qw1'}),
            reenterPassword: 'Qwertyuiopasd1',
            switchFocus: true
        }

        signUpPopup = await welcomePage.openSignupPopup()
        await signUpPopup.fillSignupForm(signUpData)
        await expect(signUpPopup.registerButton, "Register button should be disabled").toBeDisabled()
        await expect(signUpPopup.errorMessage, "Error message should be shown when user has password do not match").toHaveText('Passwords do not match')
        await expect(signUpPopup.reenterInput).toHaveCSS('border-color', redBorder)
    });
});