import { fa, faker } from '@faker-js/faker';
import {expect, test} from "@playwright/test";


test.describe('Account creation', ()=>{
    test('Successful Signup', async({page})=> {
        const user = {
            firstName: faker.person.firstName(), 
            lastName: faker.person.lastName(),
            email: faker.internet.email({firstName : 'aqa'}),
            password: faker.internet.password({length: 9, prefix: 'Qw1'})
        }
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, "Registration link should be visible").toBeVisible()
        await signUpButton.click()

        const popup = page.locator('div.modal-dialog')
        await expect(popup, "Registration in popup should be visible").toBeVisible()

        const nameInput = popup.locator('input#signupName')
        const lastNameInput = popup.locator('input#signupLastName')
        const emailInput = popup.locator('input#signupEmail')
        const passwordInput = popup.locator('input#signupPassword')
        const reenterInput = popup.locator('input#signupRepeatPassword')
        const registerButton = popup.locator('.btn-primary')

        
        await nameInput.fill(user.firstName)
        await lastNameInput.fill(user.lastName)
        await emailInput.fill(user.email)
        await passwordInput.fill(user.password)
        await reenterInput.fill(user.password)
        await expect(registerButton, "Register button should be Enabled").toBeEnabled()
        await registerButton.click()

        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage')
        }
    )
});

