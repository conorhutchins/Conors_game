const express = require('express')
const app = express()
const {getCategories, getApi} = require('./MVC/controllers/controller.categories')

app.get('/api/categories', getCategories)

app.get("/api", getApi)

app.all("*", (req, res) => {
    res.status(404).send({message: "Page not found"})
})

// app.use((err, req, res, next) => {
//     if (err.status && err.message) {
//         res.status(err.status).send({message: err.message})
//     } else {
//         next (err)
//     }
// })

app.use((err, req, res, next) => {
    console.log("in the custom error handler", err);
    res.status(500).send({ message: 'Internal Server Error'});
})


module.exports = app