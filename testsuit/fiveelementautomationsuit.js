const basetestsuit = require("./basetestsuit");

const baseObj = new basetestsuit();

baseObj.setTestSpecs([
    require("../testspecs/checkboxes"),
    require("../testspecs/keypress"),
    require("../testspecs/inputs"),
    require("../testspecs/addremoveelements"),
    require("../testspecs/filedownload")
]);

module.exports = baseObj;
