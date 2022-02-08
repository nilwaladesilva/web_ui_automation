const homepage = require("../pages/homepage");
const filedownloadpage = require("../pages/filedownloadpage");

async function execute() {
    console.log("Executing testcases for File Download...");
    await homepage.open();
    await homepage.navigateToFileDownload();
    await filedownloadpage.init();

    let f = await filedownloadpage.getFirstFileName();

    await verifyDownloadFile(1, f);
}

async function verifyDownloadFile(caseId, fileName) {

    console.log(`Verify Test case ${caseId}: for file name: '${fileName}' `);
    await filedownloadpage.downloadFile(fileName);    
}

module.exports = execute;