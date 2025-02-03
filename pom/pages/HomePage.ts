import { Locator, Page } from '@playwright/test';

export default class HomePage{
    readonly page : Page;
    readonly signupButton : Locator;

    constructor(page : Page) {
        this.page = page;
        this.signupButton = page.getByText('Sign up');
    }

async open (){
    await this.page.goto('/');
}

async clickSignupButton (){
    await this.signupButton.click();
}

}