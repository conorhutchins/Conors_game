const db = require("./../../db/connection");

exports.checkIfReviewIdExists = (review_id) => {
    return db.query(`SELECT * FROM reviews WHERE review_id = $1`, [review_id])
        .then((result) => {
            console.log(review_id, "<-- this is it coming into util");
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
// function checkCategoryExists(category) {
//   console.log(category, "is it receiving the category?");
//   const query = 'SELECT * FROM reviews WHERE category = $1;';
//   console.log(query, "is the SQL query correct?");
  
//   return db.query(query, [category])
//     .then((result) => {
//       console.log(result.rows, "is the result of the query correct?");
      
//         if (result.rows.length > 0) {
//           console.log(true);
//         return true;
//         } else {
//             console.log(false);
//         return false;
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       throw error;
//     });
// }

// module.exports = { checkCategoryExists };

// checkCategoryExists("euro game")
  
