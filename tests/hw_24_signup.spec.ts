import { test, expect } from '@playwright/test';
import HomePage from '../pom/pages/HomePage';
import SignupForm from '../pom/forms/SignupForm';
import {SIGNUP_EMPTY_FIRST_NAME, SIGNUP_INVALID_FIRST_NAME, SIGNUP_VALIDATION_FIRST_NAME, SIGNUP_EMPTY_LAST_NAME, SIGNUP_INVALID_LAST_NAME, SIGNUP_VALIDATION_LAST_NAME, SIGNUP_EMPTY_EMAIL, SIGNUP_INVALID_EMAIL, SIGNUP_EMPTY_PASSWORD, SIGNUP_VALIDATION_PASSWORD, SIGNUP_EMPTY_RE_ENTER_PASSWORD, SIGNUP_VALIDATION_RE_ENTER_PASSWORD} from '../tests-examples/test-data/errors';
import { credentials } from '../tests-examples/test-data/userData';

test.describe.only('Sign up Form POM' , () => {
    let homePage: HomePage;
    let signupForm: SignupForm; 

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        signupForm = new SignupForm(page);
        await homePage.open();
        await homePage.clickSignupButton();
    });
    
        test('Title Registration', async ({ page }) => {
            await expect(page.locator('(//div[@class="modal-content"]//h4[@class="modal-title"])')).toHaveText('Registration');
        });

        test('Positive case. Success sign up', async ({ page }) => {
            await signupForm.signupWithCredentials(credentials.userOne.firstName, credentials.userOne.lastName, credentials.userOne.email, credentials.userOne.password, credentials.userOne.reEnterPassword);
            await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
        });
    
        test('1-1 Empty field Name. Border color red. Register button is disabled', async ({ page }) => {
            await signupForm.firstNameField.click();
            await signupForm.firstNameField.focus();
            await signupForm.firstNameField.blur();
            await expect(signupForm.errorFirstName).toHaveText(SIGNUP_EMPTY_FIRST_NAME);
            await expect(page.getByText(SIGNUP_EMPTY_FIRST_NAME)).toBeVisible();
            await expect(signupForm.firstNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled();
        });

        test('1-2 Field Name contains unsupported language. Border color red', async ({ page }) => {
            await signupForm.firstNameField.click();
            await signupForm.enterFirstName('авпвапвап');
            await signupForm.firstNameField.blur();
            await expect(signupForm.errorFirstName).toHaveText(SIGNUP_INVALID_FIRST_NAME);
            await expect(page.getByText(SIGNUP_INVALID_FIRST_NAME)).toBeVisible();
            await expect(signupForm.firstNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled();
        }); 
            
        test('1-3 Field Name contains space. Border color red', async ({ page }) => {
            await signupForm.firstNameField.click();
            await signupForm.enterFirstName('Anna Li');
            await signupForm.firstNameField.blur();
            await expect(signupForm.errorFirstName).toHaveText(SIGNUP_INVALID_FIRST_NAME);
            await expect(page.getByText(SIGNUP_INVALID_FIRST_NAME)).toBeVisible();
            await expect(signupForm.firstNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled();
        });

        test('1-4 Field Name contains 1 symbol. Border color red', async ({ page }) => {
            await signupForm.firstNameField.click();
            await signupForm.enterFirstName('A');
            await signupForm.firstNameField.blur();
            await expect(signupForm.errorFirstName).toHaveText(SIGNUP_VALIDATION_FIRST_NAME);
            await expect(page.getByText(SIGNUP_VALIDATION_FIRST_NAME)).toBeVisible();
            await expect(signupForm.firstNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled(); 
        });

        test('1-5 Field Name contains more than 20 symbols. Border color red', async ({ page }) => {
            await signupForm.firstNameField.click();
            await signupForm.enterFirstName('Qwertyuiopasdfghjklzx');
            await signupForm.firstNameField.blur();
            await expect(signupForm.errorFirstName).toHaveText(SIGNUP_VALIDATION_FIRST_NAME);
            await expect(page.getByText(SIGNUP_VALIDATION_FIRST_NAME)).toBeVisible();
            await expect(signupForm.firstNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled(); 
    });

    // ////////////////////

        test('2-1 Empty field Last Name. Border color red', async ({ page }) => {
                await signupForm.lastNameField.click();
                await signupForm.lastNameField.focus();
                await signupForm.lastNameField.blur();
                await expect(signupForm.errorLastName).toHaveText(SIGNUP_EMPTY_LAST_NAME);
                await expect(page.getByText(SIGNUP_EMPTY_LAST_NAME)).toBeVisible();
                await expect(signupForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
                await expect(signupForm.registerButton).toBeDisabled();
        });

        test('2-2 Field Last name contains unsupported language', async ({ page }) => {
            await signupForm.lastNameField.click();
            await signupForm.enterLastName('авпвапвап');
            await signupForm.lastNameField.blur();
            await expect(signupForm.errorLastName).toHaveText(SIGNUP_INVALID_LAST_NAME);
            await expect(page.getByText(SIGNUP_INVALID_LAST_NAME)).toBeVisible();
            await expect(signupForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled();
        }); 
        
    
        test('2-3 Field Last name contains space. Border color red', async ({ page }) => {
            await signupForm.lastNameField.click();
            await signupForm.enterLastName('Norman De');
            await signupForm.lastNameField.blur();
            await expect(signupForm.errorLastName).toHaveText(SIGNUP_INVALID_LAST_NAME);
            await expect(page.getByText(SIGNUP_INVALID_LAST_NAME)).toBeVisible();
            await expect(signupForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled();
        });

        test('2-4 Field Last name contains 1 symbol. Border color red', async ({ page }) => {
            await signupForm.lastNameField.click();
            await signupForm.enterLastName('N');
            await signupForm.lastNameField.blur();
            await expect(signupForm.errorLastName).toHaveText(SIGNUP_VALIDATION_LAST_NAME);
            await expect(page.getByText(SIGNUP_VALIDATION_LAST_NAME)).toBeVisible();
            await expect(signupForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled();
        });

        test('2-5 Field Last name contains more than 20 symbols. Border color red', async ({ page }) => {
            await signupForm.lastNameField.click();
            await signupForm.enterLastName('Qwertyuiopasdfghjklzx');
            await signupForm.lastNameField.blur();
            await expect(signupForm.errorLastName).toHaveText(SIGNUP_VALIDATION_LAST_NAME);
            await expect(page.getByText(SIGNUP_VALIDATION_LAST_NAME)).toBeVisible();
            await expect(signupForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled();
        });

    // ////////////////////

        test('3-1 Empty field Email. Border color red', async ({ page }) => {
            await signupForm.emailField.click();
            await signupForm.emailField.focus();
            await signupForm.emailField.blur();
            await expect(signupForm.errorEmail).toHaveText(SIGNUP_EMPTY_EMAIL);
            await expect(page.getByText(SIGNUP_EMPTY_EMAIL)).toBeVisible();
            await expect(signupForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled();
        });

        test('3-2 Incorrect format of Email (without @). Border color red', async ({ page }) => {
            await signupForm.emailField.click();
            await signupForm.enterEmail('golynska.iuliiagmail.com');
            await signupForm.emailField.blur();
            await expect(signupForm.errorEmail).toHaveText(SIGNUP_INVALID_EMAIL);
            await expect(page.getByText(SIGNUP_INVALID_EMAIL)).toBeVisible();
            await expect(signupForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled();
        });

        test('3-3 Incorrect format of Email (without .). Border color red', async ({ page }) => {
            await signupForm.emailField.click();
            await signupForm.enterEmail('golynska.iuliia@gmailcom');
            await signupForm.emailField.blur();
            await expect(signupForm.errorEmail).toHaveText(SIGNUP_INVALID_EMAIL);
            await expect(page.getByText(SIGNUP_INVALID_EMAIL)).toBeVisible();
            await expect(signupForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled();
        });

        test('3-4 Incorrect format of Email (location of special symbols). Border color red', async ({ page }) => {
            await signupForm.emailField.click();
            await signupForm.enterEmail('golynska.iuliia@gmailcom-');
            await signupForm.emailField.blur();
            await expect(signupForm.errorEmail).toHaveText(SIGNUP_INVALID_EMAIL);
            await expect(page.getByText(SIGNUP_INVALID_EMAIL)).toBeVisible();
            await expect(signupForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled();
        });

    // ////////////////////

        test('4-1 Empty field Password. Border color red', async ({ page }) => {
            await signupForm.passwordField.click();
            await signupForm.passwordField.focus();
            await signupForm.passwordField.blur();
            await expect(signupForm.errorPassword).toHaveText(SIGNUP_EMPTY_PASSWORD);
            await expect(page.getByText(SIGNUP_EMPTY_PASSWORD)).toBeVisible();
            await expect(signupForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled();
        });

        test('4-2 Wrong data of Password (7 symbols). Border color red', async ({ page }) => {
            await signupForm.passwordField.click();
            await signupForm.enterPassword('12345Cc');
            await signupForm.passwordField.blur();
            await expect(signupForm.errorPassword).toHaveText(SIGNUP_VALIDATION_PASSWORD);
            await expect(page.getByText(SIGNUP_VALIDATION_PASSWORD)).toBeVisible();
            await expect(signupForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled();
        });

        test('4-3 Wrong data of Password (16 symbols). Border color red', async ({ page }) => {
            await signupForm.passwordField.click();
            await signupForm.enterPassword('1234567890AaBbCc');
            await signupForm.passwordField.blur();
            await expect(signupForm.errorPassword).toHaveText(SIGNUP_VALIDATION_PASSWORD);
            await expect(page.getByText(SIGNUP_VALIDATION_PASSWORD)).toBeVisible();
            await expect(signupForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled();
        });

        test('4-4 Wrong data of Password (without integer). Border color red', async ({ page }) => {
            await signupForm.passwordField.click();
            await signupForm.enterPassword('AaBbCcDdEeFfGgH');
            await signupForm.passwordField.blur();
            await expect(signupForm.errorPassword).toHaveText(SIGNUP_VALIDATION_PASSWORD);
            await expect(page.getByText(SIGNUP_VALIDATION_PASSWORD)).toBeVisible();
            await expect(signupForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled();
        });

        test('4-5 Wrong data of Password (without capital letter). Border color red', async ({ page }) => {
            await signupForm.passwordField.click();
            await signupForm.enterPassword('1234567a');
            await signupForm.passwordField.blur();
            await expect(signupForm.errorPassword).toHaveText(SIGNUP_VALIDATION_PASSWORD);
            await expect(page.getByText(SIGNUP_VALIDATION_PASSWORD)).toBeVisible();
            await expect(signupForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled();
        });

        test('4-6 Wrong data of Password (without small letter). Border color red', async ({ page }) => {
            await signupForm.passwordField.click();
            await signupForm.enterPassword('1234567A');
            await signupForm.passwordField.blur();
            await expect(signupForm.errorPassword).toHaveText(SIGNUP_VALIDATION_PASSWORD);
            await expect(page.getByText(SIGNUP_VALIDATION_PASSWORD)).toBeVisible();
            await expect(signupForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled();
        });

        ////////////////////

        test('5-1 Empty field Re-enter password. Border color red', async ({ page }) => {
            await signupForm.reEnterPasswordField.click();
            await signupForm.reEnterPasswordField.focus();
            await signupForm.reEnterPasswordField.blur();
            await expect(signupForm.errorReEnterPassword).toHaveText(SIGNUP_EMPTY_RE_ENTER_PASSWORD);
            await expect(page.getByText(SIGNUP_EMPTY_RE_ENTER_PASSWORD)).toBeVisible();
            await expect(signupForm.reEnterPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled();
        });

        test('5-2 Passwords do not match. Border color red', async ({ page }) => {
            await signupForm.passwordField.click();
            await signupForm.enterPassword('1234567Aa');
            await signupForm.passwordField.blur();
            await signupForm.reEnterPasswordField.click();
            await signupForm.enterReEnterPassword('12345678Aa');
            await signupForm.reEnterPasswordField.blur();
            await expect(signupForm.errorReEnterPassword).toHaveText(SIGNUP_VALIDATION_RE_ENTER_PASSWORD);
            await expect(page.getByText(SIGNUP_VALIDATION_RE_ENTER_PASSWORD)).toBeVisible();
            await expect(signupForm.reEnterPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signupForm.registerButton).toBeDisabled();
        });

 
})