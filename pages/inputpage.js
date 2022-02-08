const { By } = require("selenium-webdriver");
const { verifyTrue } = require("../utils/projectUtils");
const { getDriver } = require("../utils/webDriver");

const byNumberInput = By.xpath("//input[@type='number']");

let driver;
let numberInput;

async function init() {

    driver = await getDriver();
    numberInput = await driver.findElement(byNumberInput);    
}

async function validateNumberInput(inputVaule, expect) {

    console.log(`testing number input for ${inputVaule}`);
    
    numberInput.clear();
    await driver.sleep(200);
    numberInput.sendKeys(inputVaule);
    await driver.sleep(500);
    let txtResult = await numberInput.getAttribute("value");
    
    const expectedText = `${expect}`;
    verifyTrue(txtResult === expectedText, `Expected output '${expectedText}' not fund for key press`);
}

module.exports = {
    validateNumberInput: validateNumberInput,
    init: init
}
