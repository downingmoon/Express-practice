const db = require('../../settings/database.js')

/**
 * 회원 번호로 목표카드 목록 조회
 * @param {Array} params 
 */
function selectUserCardListWithUserNo(params) {
    let sql = `
    SELECT CARD_NO
         , USER_NO
         , CARD_TITLE
         , CARD_TARGET_MONEY
         , CARD_CURRENT_MONEY
         , REG_DTTM
    FROM MD_TARGET_CARD
    WHERE USER_NO = ?`

    return new Promise(resolve => {
        db.query(sql, params, (err, row) => {
            console.log(`EXECUTE QUERY - ${sql}`)
            resolve(row)
        })
    })
}

/**
 * 목표카드 등록
 * @param {Array} params 
 * @returns Promise
 */
function insertUserTargetCard(params) {
    let sql = `
    INSERT INTO MD_TARGET_CARD
    (USER_NO, CARD_TITLE, CARD_TARGET_MONEY, CARD_CURRENT_MONEY)
    VALUES
    (?, ?, ?, ?)
    `

    return new Promise(resolve => {
        db.query(sql, params, (err, row) => {
            console.log(`EXECUTE QUERY - ${sql}`)
            resolve(row)
        })
    })
}

module.exports = {
    selectUserCardListWithUserNo,
    insertUserTargetCard,
}