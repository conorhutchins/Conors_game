const db = require("../.././db/connection")
const apiEndpoints = require("../../endpoints.json")

exports.selectCategories = () => {
    return db
        .query(`SELECT * FROM categories;`)
        .then((result) => {
            return result.rows;
    })
}
exports.fetchApi = () => {
    return Promise.resolve(apiEndpoints)
}