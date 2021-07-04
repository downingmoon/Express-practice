const db = require('../../settings/database.js')

/**
 * 아이디로 회원 정보 조회
 * @param {Array} params 
 */
function selectUserInfoWithId(params) {
    let sql = `
    SELECT
        A.USER_NO,
        A.USER_ID,
        A.USER_PASSWORD,
        A.USER_PROFILE_IMG,
        A.USER_NAME,
        B.USER_ASSETS
    FROM MD_USER A
    LEFT JOIN MD_USER_ASSETS B ON A.USER_NO = B.USER_NO
    WHERE USER_ID = ?`

    return new Promise(resolve => {
        db.query(sql, params, (err, row) => {
            console.log(`EXECUTE QUERY - ${sql}`)
            console.log(row)
            console.log('--------')
            console.log(row[0].USER_NAME)
            resolve(row)
        })
    })
}

module.exports = {
    selectUserInfoWithId,
}