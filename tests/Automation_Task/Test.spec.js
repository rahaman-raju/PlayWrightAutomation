
import { test, expect } from '@playwright/test';

test('Test Case1: Verify product search', async ({ page }) => {
  const searchKeyword = 'tops';

  try {
    // 1. Navigate to the homepage
    console.log('Navigating to the homepage...');
    await page.goto('/'); // Base URL is automatically used from the config

    // 2. Verify home page is visible successfully
    console.log('Verifying homepage visibility...');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.locator('body')).toBeVisible();
    const pageTitle = await page.title();
    console.log(`The page title is: ${pageTitle}`);

    // 3. Click on 'Products' button
    console.log('Navigating to the Products page...');
    const productsButton = page.locator('a[href="/products"]');
    await productsButton.click();

    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    console.log('Verifying ALL PRODUCTS page...');
    const allProductsTitle = page.locator('h2.title.text-center');
    await expect(allProductsTitle).toHaveText(/All Products/i);

    // 5. Enter product name in search input and click search button
    console.log(`Searching for products with keyword: ${searchKeyword}`);
    await page.fill('#search_product', searchKeyword);
    await page.click('#submit_search');


    // 6. Verify 'SEARCHED PRODUCTS' is visible
    console.log('Verifying SEARCHED PRODUCTS section...');
    const searchedProductsTitle = page.locator('h2.title.text-center');
    await expect(searchedProductsTitle).toHaveText(/Searched Products/i);
    await page.waitForTimeout(5000);


   
    // 7. Verify all the products related to search are visible
    console.log('Verifying all products related to the search are visible...');
    await page.waitForSelector('.features_items .product-image-wrapper'); // Ensure products are loaded


    
    const products = page.locator('.features_items .product-image-wrapper');
    const productCount = await products.count();
    console.log(`Number of products found: ${productCount}`);
    if (productCount === 0) {
      throw new Error('No products found. Check the selector or search keyword.');
    }

    await expect(products).toHaveCountGreaterThan(0);

    const productTitles = await page.$$eval('.features_items .productinfo p', els =>
      els.map(e => e.textContent?.toLowerCase())
    );
    console.log(`Found ${productTitles.length} products related to the search keyword: ${searchKeyword}`);
    console.log('Product Titles:', productTitles);

    for (const title of productTitles) {
      expect(title).toContain(searchKeyword.toLowerCase());
    }




    console.log('Test passed successfully!');


  } catch (error) {
    console.error('Test failed:', error);
    throw error; // Re-throw the error to fail the test
  }



});

test('Test Case2: Product add to cart', async ({ page }) => {
  try {
    // 1. Launch browser & navigate to URL
    console.log('Navigating to homepage...');
    await page.goto('/'), //{ waitUntil: 'domcontentloaded' });

    // 2. Verify home page is visible successfully
    console.log('Verifying homepage...');
    await page.waitForSelector('#slider'); // any main homepage element
    const title = await page.title();
    if (!title.includes('Automation Exercise')) {
      throw new Error('Home page title does not match!');
    }
    console.log('Homepage verified successfully.');

    // 3. Click on 'View Product' for any product on the homepage
    console.log('Opening a product detail page...');
    await page.locator('.features_items .product-image-wrapper a[href*="product_details"]').first().click();

    // 4. Verify product detail is opened
    console.log('Verifying product detail page...');
    await page.waitForSelector('.product-information');
    const productName = await page.locator('.product-information h2').innerText();
    console.log(`Opened product: ${productName}`);

    // 5. Increase quantity to 4
    console.log('Setting quantity to 4...');
    const quantityInput = page.locator('#quantity');
    await quantityInput.fill('4');

    // 6. Click 'Add to cart' button
    console.log('Adding product to cart...');
    await page.click('button[type="button"]:has-text("Add to cart")');

    // Wait for modal and click 'View Cart'
    console.log('Viewing cart...');
    await page.waitForSelector('a:has-text("View Cart")', { timeout: 10000 });
    await page.click('a:has-text("View Cart")');

    // 7. Verify product is displayed in cart page with exact quantity
    console.log('Verifying product in cart...');
    await page.waitForSelector('.cart_info');
    const cartQuantity = await page.locator('.cart_quantity button').innerText();

    if (cartQuantity.trim() === '4') {
      console.log('✅ Product quantity verified successfully in the cart!');
    } else {
      throw new Error(`❌ Quantity mismatch! Expected 4 but found ${cartQuantity}`);
    }

    console.log('Test completed successfully!');
  } catch (error) {
    console.error('Test failed:', error);

  }

  });