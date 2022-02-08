const { By } = require("selenium-webdriver");
const { getDriver } = require("../utils/webDriver");

const config = require("config");

const byCheckboxesLink = By.xpath("//a[contains(text(),'Checkboxes')]");
const byKeyPressesLink = By.xpath("//a[contains(text(),'Key Presses')]");
const byInputsLink = By.xpath("//a[contains(text(),'Inputs')]");
const byAddremoveElementsLink = By.xpath("//a[contains(text(),'Add/Remove Elements')]");
const byFileDownload = By.xpath("(//a[contains(text(),'File Download')])[1]");

let driver;

async function open(){
    driver = await getDriver();
    await driver.get(config.get('homePageURL'));
}

async function navigateToCheckboxes(){
    await driver.findElement(byCheckboxesLink).click();
}

async function navigateToKeyPresses(){
    await driver.findElement(byKeyPressesLink).click();
}

async function navigateToInputs(){
    await driver.findElement(byInputsLink).click();
}

async function navigateToAddremoveElements(){
    await driver.findElement(byAddremoveElementsLink).click();
}

async function navigateToFileDownload(){
    await driver.findElement(byFileDownload).click();
}

module.exports = {
    open: open,
    navigateToCheckboxes: navigateToCheckboxes,
    navigateToKeyPresses: navigateToKeyPresses,
    navigateToInputs: navigateToInputs,
    navigateToAddremoveElements: navigateToAddremoveElements,
    navigateToFileDownload:navigateToFileDownload
}
