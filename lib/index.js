function fullValidator(object, validator) {
    for (const key in validator) {
        if (!(key in object) || typeof object[key] !== validator[key]) {
            return false
        }
    }

    for (const key in object) {
        if (!(key in validator)) {
            return false
        }
    }

    return true
}

function partialValidator(object, validator) {
    for (let i in object) {
        if (!(i in validator) || typeof object[i] !== validator[i]) {
            return false
        }
    }
    return true
}

module.exports = {
    fullValidator,
    partialValidator
}