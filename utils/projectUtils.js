
function verifyTrue(exp, message){
    if(!exp){
        throw(message);
    }
}

async function setCheckboxState(checkbox, shouldChecked){
    let checked = await checkbox.getAttribute("checked");

    if(shouldChecked && !checked || (!shouldChecked && checked)){
        await checkbox.click();
    }
}

async function verifyCheckboxState(checkbox, shouldChecked, checkboxLabel) {

    let valueCheckbox = await checkbox.getAttribute("checked");

    //verify checkbox state
    if(shouldChecked) {
        verifyTrue(valueCheckbox, `${checkboxLabel} should be checked, but not`);
    } else {
        verifyTrue(!valueCheckbox, `${checkboxLabel} should not be checked, but it is checked`)
    }
}

module.exports = {
    verifyTrue: verifyTrue,
    setCheckboxState: setCheckboxState,
    verifyCheckboxState: verifyCheckboxState,
}
