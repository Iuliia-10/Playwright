import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('/');
    await page.getByText('Sign in').click();
})


test.describe('Sign in Form' , () => {
    test('Sign in without email', async ({ page }) => {
        await page.locator('//input[@id="signinEmail"]').focus();
        await page.locator('//input[@id="signinEmail"]').blur();
        await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Email required');
    });

    test('Sign in without password', async ({ page }) => {
        await page.locator('//input[@id="signinPassword"]').focus();
        await page.locator('//input[@id="signinPassword"]').blur();
        await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Password required');
    });

    test('Sign in with invalid email', async ({ page }) => {
        await page.locator('//input[@id="signinEmail"]').fill('abc');
        await page.locator('//input[@id="signinEmail"]').blur();
        await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
    });

    test('Sign in with incorrect credentials', async ({ page }) => {
        await page.locator('//input[@id="signinEmail"]').fill('golynska.iuliia@gmail.com');
        await page.locator('//input[@id="signinPassword"]').fill('abc');
        await page.locator('//div[@class="modal-content"]//button[contains(@class, "btn btn-primary")]').click();
        await expect(page.locator('//p[contains(@class, "alert-danger")]')).toHaveText('Wrong email or password');
    });

    test('Sign in with correct credentials', async ({ page }) => {
        await page.locator('//input[@id="signinEmail"]').fill('golynska.iuliia@gmail.com');
        await page.locator('//input[@id="signinPassword"]').fill('123456Aa!');
        await page.locator('//div[@class="modal-content"]//button[contains(@class, "btn btn-primary")]').click();
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
        await expect(page).toHaveTitle('Hillel Qauto');
    });

    
    
    



})