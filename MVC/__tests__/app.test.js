const request = require("supertest")
const { response } = require("../../app")
const app = require("../../app")
const connection = require("../../db/connection")
const testData = require("../../db/data/test-data")
const seed = require("../../db/seeds/seed")
const fs = require('fs').promises;
const path = require('path');

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
  });
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


describe('GET /api', () => {
    test('200: responds with a description of all the available endpoints', async () => {
        const expectedApiStructure = JSON.parse(
            await fs.readFile('endpoints.json'), 'utf8');
      const { body } = await request(app)
        .get('/api')
        .expect(200);
      expect(body.api).toEqual(expectedApiStructure);
    });
  });