const request = require("supertest")
const { response } = require("../../app")
const app = require("../../app")
const connection = require("../../db/connection")
const testData = require("../../db/data/test-data")
const seed = require("../../db/seeds/seed")

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

describe('GET /api/reviews/:review_id', () => {
    it("200: returns an object with 'review' key and value of object with required keys", () => {
        
    })
    it("400: returns 'Bad request. Invalid ID.' when id is in the wrong data type", () => {
        
    })
    it("404: returns 'ID does not exist' when id doesnt exist", () => {
        
    })
    it("404: returns page not found when path is spelt wrong", () => {
        
    })
})

