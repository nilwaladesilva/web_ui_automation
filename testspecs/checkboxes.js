const homepage = require("../pages/homepage");
const checkboxespage = require("../pages/checkboxespage");
const config = require('config');
const { readWorkSheet } = require("../utils/dataFile");
const dataSheetName = config.get('data.sheets.checkboxes');

async function execute() {
    console.log("Executing testcases for Checkboxes...");
    await homepage.open();
    await homepage.navigateToCheckboxes();
    await checkboxespage.init();

    const data = await readWorkSheet(dataSheetName);

    //can not use foreach as await key word is using inside
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        console.log(`Verify Test case ${item.caseID}: state: ${item.shouldCheckbox1Checked}, ${item.shouldCheckbox2Checked}`);

        let shouldChkbox1Checked = item.shouldCheckbox1Checked === "yes";
        let shouldChkbox2Checked = item.shouldCheckbox2Checked === "yes";

        //case 1 means initial case
        if(item.caseID != 1){
            await checkboxespage.setCheckboxesState(shouldChkbox1Checked,shouldChkbox2Checked);
        }
        await checkboxespage.verifyCheckboxesStatus(shouldChkbox1Checked, shouldChkbox2Checked);
    }

}
module.exports = execute;
