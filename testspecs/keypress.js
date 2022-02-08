const { Key } = require("selenium-webdriver");
const homepage = require("../pages/homepage");
const keypressespage = require("../pages/keypressespage");

const config = require('config');
const { readWorkSheet } = require("../utils/dataFile");
const dataSheetName = config.get('data.sheets.keyPresses');

async function execute() {
    console.log("Executing testcases for Key Presses...");
    await homepage.open();
    await homepage.navigateToKeyPresses();
    await keypressespage.init();

    const data = await readWorkSheet(dataSheetName);

    //can not use foreach as await key word is using inside
    for (let i = 0; i < data.length; i++) {
        const item = data[i];

        const key = item.isEnum === "yes" ? Key[item.key] : item.key;
        await validateKeyPress(item.caseID, key, item.expect);          
    }
   
}

async function validateKeyPress(caseId, key, expect) {
    console.log(`Verify Test case ${caseId}: pressed '${key}' expected '${expect}'`);
    await keypressespage.validateKeyPress(key, expect);
}
module.exports = execute;
