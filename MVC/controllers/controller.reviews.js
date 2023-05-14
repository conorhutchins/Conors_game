const { selectReview, selectAllReviews, updateReview } = require("../models/model.reviews");
const { checkIfReviewIdExists, getReview } = require("./utils");

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

exports.patchReview = (request, response, next) => {
const { reviewId } = request.params;
const parsedReviewId = Number(reviewId);
if (isNaN(parsedReviewId) || typeof parsedReviewId !== "number") {
return response.status(400).send({ message: "Bad request. Invalid ID" });
}

checkIfReviewIdExists(parsedReviewId)
.then(() => {
const { inc_votes } = request.body;
if (!("inc_votes" in request.body)) {
return getReview(reviewId)
}

const parsedInc_votes = Number(inc_votes);

if (isNaN(parsedInc_votes) || typeof parsedInc_votes !== "number") {
return response.status(400).send({ message: "Bad request. Invalid vote" }); 
} 

return updateReview(reviewId, parsedInc_votes);
})
  
.then((review) => {
if (!review) {
return response.status(404).send({ message: "Page not found" });
}

response.status(200).send({ review });
})
  
.catch(next);
};


