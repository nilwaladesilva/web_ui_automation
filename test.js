const testSuit2 = require("./testsuit/twoelementautomationsuit");
const testSuit3 = require("./testsuit/threeelementautomationsuit");
const { qiuitDriver } = require("./utils/webDriver");
const { cleanUpDataFile, downloadDataFile } = require("./utils/dataFile");

async function executeTests() {
    await downloadDataFile()
    await testSuit2.executeTests();
    await testSuit3.executeTests();
}

executeTests().catch(e=>{
    console.error(`Test execution failed with: ${e}`);
}
).finally( () => {
    qiuitDriver();
    cleanUpDataFile(); 
});