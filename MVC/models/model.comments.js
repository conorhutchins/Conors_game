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
  console.log(commentData, "<--- this is whats coming into the model");
  const { review_id, author, body, votes } = commentData;
  console.log(review_id);
  console.log(author)
  console.log(votes);

  return db
    .query(
      'INSERT INTO comments (review_id, author, body, votes) VALUES ($1, $2, $3, $4) RETURNING *;',
      [review_id, author, body, votes]
    )
    .then((result) => {
      console.log(result, "<--- this is the result from the query");
      console.log(result.rows, "<--- this is the result rows from the query");
      // if (result.rows.length === 0) {
      //   throw { status:404, message: "Page not found"}
      // }
      return result.rows[0];
    })
};
