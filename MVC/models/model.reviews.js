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
  
exports.selectAllReviews = ({ sort_by = "created_at", order = "desc", category }) => {
const validSortCriteria = ["created_at", "votes", "title", "designer", "owner", "review_img_url", "category"];
if (!validSortCriteria.includes(sort_by)) {
return Promise.reject({ status: 400, message: "Bad request. Invalid sort criteria" });
  }

if (order !== "asc" && order !== "desc") {
return Promise.reject({ status: 400, message: "Bad request. Invalid order" });
}

let query = `
    SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.created_at, reviews.votes, reviews.designer,  reviews.review_img_url, COUNT(reviews.review_id) AS comment_count
    FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id`;

if (category) {
query += ` WHERE reviews.category = $1`;
}

query += `
    GROUP BY reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer
    ORDER BY ${sort_by} ${order}`;

if (category) {
return db.query(query, [category])
.then((result) => {
if (result.rows.length === 0) {
throw { status: 404, message: "Category not found" };
}
return result.rows;
});
} else {
return db.query(query)
.then((result) => {
if (result.rows.length === 0) {
throw { status: 404, message: "Category not found" };
}
return result.rows;
});
}
};

exports.updateReview = (reviewId, inc_votes) => {
return db
.query('UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;', [inc_votes || 0, reviewId])
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