const { selectCategories, fetchApi} = require("../models/model.categories")

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
    fetchApi()
        .then((api) => {
        response.status(200).send({ api})
        })
    .catch(next)
}