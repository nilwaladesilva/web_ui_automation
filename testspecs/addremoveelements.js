const homepage = require("../pages/homepage");
const addremoveelementspage = require("../pages/addremoveelementspage");

const config = require('config');
const { readWorkSheet } = require("../utils/dataFile");
const dataSheetName = config.get('data.sheets.addRemoveElements');

async function execute() {
    console.log("Executing testcases for Add/Remove Elements...");
    await homepage.open();
    await homepage.navigateToAddremoveElements();
    await addremoveelementspage.init();

    const data = await readWorkSheet(dataSheetName);

    //can not use foreach as await key word is using inside
    for (let i = 0; i < data.length; i++) {
        const item = data[i];

        await validateElementsFor(item.caseID, item.noOfClicks);          
    }

}

async function validateElementsFor(caseId, elementCount) {
    console.log(`Verify Test case ${caseId}: for element count: '${elementCount}' `);
    await addremoveelementspage.addElements(elementCount);
    await addremoveelementspage.validateButtonCount(elementCount);
    
    if(elementCount > 0){
        await addremoveelementspage.removeElements(1);
        await addremoveelementspage.validateButtonCount(elementCount - 1);
        await addremoveelementspage.removeElements(elementCount - 1);
        await addremoveelementspage.validateButtonCount(0);
    }
}

module.exports = execute;