test.describe('Sign up validation', ()=>{
    test('Should show error message when firstname is empty', async({page})=>{
        const user = {
            firstName: '', 
            lastName: faker.person.lastName(),
            email: faker.internet.email({firstName : 'aqa'}),
            password: faker.internet.password({length: 9, prefix: 'Qw1'})
        }
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, "Registration link should be visible").toBeVisible()
        await signUpButton.click()

        const popup = page.locator('div.modal-dialog')
        await expect(popup, "Registration in popup should be visible").toBeVisible()

        const nameInput = popup.locator('input#signupName')
        const lastNameInput = popup.locator('input#signupLastName')
        const emailInput = popup.locator('input#signupEmail')
        const passwordInput = popup.locator('input#signupPassword')
        const reenterInput = popup.locator('input#signupRepeatPassword')
        const registerButton = popup.locator('.btn-primary')

        await nameInput.fill(user.firstName)
        await lastNameInput.fill(user.lastName)
        await emailInput.fill(user.email)
        await passwordInput.fill(user.password)
        await reenterInput.fill(user.password)
        await expect(registerButton, "Register button should be disabled").toBeDisabled()

        const firstNameErrorMessage = popup.locator('div.invalid-feedback')
        await expect(firstNameErrorMessage, "Error message should be shown when user hasn't entered a name").toHaveText('Name required')
        await expect(nameInput, "First name input should have red border when user hasn't entered a name").toHaveCSS('border-color', 'rgb(220, 53, 69)')

    });

    test('Should show error message when lastname is longer than 20 characters', async({page})=>{
        const user = {
            firstName: faker.person.firstName(), 
            lastName: faker.string.fromCharacters('abc', 21),
            email: faker.internet.email({firstName : 'aqa'}),
            password: faker.internet.password({length: 9, prefix: 'Qw1'})
        }
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, "Registration link should be visible").toBeVisible()
        await signUpButton.click()

        const popup = page.locator('div.modal-dialog')
        await expect(popup, "Registration in popup should be visible").toBeVisible()

        const nameInput = popup.locator('input#signupName')
        const lastNameInput = popup.locator('input#signupLastName')
        const emailInput = popup.locator('input#signupEmail')
        const passwordInput = popup.locator('input#signupPassword')
        const reenterInput = popup.locator('input#signupRepeatPassword')
        const registerButton = popup.locator('.btn-primary')

        await nameInput.fill(user.firstName)
        await lastNameInput.fill(user.lastName)
        await emailInput.fill(user.email)
        await passwordInput.fill(user.password)
        await reenterInput.fill(user.password)
        await expect(registerButton, "Register button should be disabled").toBeDisabled()

        const lastNameErrorMessage = popup.locator('div.invalid-feedback')
        await expect(lastNameErrorMessage, "Error message should be shown when user has entered lastname longer than 20 charecters").toHaveText('Last name has to be from 2 to 20 characters long')
        await expect(lastNameInput, "Last name input should have red border when user hasentered lastname longer than 20 charecters").toHaveCSS('border-color', 'rgb(220, 53, 69)')
    });

    
    test('Should show error message when email has no @', async({page})=>{
        const user = {
            firstName: faker.person.firstName(), 
            lastName: faker.person.lastName(),
            email: 'email.com',
            password: faker.internet.password({length: 9, prefix: 'Qw1'})
        }
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, "Registration link should be visible").toBeVisible()
        await signUpButton.click()

        const popup = page.locator('div.modal-dialog')
        await expect(popup, "Registration in popup should be visible").toBeVisible()

        const nameInput = popup.locator('input#signupName')
        const lastNameInput = popup.locator('input#signupLastName')
        const emailInput = popup.locator('input#signupEmail')
        const passwordInput = popup.locator('input#signupPassword')
        const reenterInput = popup.locator('input#signupRepeatPassword')
        const registerButton = popup.locator('.btn-primary')

        await nameInput.fill(user.firstName)
        await lastNameInput.fill(user.lastName)
        await emailInput.fill(user.email)
        await passwordInput.fill(user.password)
        await reenterInput.fill(user.password)
        await expect(registerButton, "Register button should be disabled").toBeDisabled()

        const emailErrorMessage = popup.locator('div.invalid-feedback')
        await expect(emailErrorMessage, "Error message should be shown when user has entered invalid email").toHaveText('Email is incorrect')
        await expect(emailInput, "Email input should have red border when user has entered invalid email").toHaveCSS('border-color', 'rgb(220, 53, 69)')
    });

    test('Should show error message when password has no numbers', async({page})=>{
        const user = {
            firstName: faker.person.firstName(), 
            lastName: faker.person.lastName(),
            email: faker.internet.email({firstName : 'aqa'}),
            password: 'Qwertyuiopa'
        }
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, "Registration link should be visible").toBeVisible()
        await signUpButton.click()

        const popup = page.locator('div.modal-dialog')
        await expect(popup, "Registration in popup should be visible").toBeVisible()

        const nameInput = popup.locator('input#signupName')
        const lastNameInput = popup.locator('input#signupLastName')
        const emailInput = popup.locator('input#signupEmail')
        const passwordInput = popup.locator('input#signupPassword')
        const reenterInput = popup.locator('input#signupRepeatPassword')
        const registerButton = popup.locator('.btn-primary')

        await nameInput.fill(user.firstName)
        await lastNameInput.fill(user.lastName)
        await emailInput.fill(user.email)
        await passwordInput.fill(user.password)
        await reenterInput.fill(user.password)
        await expect(registerButton, "Register button should be disabled").toBeDisabled()

        const passwordErrorMessage = popup.locator('div.invalid-feedback')
        await expect(passwordErrorMessage, "Error message should be shown when user has entered password without numbers").toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        await expect(passwordInput, "Password input should have red border when user has entered invalid password").toHaveCSS('border-color', 'rgb(220, 53, 69)')
    });

    test('Should show error message when password do not match', async({page})=>{
        const user = {
            firstName: faker.person.firstName(), 
            lastName: faker.person.lastName(),
            email: faker.internet.email({firstName : 'aqa'}),
            password: faker.internet.password({length: 9, prefix: 'Qw1'}),
            reenterPassword: 'Qwertyuiopasdf1'
        }
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, "Registration link should be visible").toBeVisible()
        await signUpButton.click()

        const popup = page.locator('div.modal-dialog')
        await expect(popup, "Registration in popup should be visible").toBeVisible()

        const nameInput = popup.locator('input#signupName')
        const lastNameInput = popup.locator('input#signupLastName')
        const emailInput = popup.locator('input#signupEmail')
        const passwordInput = popup.locator('input#signupPassword')
        const reenterInput = popup.locator('input#signupRepeatPassword')
        const registerButton = popup.locator('.btn-primary')

        await nameInput.fill(user.firstName)
        await lastNameInput.fill(user.lastName)
        await emailInput.fill(user.email)
        await passwordInput.fill(user.password)
        await reenterInput.fill(user.reenterPassword)
        await nameInput.focus()
        await expect(registerButton, "Register button should be disabled").toBeDisabled()

        const passwordReenterErrorMessage = popup.locator('div.invalid-feedback')
        await expect(passwordReenterErrorMessage, "Error message should be shown when user has password do not match").toHaveText('Passwords do not match')
        await expect(reenterInput, "Password reenter input should have red border when password do not match").toHaveCSS('border-color', 'rgb(220, 53, 69)')
    });
});