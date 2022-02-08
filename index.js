const testSuit = require("./testsuit/fiveelementautomationsuit");
const { downloadDataFile, cleanUpDataFile } = require("./utils/dataFile");
const { qiuitDriver } = require("./utils/webDriver");

async function executeTests() {
    await downloadDataFile();
    await testSuit.executeTests();
}

executeTests().catch(e=>{
    console.error(`Test execution failed with: ${e}`);
}
).finally( () => {
    cleanUpDataFile(); 
    qiuitDriver();
});