const db = require('../../settings/database.js')

/**
 * 팔로우
 * @param {Array} params 
 * @returns Promise
 */
function insertUserFollow(params) {
    let sql = `
    INSERT INTO MD_FOLLOW
    (USER_NO, FOLLOWER_NO)
    VALUES
    (?, ?)
    `

    return new Promise(resolve => {
        db.query(sql, params, (err, row) => {
            console.log(`EXECUTE QUERY - ${sql}`)
            resolve(row)
        })
    })
}

module.exports = {
    insertUserFollow,
}