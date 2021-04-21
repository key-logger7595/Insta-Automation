//testing async function to close dialogue box 
const puppeteer = require('puppeteer');
async function run(){
	const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage();
	
	page.on('dialog', async dialog => {
		await dialog.dismiss();
	});
	await page.goto('https://chercher.tech/practice/popups');
	await page.click("input[name='confirm']")
	

    // await browser.close();
}
run()