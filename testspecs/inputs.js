const { Key } = require("selenium-webdriver");
const homepage = require("../pages/homepage");
const inputpage = require("../pages/inputpage");

const config = require('config');
const { readWorkSheet } = require("../utils/dataFile");
const dataSheetName = config.get('data.sheets.inputs');

async function execute() {
    console.log("Executing testcases for Inputs...");
    await homepage.open();
    await homepage.navigateToInputs();
    await inputpage.init();

    const data = await readWorkSheet(dataSheetName);

    //can not use foreach as await key word is using inside
    for (let i = 0; i < data.length; i++) {
        const item = data[i];

        const keys = (item.key || "" ) + (item.secondaryEnumKey ? Key[item.secondaryEnumKey] : "");
        const expectedValue = item.expect || ""; 

        await testNumberInputFor(item.caseID, keys, expectedValue);          
    }
}

async function testNumberInputFor(caseId, key, expect) {
    console.log(`Verify Test case ${caseId}: pressed '${key}' expected '${expect}'`);
    await inputpage.validateNumberInput(key, expect);
}
module.exports = execute;
