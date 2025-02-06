import { expect, Locator, Page } from '@playwright/test';
import { text } from 'stream/consumers';


export default class HomePage{
    readonly page : Page;

    readonly firstNameField: Locator;
    readonly errorFirstName: Locator;
    
    readonly lastNameField: Locator;
    readonly errorLastName: Locator;
    
    readonly emailField: Locator;
    readonly errorEmail: Locator;
    
    readonly passwordField: Locator;
    readonly errorPassword: Locator;
    
    readonly reEnterPasswordField: Locator;
    readonly errorReEnterPassword: Locator;
    
    readonly registerButton: Locator;

    constructor(page : Page) {
        this.page = page;

        this.firstNameField = page.locator('//input[@id="signupName"]');
        this.errorFirstName = page.locator('//div[@class="modal-content"]//div[@class="form-group"][1]//div[@class="invalid-feedback"]//p');
          
        this.lastNameField = page.locator('//input[@id="signupLastName"]');
        this.errorLastName = page.locator('//div[@class="modal-content"]//div[@class="form-group"][2]//div[@class="invalid-feedback"]//p');
    
        this.emailField = page.locator('//input[@id="signupEmail"]');
        this.errorEmail = page.locator('//div[@class="modal-content"]//div[@class="form-group"][3]//div[@class="invalid-feedback"]//p');

        this.passwordField = page.locator('//input[@id="signupPassword"]');
        this.errorPassword = page.locator('//div[@class="modal-content"]//div[@class="form-group"][4]//div[@class="invalid-feedback"]//p');

        this.reEnterPasswordField = page.locator('//input[@id="signupRepeatPassword"]');
        this.errorReEnterPassword = page.locator('//div[@class="modal-content"]//div[@class="form-group"][5]//div[@class="invalid-feedback"]//p');

        this.registerButton = page.locator('//div[@class="modal-content"]//button[contains(@class, "btn btn-primary")]');

    }

async enterFirstName (firstName: string ){
    await this.firstNameField.fill(firstName);    
}

async enterLastName (lastName: string ){
    await this.lastNameField.fill(lastName);    
}

async enterEmail (email: string ){
    await this.emailField.fill(email);    
}

async enterPassword (password: string ){
    await this.passwordField.fill(password);    
}

async enterReEnterPassword (reEnterPassword: string ){
    await this.reEnterPasswordField.fill(reEnterPassword);    
}

async clickRegisterButton (){
    await this.registerButton.click();    
}

async verifyErrorMessageByText(errors: { errorFirstName: string; errorLastName: string; errorEmail: string; errorPassword: string; errorReEnterPassword: string }) {
    if (this.errorFirstName) {
        await this.errorFirstName.waitFor({ state: 'visible' });
        await expect(this.errorFirstName).toHaveText(errors.errorFirstName);
    }
    if (this.errorLastName) {
        await this.errorLastName.waitFor({ state: 'visible' });
        await expect(this.errorLastName).toHaveText(errors.errorLastName);
    }
    if (this.errorEmail) {
        await this.errorEmail.waitFor({ state: 'visible' });
        await expect(this.errorEmail).toHaveText(errors.errorEmail);
    }
    if (this.errorPassword) {
        await this.errorPassword.waitFor({ state: 'visible' });
        await expect(this.errorPassword).toHaveText(errors.errorPassword);
    }
    if (this.errorReEnterPassword) {
        await this.errorReEnterPassword.waitFor({ state: 'visible' });
        await expect(this.errorReEnterPassword).toHaveText(errors.errorReEnterPassword);
    }
}

async signupWithCredentials (firstName: string,lastName: string, email: string, password: string, reEnterPassword: string){
    await this.enterFirstName(firstName);  
    await this.enterLastName(lastName);
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.enterReEnterPassword(reEnterPassword);
    await this.clickRegisterButton();
}

}