const { selectCategories } = require("../models/model.categories")
const apiEndpoints = require("../../endpoints.json") 

exports.getCategories = (request, response, next) => {
    selectCategories().then((categories) => {
        response.status(200).send(categories)
        //next()
    })
        .catch((err) => {
        next(err)
    });  
}

exports.getApi = (request, response, next) => {
   return Promise.resolve(apiEndpoints)
        .then((api) => {
        response.status(200).send({ api })
        })
    .catch(next)
}
