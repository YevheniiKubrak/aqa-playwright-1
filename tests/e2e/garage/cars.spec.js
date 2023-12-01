import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/test.fixture";
import { VALID_BRANDS_RESPONSE_BODY } from "../../src/data/dict/brands";
import { VALID_BRAND_MODELS } from "../../src/data/dict/models";

test.describe('API', ()=>{
    test('Should create new car', async({userAPIClient})=>{
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id

        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 122
        }

        const response = await userAPIClient.post('/api/cars', {
            data:requestBody
        })
        const body = await response.json()
        await expect(response, "Positive response should be returned").toBeOK()
        expect(response.status(), "Status code should be 200").toEqual(201)
        expect(body.status).toBe("ok")
        expect(body.data, "Car should be created with data from request").toMatchObject(requestBody)
        console.log(requestBody)
        console.log(body)
    })
    test('Should give correct response for invalid modelID', async({userAPIClient})=>{
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = "Bober"
        const badRequest = {
            "status": "error",
            "message": "Invalid car model type"
          }

        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 122
        }

        const response = await userAPIClient.post('/api/cars', {
            data:requestBody
        })
        const body = await response.json()
        console.log(body)
        expect(response.status(), "400 response should be returned").toEqual(400)
        expect(body, "Server should give apropriate response").toMatchObject(badRequest)
    })
    test('Should give correct response for data type', async({userAPIClient})=>{
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id
        const badRequest = {
            "status": "error",
            "message": "Invalid mileage type"
          }

        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": "ten miles"
        }

        const response = await userAPIClient.post('/api/cars', {
            data:requestBody
        })
        const body = await response.json()
        console.log(body)
        expect(response.status(), "400 response should be returned").toEqual(400)
        expect(body, "Server should give apropriate response").toMatchObject(badRequest)
    })
})