import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('/');
})


test.describe('Search' , () => {
    test('Locator', async ({ page }) => {
        await expect(page.locator('h1')).toBeVisible(); //CSS selector
        await expect(page.locator('//h1')).toBeVisible(); //XPath selector
    });

    test('getByRole', async ({ page }) => {
        await expect(page.getByRole('heading' , {name: 'Do more!'})).toBeVisible(); 
    });

    //search by text
    test('getByText', async ({ page }) => {
        await expect(page.getByText('Sign In')).toBeVisible(); 
    });

    //click on Sign In. The form is opened
    test('getByText2', async ({ page }) => {
        await page.getByText('Sign In').click(); 
    });

    //search by label and fill the input
    test('getByLabel', async ({ page }) => {
        await page.getByText('Sign In').click();
        await page.getByLabel('Email').fill('test'); 
    });

    //has
    test('has', async ({ page }) => {
        await expect(page.locator('//nav' , {has: page.locator('//a')})).toBeVisible();   
    });

    //has - декілька рівнів вкладеності
    // test('has2', async ({ page }) => {
    //     await expect(page.locator('//div' , {has: page.locator('//a[@routerlinkactive="-active"]')})).toBeVisible();   
    // });

    //hasText
    test('hasText', async ({ page }) => {
        await expect(page.locator('//button' , {hasText: 'About'})).toBeVisible();   
    });

    //Multiple elements 1 / Спосіб 1: Цикл for + locator.count()
    test('Multiple elements 1', async ({ page }) => {
        const icons  = page.locator('//a[@class="socials_link"]');
        //отримання кількості елементів
        const iconsCount  = await icons.count();
        console.log('iconsCount' + iconsCount);
        
        for (let i = 0; i < iconsCount; i++) {
            await icons.nth(i).click();
        }
    });

    //Multiple elements 2 / Спосіб 2: Цикл for of + locator.all()
    test('Multiple elements 2', async ({ page }) => {
        const icons  = page.locator('//a[@class="socials_link"]');
        //отримання кількості елементів
        const iconsCount  = await icons.count();
        console.log('iconsCount' + iconsCount);

        for (const icon of await icons.all()) {
            await icon.click();
        }
    });

    //Multiple elements 3 / first, last
    test('Multiple elements 3', async ({ page }) => {
        const icons  = page.locator('//a[@class="socials_link"]');
        //отримання кількості елементів
        const iconsCount  = await icons.count();
        console.log('iconsCount' + iconsCount);

       await icons.first().click();
       await icons.last().click();
        
    });

    test.describe('Actions', () => {
        test('fill/pressSeq', async ({ page }) => {
            await page.getByText('Sign In').click();
            await page.locator('//input[@id="signinEmail"]').fill('testEmail');
            await page.locator('//input[@id="signinPassword"]').pressSequentially('testPassword', { delay: 300 });
        });
    
        test('focus/blur', async ({ page }) => {
            await page.getByText('Sign In').click();
            await page.locator('//input[@id="signinEmail"]').fill('testEmail');
            await page.locator('//input[@id="signinEmail"]').blur();
    
            await page.locator('//input[@id="signinPassword"]').focus();
            await page.locator('//input[@id="signinPassword"]').blur();
    
        });
 
        test('text 1', async ({ page }) => {
            console.log(await page.locator('//h1').innerText());         
        });

        test('text2', async ({ page }) => {
            const text = await page.locator('//h1').innerText();
            expect(text).toBe('Do more!');
            
        });

        test('text3', async ({ page }) => {
            await expect(page.locator('//h1')).toHaveText('Do more!');
        });

        test('text 4', async ({ page }) => {
            await expect(page.locator('//h1')).toHaveText('Do more!');
            const elements = page.locator('//*[contains(@class, "header-link")]');
        });

        test('text 5', async ({ page }) => {
            await expect(page.locator('//h1')).toHaveText('Do more!');
            const elements = page.locator('//*[contains(@class, "header-link")]');
            console.log(await elements.allInnerTexts());
        });

        test('text 6', async ({ page }) => {
            console.log(await page.locator('//h1').textContent());
        });
    
    });



})