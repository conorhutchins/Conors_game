// const db = require("../.././db/connection");

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
  
