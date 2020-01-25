function validate(dataArray = []) {
    let isValid = true;
    dataArray.forEach(data => {
        if (data.type === "text") {
            if (data.field == null || data.field.length < 4 || data.field.length > 220) {
                data.callBack();
                isValid = false;
            }
        } else if (data.type === "email") {
            if (!data.field.includes("@")) {
                data.callBack();
                isValid = false;
            }
        } else {
            if (data.field == null || data.field === "") {
                data.callBack();
                isValid = false;
            }
        }
    });
    return isValid;
}

exports.validate = validate;