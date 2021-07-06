const db = require('../../settings/database.js')

/**
 * 핀플루언서 목록 조회
 */
function selectFinpluencerList() {
    let sql = `
    SELECT * FROM (
        SELECT A.USER_NO
             , A.USER_NAME
             , A.USER_PROFILE_IMG
             , (SELECT COUNT(*) FROM MD_FOLLOW WHERE USER_NO = A.USER_NO) AS FOLLOWER_CNT
             , (SELECT COUNT(*) FROM MD_RECIPE WHERE USER_NO = A.USER_NO) AS RECIPE_CNT
          FROM MD_USER A
    ) T
    ORDER BY T.FOLLOWER_CNT DESC
    LIMIT 10`

    return new Promise(resolve => {
        db.query(sql, [], (err, row) => {
            console.log(`EXECUTE QUERY - ${sql}`)
            resolve(row)
        })
    })
}

module.exports = {
    selectFinpluencerList,
}