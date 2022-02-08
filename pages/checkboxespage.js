const { By } = require("selenium-webdriver");
const { verifyCheckboxState, setCheckboxState } = require("../utils/projectUtils");
const { getDriver } = require("../utils/webDriver");

const byCheckbox1 = By.xpath("//form[@id='checkboxes']/input[@type='checkbox'][1]");
const byCheckbox2 = By.xpath("//form[@id='checkboxes']/input[@type='checkbox'][2]");

let driver;

let checkbox1;
let checkbox2;

async function init(){

    driver = await getDriver();
    checkbox1 = await driver.findElement(byCheckbox1);
    checkbox2 = await driver.findElement(byCheckbox2);    
}

async function verifyCheckboxesStatus(shouldCheckbox1Checked, shouldCheckbox2Checked) {
    
    console.log(`Verifying checkbox1 checked: ${shouldCheckbox1Checked}, checkbox2 checked: ${shouldCheckbox2Checked}`);    
    
    await verifyCheckboxState(checkbox1, shouldCheckbox1Checked, "Checkbox1");    
    await verifyCheckboxState(checkbox2, shouldCheckbox2Checked, "Checkbox2");

    //for visible Ui changes
    await driver.sleep(1000);
}

async function setCheckboxesState(isCheckbox1Checked, isCheckbox2Checked){
    await setCheckboxState(checkbox1, isCheckbox1Checked);
    await setCheckboxState(checkbox2, isCheckbox2Checked);
}

module.exports = {    
    verifyCheckboxesStatus : verifyCheckboxesStatus,
    setCheckboxesState: setCheckboxesState,
    init: init
}
