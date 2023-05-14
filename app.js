const express = require('express')
const app = express()
const {getCategories, getApi} = require('./MVC/controllers/controller.categories')
const { getReview, getAllReviews, patchReview } = require('./MVC/controllers/controller.reviews')
const { postComment, deleteComment } = require('./MVC/controllers/controller.comments');

app.use(express.json());

app.get('/api/categories', getCategories)

app.get("/api", getApi)

app.get('/api/reviews/:review_id', getReview)

app.get('/api/reviews', getAllReviews)

app.patch(`/api/review/:reviewId`, patchReview)

app.post('/api/reviews/:review_id/comments', postComment);

app.delete('/api/comments/:comment_id', deleteComment)

app.all("*", (req, res) => {
    res.status(404).send({message: "Page not found"})
})

app.use((err, req, res, next) => {
    if (err.status && err.message) {
        res.status(err.status).send({message: err.message})
    } else {
        next (err)
    }
})

app.use((err, req, res, next) => {
    console.log("in the custom error handler", err);
    res.status(500).send({ message: 'Internal Server Error'});
})


module.exports = app