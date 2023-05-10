const { selectCategories} = require("../models/model.categories")

exports.getCategories = (request, response, next) => {
    selectCategories().then((categories) => {
        response.status(200).send(categories)
        //next()
        
    })
        .catch((err) => {
        next(err)
    });  
}