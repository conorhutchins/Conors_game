const { selectCommentsUsingReviewId, insertComment } = require("../models/model.comments.js");

exports.getCommentsByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  const parsedReviewId = Number(review_id);
  
  selectCommentsUsingReviewId(parsedReviewId)
    .then((comments) => {
      if (comments.length === 0) {
        return res.status(404).send({ message: 'No comments found for the given review_id' });
      }
      res.status(200).send({ comments });
    })
    .catch((err) => {
      if (err.status && err.message) {
        res.status(err.status).send({ message: err.message });
      } else {
        next(err);
      }
    });
};

exports.postComment = (req, res, next) => {
  const { review_id } = req.params;
  console.log(review_id, "<-- this is the review_id");
  const { author, body, votes } = req.body;
  console.log(author, body, votes, "<--- this is the author, body, and votes");
  
 
  
  const commentData = {
    review_id: Number(review_id),
    author,
    body,
    votes,
  };
console.log(commentData, "<-- this is commentData");
  insertComment(commentData)
    .then((comment) => {
      console.log(comment, "<-- this is the comment from the model");
      res.status(201).send({ comment });
    })
    .catch(next);
};