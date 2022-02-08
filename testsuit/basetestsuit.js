function base() {

    this.testSpecs = [];

    this.executeTests = async function() {

        console.log('~~Start executing tests.');

        for (let i = 0; i < this.testSpecs.length; i++) {
            const executeSpec = this.testSpecs[i];
            await executeSpec();
        }

        console.log('~~All tests executed successfully.');
    }

    this.setTestSpecs = function(testSpecsArray){
        this.testSpecs = testSpecsArray;
    }

};

module.exports = base;
