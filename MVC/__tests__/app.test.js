const request = require("supertest")
const app = require("../../app")
const connection = require("../../db/connection")
const testData = require("../../db/data/test-data")
const seed = require("../../db/seeds/seed")
const fs = require('fs').promises;
const sorted = require("jest-sorted")

afterAll(() => {
    connection.end()
})

beforeEach(() => {
    return seed(testData)
})

describe('GET /api/categories', () => {
    it('200: returns an array of category objects', () => {
        return request(app)
            .get("/api/categories")
            .expect(200)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Array)
                expect(response.body.length).toBe(4)
                response.body.forEach((category) => {
                    expect(category).toHaveProperty("slug");
                    expect(category).toHaveProperty("description");
                    expect(typeof category.slug).toBe('string')
                    expect(typeof category.description).toBe('string')
                })
            })
    })
    it('404: returns a page not found error when path is spelt wrong', () => {
        return request(app)
            .get("/api/invalidpath")
            .expect(404)
            .then((response) => {
                expect(response.body.message).toEqual('Page not found' )
            })
          
    })
})

describe('GET /api', () => {
    test('200: responds with a description of all the available endpoints', async () => {
        const expectedApiStructure = JSON.parse(
            await fs.readFile('endpoints.json'), 'utf8');
      const { body } = await request(app)
        .get('/api')
        .expect(200);
      expect(body.api).toEqual(expectedApiStructure);
    });
})
  
describe('GET /api/reviews/:review_id', () => {
    it("200: returns an object with 'review' key and value of object with required keys", () => {
        const expectedReviewId = 1
        return request(app).get(`/api/reviews/${expectedReviewId}`).expect(200).then((response) => { 
            const review = response.body.review
            expect(typeof response.body).toBe('object')
            expect(review).toHaveProperty('title')
            expect(review).toHaveProperty('votes')
        })
    })
    it("400: returns 'Bad request. Invalid ID.' when id is in the wrong data type", () => {
        return request(app).get(`/api/reviews/invalid_id`).expect(400).then((response) => {
            expect(response.body.message).toBe('Bad request. Invalid ID')
        })
    })
    it("404: returns 'Review ID not found' when id doesnt exist", () => {
        return request(app).get('/api/reviews/999').expect(404).then((response) => {
            expect(response.body.message).toBe("Review ID not found")
        })
    })
    it("404: returns page not found when path is spelt wrong", () => {
        return request(app).get('/api/wrong-path').expect(404).then((response) => {
            expect(response.body.message).toBe("Page not found")
        })
    })
})

describe('GET /api/reviews', () => {
    it("200: returns a reviews array with review objects inside, each object will have the required keys", () => {
            return request(app)
                .get('/api/reviews')
                .expect(200)
                .then(({ body }) => {
                    expect(Array.isArray(body.reviews)).toBe(true);
                    body.reviews.forEach(review => {
                        expect(review).toHaveProperty('owner');
                        expect(review).toHaveProperty('title');
                        expect(review).toHaveProperty('review_id');
                        expect(review).toHaveProperty('category');
                        expect(review).toHaveProperty('review_img_url');
                        expect(review).toHaveProperty('created_at');
                        expect(review).toHaveProperty('votes');
                        expect(review).toHaveProperty('designer');
                        expect(review).toHaveProperty('comment_count');
                        expect(review).not.toHaveProperty('review_body');
                    });
                });
        });
          
          
          
          
     
it("200: returns an array of objects sorted by date and defaults to sorting by descending", () => {
    return request(app)
    .get('/api/reviews?sort_by=created_at')
    .expect(200)
    .then(({ body }) => {
      expect(body.reviews).toBeSortedBy('created_at', { descending: true });
    });
});



});

describe('POST /api/reviews/:review_id/comments', () => {
    it('201: responds with the posted comment', () => {
        const commentData = {
            author: 'bainesface',
            body: 'lets test',
            votes: 1
        };
          
        return request(app)
            .post(`/api/reviews/${1}/comments`)
            .send(commentData)
            .expect(201)
            .then((response) => {
                const { comment } = response.body;
          
                expect(comment).toHaveProperty('author', commentData.author);
                expect(comment).toHaveProperty('body', commentData.body);
                expect(comment).toHaveProperty('votes', commentData.votes);
            });
    });
})
    
    // it.only('404: returns page not found when the review ID doesnt exist', () => {
    //     const nonExistentId = 99999;
    //     const commentData = {
    //       author: 'average_joe',
    //       body: 'test',
    //     review_id: nonExistentId,
    //       votes: 2

    //     };
    
    //     return request(app)
    //       .post(`/api/reviews/${nonExistentId}/comments`)
    //       .send(commentData)
    //       .expect(404)
    //       .then((response) => {
    //         expect(response.body.message).toBe('Page not found');
    //       });
    //   });
    
    //   it('404: returns page not found when the author doesnt exist', () => {
    //     const nonExistentAuthor = 'nonsense';
    //     const commentData = {
    //       author: nonExistentAuthor,
    //         body: 'test',
    //       votes: 10
    //     };
    
    //     return request(app)
    //       .post(`/api/reviews/${22}/comments`)
    //       .send(commentData)
    //       .expect(404)
    //       .then((response) => {
    //         expect(response.body.message).toBe('Page not found');
    //       });
    //   });
    // });