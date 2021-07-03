function getResponseModel(result = true, msg = '', data = null) {
    return {
        result: result,
        msg: msg,
        data: data
    }
}

module.exports = {
    getResponseModel
}