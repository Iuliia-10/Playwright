import { test, expect } from '@playwright/test';

const randomEmail = `golynska.iuliia+${Date.now()}@gmail.com`;

const selectors = {
    nameField: '//input[@id="signupName"]',
    lastNameField: '//input[@id="signupLastName"]',
    emailField: '//input[@id="signupEmail"]',
    passwordField: '//input[@id="signupPassword"]',
    reEnterPasswordField: '//input[@id="signupRepeatPassword"]',
    registerButton: '//div[@class="modal-content"]//button[contains(@class, "btn btn-primary")]',      
}


test.beforeEach(async ({page}) => {
    await page.goto('/');
    await page.getByText('Sign up').click();
})


test.describe('Sign up Form' , () => {
    
    test('Title Registration', async ({ page }) => {
        await expect(page.locator('(//div[@class="modal-content"]//h4[@class="modal-title"])')).toHaveText('Registration');
    });

    test('Positive case. Success sign up', async ({ page }) => {
        await page.locator(selectors.nameField).click();
        await page.locator(selectors.nameField).fill('Yulia');
        await page.locator(selectors.lastNameField).click();
        await page.locator(selectors.lastNameField).fill('Anna');
        await page.locator(selectors.emailField).click();
        await page.locator(selectors.emailField).fill(randomEmail);
        await page.locator(selectors.passwordField).click();
        await page.locator(selectors.passwordField).fill('1234567Bb!');
        await page.locator(selectors.reEnterPasswordField).click();
        await page.locator(selectors.reEnterPasswordField).fill('1234567Bb!');
        await expect(page.locator(selectors.registerButton)).toBeEnabled();
        await page.locator(selectors.registerButton).click();
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
        


    });
    
    test('1-1 Empty field Name. Border color red. Register button is disabled', async ({ page }) => {
        await page.locator(selectors.nameField).click();
        await page.locator(selectors.nameField).focus();
        await page.locator(selectors.nameField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[1]//div[@class="invalid-feedback"]//p')).toHaveText('Name required');
        await expect(page.locator(selectors.nameField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

    test('1-2 Field Name contains unsupported language. Border color red', async ({ page }) => {
        await page.locator(selectors.nameField).click();
        await page.locator(selectors.nameField).fill('авпвапвап');
        await page.locator(selectors.nameField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[1]//div[@class="invalid-feedback"]//p')).toHaveText('Name is invalid');
        await expect(page.locator(selectors.nameField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

    test('1-3 Field Name contains space. Border color red', async ({ page }) => {
        await page.locator(selectors.nameField).click();
        await page.locator(selectors.nameField).fill('Anna Li');
        await page.locator(selectors.nameField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[1]//div[@class="invalid-feedback"]//p')).toHaveText('Name is invalid');
        await expect(page.locator(selectors.nameField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

    test('1-4 Field Name contains 1 symbol. Border color red', async ({ page }) => {
        await page.locator(selectors.nameField).click();
        await page.locator(selectors.nameField).fill('A');
        await page.locator(selectors.nameField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[1]//div[@class="invalid-feedback"]//p')).toHaveText('Name has to be from 2 to 20 characters long');
        await expect(page.locator(selectors.nameField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

    test('1-5 Field Name contains more than 20 symbols. Border color red', async ({ page }) => {
        await page.locator(selectors.nameField).click();
        await page.locator(selectors.nameField).fill('Qwertyuiopasdfghjklzx');
        await page.locator(selectors.nameField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[1]//div[@class="invalid-feedback"]//p')).toHaveText('Name has to be from 2 to 20 characters long');
        await expect(page.locator(selectors.nameField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

    ////////////////////

    test('2-1 Empty field Last Name. Border color red', async ({ page }) => {
        await page.locator(selectors.lastNameField).click();
        await page.locator(selectors.lastNameField).focus();
        await page.locator(selectors.lastNameField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[2]//div[@class="invalid-feedback"]//p')).toHaveText('Last name required');
        await expect(page.locator(selectors.lastNameField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

    test('2-2 Field Last name contains unsupported language', async ({ page }) => {
        await page.locator(selectors.lastNameField).click();
        await page.locator(selectors.lastNameField).fill('авпвапвап');
        await page.locator(selectors.lastNameField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[2]//div[@class="invalid-feedback"]//p')).toHaveText('Last name is invalid');
        await expect(page.locator(selectors.lastNameField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });    

    test('2-3 Field Last name contains space. Border color red', async ({ page }) => {
        await page.locator(selectors.lastNameField).click();
        await page.locator(selectors.lastNameField).fill('Norman De');
        await page.locator(selectors.lastNameField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[2]//div[@class="invalid-feedback"]//p')).toHaveText('Last name is invalid');
        await expect(page.locator(selectors.lastNameField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

    test('2-4 Field Last name contains 1 symbol. Border color red', async ({ page }) => {
        await page.locator(selectors.lastNameField).click();
        await page.locator(selectors.lastNameField).fill('N');
        await page.locator(selectors.lastNameField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[2]//div[@class="invalid-feedback"]//p')).toHaveText('Last name has to be from 2 to 20 characters long');
        await expect(page.locator(selectors.lastNameField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

    test('2-5 Field Last name contains more than 20 symbols. Border color red', async ({ page }) => {
        await page.locator(selectors.lastNameField).click();
        await page.locator(selectors.lastNameField).fill('Qwertyuiopasdfghjklzx');
        await page.locator(selectors.lastNameField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[2]//div[@class="invalid-feedback"]//p')).toHaveText('Last name has to be from 2 to 20 characters long');
        await expect(page.locator(selectors.lastNameField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

    ////////////////////

    test('3-1 Empty field Email. Border color red', async ({ page }) => {
        await page.locator(selectors.emailField).click();
        await page.locator(selectors.emailField).focus();
        await page.locator(selectors.emailField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[3]//div[@class="invalid-feedback"]//p')).toHaveText('Email required');
        await expect(page.locator(selectors.emailField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

    test('3-2 Incorrect format of Email (without @). Border color red', async ({ page }) => {
        await page.locator(selectors.emailField).click();
        await page.locator(selectors.emailField).fill('golynska.iuliiagmail.com');
        await page.locator(selectors.emailField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[3]//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
        await expect(page.locator(selectors.emailField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

    test('3-3 Incorrect format of Email (without .). Border color red', async ({ page }) => {
        await page.locator(selectors.emailField).click();
        await page.locator(selectors.emailField).fill('golynska.iuliia@gmailcom');
        await page.locator(selectors.emailField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[3]//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
        await expect(page.locator(selectors.emailField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

    test('3-4 Incorrect format of Email (location of special symbols). Border color red', async ({ page }) => {
        await page.locator(selectors.emailField).click();
        await page.locator(selectors.emailField).fill('golynska.iuliia@gmailcom-');
        await page.locator(selectors.emailField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[3]//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
        await expect(page.locator(selectors.emailField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

    ////////////////////

    test('4-1 Empty field Password. Border color red', async ({ page }) => {
        await page.locator(selectors.passwordField).click();
        await page.locator(selectors.passwordField).focus();
        await page.locator(selectors.passwordField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[4]//div[@class="invalid-feedback"]//p')).toHaveText('Password required');
        await expect(page.locator(selectors.passwordField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

    test('4-2 Wrong data of Password (7 symbols). Border color red', async ({ page }) => {
        await page.locator(selectors.passwordField).click();
        await page.locator(selectors.passwordField).fill('12345Aa');
        await page.locator(selectors.passwordField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[4]//div[@class="invalid-feedback"]//p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(page.locator(selectors.passwordField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

    test('4-3 Wrong data of Password (16 symbols). Border color red', async ({ page }) => {
        await page.locator(selectors.passwordField).click();
        await page.locator(selectors.passwordField).fill('1234567890AaBbCc');
        await page.locator(selectors.passwordField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[4]//div[@class="invalid-feedback"]//p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(page.locator(selectors.passwordField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

    test('4-4 Wrong data of Password (without integer). Border color red', async ({ page }) => {
        await page.locator(selectors.passwordField).click();
        await page.locator(selectors.passwordField).fill('AaBbCcDdEeFfGgH');
        await page.locator(selectors.passwordField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[4]//div[@class="invalid-feedback"]//p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(page.locator(selectors.passwordField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

    test('4-5 Wrong data of Password (without capital letter). Border color red', async ({ page }) => {
        await page.locator(selectors.passwordField).click();
        await page.locator(selectors.passwordField).fill('1234567a');
        await page.locator(selectors.passwordField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[4]//div[@class="invalid-feedback"]//p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(page.locator(selectors.passwordField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

    test('4-6 Wrong data of Password (without small letter). Border color red', async ({ page }) => {
        await page.locator(selectors.passwordField).click();
        await page.locator(selectors.passwordField).fill('1234567A');
        await page.locator(selectors.passwordField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[4]//div[@class="invalid-feedback"]//p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(page.locator(selectors.passwordField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

    ////////////////////

    test('5-1 Empty field Re-enter password. Border color red', async ({ page }) => {
        await page.locator(selectors.reEnterPasswordField).click();
        await page.locator(selectors.reEnterPasswordField).focus();
        await page.locator(selectors.reEnterPasswordField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[5]//div[@class="invalid-feedback"]//p')).toHaveText('Re-enter password required');
        await expect(page.locator(selectors.reEnterPasswordField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

    test('5-2 Passwords do not match. Border color red', async ({ page }) => {
        await page.locator(selectors.passwordField).click();
        await page.locator(selectors.passwordField).fill('1234567Aa');
        await page.locator(selectors.passwordField).blur();
        await page.locator(selectors.reEnterPasswordField).click();
        await page.locator(selectors.reEnterPasswordField).fill('11234567Aa');
        await page.locator(selectors.reEnterPasswordField).blur();
        await expect(page.locator('(//div[@class="modal-content"]//div[@class="form-group"])[5]//div[@class="invalid-feedback"]//p')).toHaveText('Passwords do not match');
        await expect(page.locator(selectors.reEnterPasswordField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });

 
})