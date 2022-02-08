const basetestsuit = require("./basetestsuit");

const baseObj = new basetestsuit();

baseObj.setTestSpecs([
    require("../testspecs/checkboxes"),
    require("../testspecs/keypress")
]);

module.exports = baseObj;