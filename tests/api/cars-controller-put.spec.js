import { test } from "../../src/fixtures/test.fixture";
import { SAMPLE_CARS, SAMPLE_CARS_INVALID } from "./fixtures/carData";
import { USERS } from "../../src/data/dict/users";
import { expect } from "@playwright/test";

test.describe("/cars put requests", () => {
    let client
    let carId

    test.beforeEach(async ({clientWithUser}) => {
        client = await clientWithUser({
            email: USERS.EVIE_KLING.email,
            password: USERS.EVIE_KLING.password
        })
        const response = await client.cars.createNewCar(SAMPLE_CARS.carWithNoMileage);
        const body = response.data;
        carId = body.data.id
    })

    test.afterEach(async ()=>{
        await client.cars.deleteCarById(carId)
} )

    test('Should update car data', async()=>{
        const response = await client.cars.updateUserCarById(carId, SAMPLE_CARS.carWithBigMileage); 
        const body = response.data;

        expect(response.status, "Status code should be 200").toEqual(200)
        expect(body.status).toBe("ok")
        expect(body.data, "Car should be update with data from request").toMatchObject(SAMPLE_CARS.carWithBigMileage)
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
        const response = await client.cars.createNewCar(SAMPLE_CARS.carWithNoMileage);
        const body = response.data;
        carId = body.data.id
    })

    test.afterEach(async ()=>{
        await client.cars.deleteCarById(carId)
} )

    test('Should not update car with invalid mileage', async()=>{
        test.fail('Need to fix Mileage validation')

        const response = await client.cars.updateUserCarById(carId, SAMPLE_CARS_INVALID.carWithInvalidMileage); 
        const body = response.data;

        expect(response.status, "Status code should be 400").toEqual(400)
        expect(body.message,"Body should contain clear error message").toContain("Invalid mileage")
    })
})
