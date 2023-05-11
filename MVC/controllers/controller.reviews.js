const { selectReview, selectAllReviews } = require("../models/model.reviews");

exports.getReview = (request, response, next) => {
  const { review_id } = request.params;
  const parsedReviewId = Number(review_id);
  
  if (isNaN(parsedReviewId) || typeof parsedReviewId !== "number") {
    return response.status(400).send({ message: "Bad request. Invalid ID" });
  }

  selectReview(parsedReviewId)
    .then((review) => {
      response.status(200).send({ review });
    })
    .catch((err) => {
      if (err.status === 404) {
        response.status(404).send({ message: err.message });
      } else {
        next(err);
      }
    });
};
exports.getAllReviews = (request, response, next) => {
  selectAllReviews(request.query)
    .then(reviews => {
    response.status(200).send({ reviews })
    })
  .catch(next)
}
