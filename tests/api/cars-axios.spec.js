import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/test.fixture";
import { VALID_BRANDS_RESPONSE_BODY } from "../../src/data/dict/brands";
import { VALID_BRAND_MODELS } from "../../src/data/dict/models";
import axios from "axios";
import { USERS } from "../../src/data/dict/users";
import { config } from "../../config/config";

test.describe('API', ()=>{
    let client

    test.beforeAll(async()=>{
        client = axios.create({
            baseURL: config.apiURL, 
        })
        const responseLogin = await client.post('auth/signin', {
            email: USERS.OKEY_KOSS.email,
            password: USERS.OKEY_KOSS.password,
            remember: false
            
        })
        const cookie = responseLogin.headers["set-cookie"][0].split(";") 
        client = axios.create({
            baseURL: config.apiURL,
            headers: {
                cookie
            },
            validateStatus: status => {
                return status < 501
            }
        })
    })
    test('Should create new car', async()=>{
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id
        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 122
        }
        const response = await client.post('/cars', requestBody)

        expect(response.status, "Status code should be 200").toEqual(201)
        expect(response.data.status).toBe("ok")
        expect(response.data.data, "Car should be created with data from request").toMatchObject(requestBody)
        console.log(requestBody)
        console.log(response.data)
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
        const response = await client.post('/cars', requestBody)
        expect(response.status, "400 response should be returned").toEqual(400)
        expect(response.data, "Server should give apropriate response").toMatchObject(badRequest)
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
        const response = await client.post('/cars', requestBody)
        expect(response.status, "400 response should be returned").toEqual(400)
        expect(response.data, "Server should give apropriate response").toMatchObject(badRequest)
    })
})