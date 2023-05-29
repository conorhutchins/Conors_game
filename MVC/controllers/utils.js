const db = require("./../../db/connection");

exports.checkIfReviewIdExists = (review_id) => {
return db.query(`SELECT * FROM reviews WHERE review_id = $1`, [review_id])
.then((result) => {
if (result.rows.length === 0 && review_id) {
return Promise.reject({ status: 404, message: "Review ID not found" });
}
return result;
 });
};

exports.getReview = (reviewId) => {
return db.query(`SELECT * from reviews WHERE review_id = $1`, [reviewId])
.then((result) => {
return result.rows[0]})
}
    
exports.checkIfUserExists = (username) => {
return db.query(`SELECT * FROM users WHERE username = $1`, [username])
.then((result) => {     
if (result.rows.length === 0) {
return Promise.reject({ status: 404, message: "User does not exist" })
}
})
};

exports.checkCommentIdExists = (comment_id) => {
    return db
      .query(`SELECT * FROM comments WHERE comment_id = $1`, [comment_id])
      .then((result) => {
        if (result.rows.length === 0) {
          return Promise.reject({ status: 404, message: 'Comment ID not found' });
        }
      });
  };
  
