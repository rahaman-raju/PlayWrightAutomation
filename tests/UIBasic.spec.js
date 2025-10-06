const {test, expect} = require('@playwright/test');
const { timeout } = require('../playwright.config');

//// Test starts here///

test.only('YouTube 1', async ({page})=>
    {
        for (let i = 1; i <= 4; i++) {
            console.log(`Iteration ${i}`);
        await page.goto("https://www.youtube.com/watch?v=fP_EqL9_4Rk");
        await page.locator("button[aria-keyshortcuts='k']").click();
        await page.waitForTimeout(500);
            
            }
    
    });

test('YouTube 2', async ({page})=>
        {
            for (let i = 1; i <= 10; i++) {
                console.log(`Iteration ${i}`);
            await page.goto("https://www.youtube.com/watch?v=fP_EqL9_4Rk");
            await page.locator("button[aria-keyshortcuts='k']").click();
            await page.waitForTimeout(5000);
                
                }
        
        });

        test('YouTube 3', async ({page})=>
            {
                for (let i = 1; i <= 10; i++) {
                    console.log(`Iteration ${i}`);
                await page.goto("https://www.youtube.com/watch?v=fP_EqL9_4Rk");
                await page.locator("button[aria-keyshortcuts='k']").click();
                await page.waitForTimeout(5000);
                    
                    }
            
            });
            test('YouTube 4', async ({page})=>
                {
                    for (let i = 1; i <= 10; i++) {
                        console.log(`Iteration ${i}`);
                    await page.goto("https://www.youtube.com/watch?v=fP_EqL9_4Rk");
                    await page.locator("button[aria-keyshortcuts='k']").click();
                    await page.waitForTimeout(5000);
                        
                        }
                
                });

                test('YouTube 5', async ({page})=>
                    {
                        for (let i = 1; i <= 10; i++) {
                            console.log(`Iteration ${i}`);
                        await page.goto("https://www.youtube.com/watch?v=fP_EqL9_4Rk");
                        await page.locator("button[aria-keyshortcuts='k']").click();
                        await page.waitForTimeout(5000);
                            
                            }
                    
                    });