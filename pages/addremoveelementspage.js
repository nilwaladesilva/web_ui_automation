const { By } = require("selenium-webdriver");
const { verifyTrue } = require("../utils/projectUtils");
const { getDriver } = require("../utils/webDriver");

const byAddElement = By.xpath("//button[contains(text(),'Add Element')]");
const byButtonList = By.xpath("//div[@id='elements']/button");
const byButton1 = By.xpath("//div[@id='elements']/button[1]");

let driver;
let addElementButton;

async function init() {

    driver = await getDriver();
    addElementButton = await driver.findElement(byAddElement);    
}

async function addElements(buttonCount) {
    
    for (let i = 0; i < buttonCount; i++) {
        addElementButton.click();        
    }
    await driver.sleep(100);
}

async function validateButtonCount(buttonCount) {

    let buttonList = await driver.findElements(byButtonList);

    verifyTrue(buttonList.length == buttonCount, `Expected button count ${buttonCount} not available`);
}

async function removeElements(buttonCount) {

    buttonList = await driver.findElements(byButtonList);
    verifyTrue(buttonList.length >= buttonCount, `Requested remove element count ${buttonCount} is greater than available element count ${buttonList.length}`);
    if (buttonCount > 0) {    

        for (let i = 0; i < buttonCount; i++) {
            await driver.findElement(byButton1).click();    
        }
    
        await driver.sleep(100);
        
    }
}

module.exports = {
    init: init,
    addElements: addElements,
    validateButtonCount: validateButtonCount,
    removeElements: removeElements
}