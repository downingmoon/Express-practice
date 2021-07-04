const db = require('../../settings/database.js')

/**
 * 아이디로 회원 정보 조회
 * @param {Array} params 
 */
function selectUserInfoWithId(params) {
    let sql = `
    SELECT
        USER_NO,
        USER_ID,
        USER_PASSWORD,
        USER_PROFILE_IMG,
        USER_NAME
    FROM MD_USER
    WHERE USER_ID = ?`

    return new Promise(resolve => {
        db.query(sql, params, (err, row) => {
            console.log(`EXECUTE QUERY - ${sql}`)
            resolve(row)
        })
    })
}

module.exports = {
    selectUserInfoWithId,
}