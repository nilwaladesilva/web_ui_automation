const { By } = require("selenium-webdriver");
const { verifyTrue } = require("../utils/projectUtils");
const { getDriver } = require("../utils/webDriver");

const byInputTarget = By.id('target');
const byPResult = By.id('result');

let driver;
let inputTarget;
let pResult;

async function init(){

    driver = await getDriver();
    inputTarget = await driver.findElement(byInputTarget);
    pResult = await driver.findElement(byPResult);
}

async function validateKeyPress(key, expect){

    console.log(`Validating key press for key: ${key}`);    
    
    await inputTarget.sendKeys(key);
    await driver.sleep(1000);
    let txtResult = await pResult.getText();

    const expectedText = `You entered: ${expect}`
    verifyTrue(txtResult === expectedText, `Expected output '${expectedText}' not fund for key press`);
}

module.exports = {
    validateKeyPress: validateKeyPress,
    init: init
}