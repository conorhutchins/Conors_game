const { selectCommentsUsingReviewId, insertComment } = require("../models/model.comments.js");
const { checkIfReviewIdExists, checkIfUserExists } = require("./utils.js");

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
const parsedReviewId = Number(review_id)
  
if(isNaN(parsedReviewId) || typeof parsedReviewId !== "number") {
return res.status(400).send({message: "Bad request. Invalid ID"})
}
  
const { author, body, votes } = req.body;
if (!author || !body || votes === undefined) {
return res.status(400).send({message: "Bad request. Incomplete post body"})
}

if (typeof author !== "string"){
return res.status(400).send({message: 'Bad request. Invalid author'}) 
}

checkIfReviewIdExists(parsedReviewId)
.then(() => {
return checkIfUserExists(author);
})
.then(() => {
const commentData =
{
review_id: parsedReviewId,
author,
body,
votes,
};
 
return insertComment(commentData);
})
  
.then((comment) => {
res.status(201).send({ comment });
})
.catch(next);
};