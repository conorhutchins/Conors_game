const request = require("supertest")
const app = require("../../app")
const connection = require("../../db/connection")
const testData = require("../../db/data/test-data")
const seed = require("../../db/seeds/seed")
const fs = require('fs').promises;

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

describe('PATCH /review/:reviewId', () => {
    it('200: returns the updated review with increased votes', () => {
        const inc_votes = 1
        return request(app)
            .patch("/api/review/1")
            .send({ inc_votes })
            .expect(200)
            .then((response) => {
                expect(response.body.review.votes).toBe(2)
            })
    });
    it('200: returns the updated review with decreased votes', () => {
        const inc_votes = -1;
        return request(app)
            .patch("/api/review/2")
            .send({ inc_votes })
            .expect(200)
            .then((response) => {
            expect(response.body.review.votes).toBe(4)
            })
    });

    it('200: returns the unaltered review if the inc_votes key doesnt exist', () => {
        return request(app)
            .patch("/api/review/1")
            .send({})
            .expect(200)
            .then((response) => {
                expect(response.body.review).toHaveProperty('votes')
            })
    })
        
    it('400: returns "Bad request. Invalid ID" when id is in the wrong data type', () => {
        return request(app)
            .patch('/api/review/invalid_id')
            .expect(400)
            .then((response) => {
                expect(response.body.message).toBe("Bad request. Invalid ID")
            })
    });
    
    it('400: returns "Bad request. Invalid vote" when post body object is not a number', () => {
        const inc_votes = "str";
        return request(app)
            .patch("/api/review/1")
            .send({ inc_votes })
            .expect(400)
            .then((response) => {
                expect(response.body.message).toBe("Bad request. Invalid vote")
            })
    });

    it('404: returns "ID does not exist" when id doesnt exist', () => {
        return request(app)
            .patch('/api/review/999')
            .expect(404)
            .then((response) => {
                expect(response.body.message).toBe("Review ID not found")
            })
    });
})
    
describe('POST /api/reviews/:review_id/comments', () => {
it('201: responds with the new posted comment', () => {
const commentData =
{
author: 'bainesface',
body: 'lets test',
votes: 1
};
          
return request(app)
.post(`/api/reviews/1/comments`)
.send(commentData)
.expect(201)
.then((response) =>
{   
const { comment } = response.body;
expect(comment).toHaveProperty('author', commentData.author);
expect(comment).toHaveProperty('body', commentData.body);
expect(comment.body).toEqual('lets test')
expect(comment).toHaveProperty('votes', commentData.votes);
});
});

it('400: returns "Bad request. Incomplete post body" when the post body is incomplete', () => {
    const commentData = {
        author: 'bainesface'
    }    
    return request(app)
        .post(`/api/reviews/1/comments`)
        .send(commentData)
    expect(400)
        .then((response) => {
        expect(response.body.message).toBe('Bad request. Incomplete post body')
    })
});

it('400: returns "Bad request. Invalid ID" when the id is in the wrong data type', () => {
    const commentData = {
        author: 'bainesface',
        body: 'lets test',
        votes: 1
    };
      
    return request(app)
        .post(`/api/reviews/ThisShouldntBeAStr/comments`)
        .send(commentData)
        .expect(400)
        .then((response) => {
            expect(response.body.message).toBe('Bad request. Invalid ID');
        });
});

it('400: returns "Bad request. Invalid author" when the author is in the wrong data type', () => {
    const commentData = {
        author: 123,
        body: 'lets test',
        votes: 1
    };
      
    return request(app)
        .post(`/api/reviews/1/comments`)
        .send(commentData)
        .expect(400)
        .then((response) => {
        expect(response.body.message).toBe('Bad request. Invalid author');
        });
});
it('404: returns page not found when the review ID doesnt exist', () => {
    const commentData = {
        author: 'bainesface',
        body: 'test',
        votes: 2
    };
    return request(app)
        .post(`/api/reviews/9999/comments`)
        .send(commentData)
        .expect(404)
        .then((response) => {
            expect(response.body.message).toBe('Review ID not found');
        });
});

it('404: returns page not found when the author doesnt exist', () => {
    const commentData = {
        author: 'nonExistentPerson',
        body: 'test',
        votes: 10
    };
    return request(app)
        .post(`/api/reviews/1/comments`)
        .send(commentData)
        .expect(404)
        .then((response) => {
            expect(response.body.message).toBe('User does not exist');
        });
});
});