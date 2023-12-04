import { test } from "../../src/fixtures/test.fixture";
import { USERS } from "../../src/data/dict/users";
import { SAMPLE_CARS, SAMPLE_CARS_INVALID } from "./fixtures/carData";
import { expect } from "@playwright/test";

test.describe("/cars post requests", () =>{
    let client
    let carId

    test.beforeEach(async ({clientWithUser}) => {
        client = await clientWithUser({
            email: USERS.EVIE_KLING.email,
            password: USERS.EVIE_KLING.password
        });
    })

    test.afterEach(async ()=>{
            await client.cars.deleteCarById(carId)
    } )

    test('Should create new car', async()=>{
        const response = await client.cars.createNewCar(SAMPLE_CARS.carWithNoMileage);
        const body = response.data;
        carId = body.data.id

        expect(response.status, "Status code should be 201").toEqual(201)
        expect(body.status).toBe("ok")
        expect(body.data, "Car should be created with data from request").toMatchObject(SAMPLE_CARS.carWithNoMileage)
    })
})

test.describe("/cars post requests", () =>{
    let client

    test.beforeEach(async ({clientWithUser}) => {
        client = await clientWithUser({
            email: USERS.EVIE_KLING.email,
            password: USERS.EVIE_KLING.password
        });
    })
    test('Should not create a user without a model', async()=>{
        const response = await client.cars.createNewCar(SAMPLE_CARS_INVALID.carWithNoModel)
        const body = response.data;
      
        expect(response.status, "Status code should be 400").toEqual(400)
        expect(body.message,"Body should contain clear error message").toContain("Invalid car model type")
    })

})