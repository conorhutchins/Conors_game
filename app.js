const express = require('express')
const app = express()
const {getCategories} = require('./MVC/controllers/controller.categories')

app.get('/api/categories', getCategories)

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
    res.status(500).JSON.send({ message: 'Internal Server Error'});
})

  
// app.listen(process.env.PORT || PORT, () => {
//     console.log(`Server listening on port ${PORT}`)
// }) extract

module.exports = app