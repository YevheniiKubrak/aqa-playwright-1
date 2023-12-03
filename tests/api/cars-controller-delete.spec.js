import { expect } from "@playwright/test";
import { SAMPLE_CARS } from "../../src/data/dict/carData";
import { INVALID_USER_CAR_ID, USERS } from "../../src/data/dict/users";
import { test } from "../../src/fixtures/test.fixture";

test.describe("/cars delete request", ()=>{
    let client
    let carId

    test.beforeEach(async({clientWithUser})=>{
        client = await clientWithUser({
            email: USERS.EVIE_KLING.email,
            password: USERS.EVIE_KLING.password
        })
        const response = await client.cars.createNewCar(SAMPLE_CARS.carWithNoMileage);
        const body = response.data;
        carId = body.data.id
        console.log(carId)
    })
    
    test('Should delete car', async()=>{
        const response = await client.cars.deleteCarById(carId); 
        const body = response.data;

        expect(response.status, "Status code should be 200").toEqual(200)
        expect(body.status).toBe("ok")
        expect(body.data.carId, "Car should be created with data from request").toEqual(carId)
    })
})

test.describe("/cars delete invalid ID", ()=>{
    let client

    test.beforeEach(async({clientWithUser})=>{
        client = await clientWithUser({
            email: USERS.EVIE_KLING.email,
            password: USERS.EVIE_KLING.password
        })
    })
    
    test('Should not delete car with invalid Id', async()=>{
        const response = await client.cars.deleteCarById(INVALID_USER_CAR_ID)
        const body = response.data;
        console.log(body)

        expect(response.status, "Status code should be 404").toEqual(404)
        expect(body.message,"Body should contain clear error message").toContain("Car not found")
    })
})