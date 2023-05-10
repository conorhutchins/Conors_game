const db = require("../.././db/connection")

exports.selectReview = (review_id) => {
    return db
      .query(`SELECT * FROM reviews WHERE review_id = $1;`, [review_id])
      .then((result) => {
        if (result.rows.length === 0) {
          const error = new Error('Review ID not found');
          error.status = 404;
          throw error;
        } else {
          return result.rows[0];
        }
      });
  };
  