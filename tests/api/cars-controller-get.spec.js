import { expect } from "@playwright/test"
import { VALID_BRANDS_RESPONSE_BODY } from "../../src/data/dict/brands"
import { USER_CARS } from "./fixtures/carData"
import { test } from "../../src/fixtures/test.fixture"
import { VALID_MODELS_LIST } from "../../src/data/dict/models"
import { INVALID_CAR_BRAND_ID } from "./fixtures/carBrands"
import { INVALID_MODEL_ID } from "./fixtures/carModels"
import { INVALID_USER_CAR_ID } from "./fixtures/carData"


test.describe("/cars get requests", () => {

    test("Should return car brands",async ({client}) =>{
        const response = await client.cars.getCarBrands()
        expect(response.status, "Status code should be 200").toEqual(200)
        expect(response.data, "Valid brands should be returned").toEqual(VALID_BRANDS_RESPONSE_BODY)
    })

    for (const brand of VALID_BRANDS_RESPONSE_BODY.data) {
        test(`should return valid brand data for ${brand.title} brand`, async ({client})=>{
            const brandId = brand.id
            const response = await client.cars.getCarBrandById(brandId)
            const body = response.data
            const expectedResponse = VALID_BRANDS_RESPONSE_BODY.data.find(data => data.id === brandId)

            expect(response.status, "Status code should be 200").toEqual(200)
            expect(body.data, "Valid brands data should be returned").toEqual(expectedResponse)
        })}

    test("Should return car models",async ({client}) =>{
        const response = await client.cars.getCarModels()
        expect(response.status, "Status code should be 200").toEqual(200)
        expect(response.data, "Valid brands should be returned").toEqual(VALID_MODELS_LIST)
    })



    for (const model of VALID_MODELS_LIST.data) {
        test(`should return valid model data for ${model.title}`, async ({client})=>{
            const modelId = model.id
            const response = await client.cars.getCarModelById(modelId)
            const body = response.data
            const expectedResponse = VALID_MODELS_LIST.data.find(data => data.id === modelId)

            expect(response.status, "Status code should be 200").toEqual(200)
            expect(body.data, "Valid brands data should be returned").toEqual(expectedResponse)
        })
    }

    test("Should return current user cars",async ({client}) =>{
        const response = await client.cars.getUserCars()
        expect(response.status, "Status code should be 200").toEqual(200)
        expect(response.data, "User cars should be returned").toEqual(USER_CARS.OKEY_KOSS)
    })

    for (const car of USER_CARS.OKEY_KOSS.data) {
        test(`should return valid user cars by ${car.id}`, async ({client})=>{
            const carId = car.id
            const response = await client.cars.getUserCarById(carId)
            const body = response.data
            const expectedResponse = USER_CARS.OKEY_KOSS.data.find(data => data.id === carId)

            expect(response.status, "Status code should be 200").toEqual(200)
            expect(body.data, "Valid car data should be returned").toEqual(expectedResponse)
        })
    }

})

test.describe("/cars get as an unauthorized user", () =>{
    let client

    test('Should not return car brands to unatharized user', async({unauthorizedClient}) =>{
        test.fail('Need to fix unatharized access')
        client = await unauthorizedClient
        const response = await client.cars.getCarBrands()

        expect(response.status, "Status code should be 401").toEqual(401)
    })

    test('Should not return car models to unatharized user', async({unauthorizedClient}) =>{
        test.fail('Need to fix unatharized access')
        client = await unauthorizedClient
        const response = await client.cars.getCarModels()
      
        expect(response.status, "Status code should be 401").toEqual(401)
    })

    test('Should not current user cars to unatharized user', async({unauthorizedClient}) =>{
        client = await unauthorizedClient
        const response = await client.cars.getUserCars()
        const body = response.data

        expect(response.status, "Status code should be 401").toEqual(401)
        expect(body.message,"Body should contain clear error message").toContain("Not authenticated")
    })
})

test.describe("/Cars and brands requests with wrong Id", ()=>{

    test('Should return correct error upon recieving incorect brand Id', async({client})=>{
        const response = await client.cars.getCarBrandById(INVALID_CAR_BRAND_ID)
        const body = response.data
        
        expect(response.status, "Status code should be 404").toEqual(404)
        expect(body.message,"Body should contain clear error message").toContain("No car brands found with this id")
    })

    test('Should return correct error upon recieving incorect model Id', async({client})=>{
        const response = await client.cars.getCarModelById(INVALID_MODEL_ID)
        const body = response.data

        expect(response.status, "Status code should be 404").toEqual(404)
        expect(body.message,"Body should contain clear error message").toContain("No car models found with this id")
    })

    test('Should return correct error upon recieving incorect user car Id', async({client})=>{
        const response = await client.cars.getUserCarById(INVALID_USER_CAR_ID)
        const body = response.data

        expect(response.status, "Status code should be 404").toEqual(404)
        expect(body.message,"Body should contain clear error message").toContain("Car not found")
    })
})


