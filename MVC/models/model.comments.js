const db = require("../.././db/connection");

exports.selectCommentsUsingReviewId = (parsedReviewId) => {
if (isNaN(parsedReviewId) || typeof parsedReviewId !== 'number') {
return Promise.reject({ status: 400, message: 'Bad request. Invalid review_id' });
}

return db
.query('SELECT * FROM comments WHERE review_id = $1 ORDER BY created_at DESC;', [parsedReviewId])
.then((result) => {
return result.rows;
})
 .catch((err) => {
throw { status: 500, message: "Internal Server Error" };
});
};

exports.insertComment = (commentData) => {
const { review_id, author, body, votes } = commentData;
return db
.query(
'INSERT INTO comments (review_id, author, body, votes) VALUES ($1, $2, $3, $4) RETURNING *;',
[review_id, author, body, votes]
)
.then((result) => {
return result.rows[0];
})
};

exports.deleteCommentUsingCommentId = (commentId) => {
    return db
      .query('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [commentId])
        .then((result) => {
        if (result.rowCount === 0) {
        throw { status: 404, message: 'Comment not found' };
        }
      })
};
  