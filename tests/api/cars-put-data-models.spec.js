import { test } from "../../src/fixtures/test.fixture";
import { SAMPLE_CARS, SAMPLE_CARS_INVALID } from "./fixtures/carData";
import { USERS } from "../../src/data/dict/users";
import { expect } from "@playwright/test";
import CreateCarModel from "../../src/models/cars/createCarModel";

test.describe("/cars put requests", () => {
    let client
    let carId

    test.beforeEach(async ({clientWithUser}) => {
        client = await clientWithUser({
            email: USERS.EVIE_KLING.email,
            password: USERS.EVIE_KLING.password
        })
        const createCarModel = new CreateCarModel({
            carBrandId: 1,
            carModelId: 1,
            mileage: 0
        })
        const response = await client.cars.createNewCar(createCarModel);
        const body = response.data;
        carId = body.data.id
    })

    test.afterEach(async ()=>{
        await client.cars.deleteCarById(carId)
} )

    test('Should update car data', async()=>{
        const createCarModel = new CreateCarModel({
            carBrandId: 1,
            carModelId: 1,
            mileage: 999999
        })
        const response = await client.cars.updateUserCarById(carId, createCarModel); 
        const body = response.data;

        expect(response.status, "Status code should be 200").toEqual(200)
        expect(body.status).toBe("ok")
        expect(body.data, "Car should be update with data from request").toMatchObject(createCarModel)
    })
})


test.describe('/Cars Invalid request', ()=>{
    let client
    let carId

    test.beforeEach(async ({clientWithUser}) => {
        client = await clientWithUser({
            email: USERS.EVIE_KLING.email,
            password: USERS.EVIE_KLING.password
        })
        const createCarModel = new CreateCarModel({
            carBrandId: 1,
            carModelId: 1,
            mileage: 0
        })
        const response = await client.cars.createNewCar(createCarModel);
        const body = response.data;
        carId = body.data.id
    })

    test.afterEach(async ()=>{
        await client.cars.deleteCarById(carId)
} )

    test('Should not update car with invalid mileage', async()=>{
        test.fail('Need to fix Mileage validation')

        const createCarModel = new CreateCarModel({
            carBrandId: 1,
            carModelId: 1,
            mileage: 99999999999
        })
        const response = await client.cars.updateUserCarById(carId, createCarModel); 
        const body = response.data;

        expect(response.status, "Status code should be 400").toEqual(400)
        expect(body.message,"Body should contain clear error message").toContain("Invalid mileage")
    })
})
