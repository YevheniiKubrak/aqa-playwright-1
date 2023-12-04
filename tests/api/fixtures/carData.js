export const SAMPLE_CARS = {
    carWithNoMileage : {
        carBrandId: 1,
        carModelId: 1,
        mileage: 0
    },
    carWithBigMileage : {
        carBrandId: 1,
        carModelId: 1,
        mileage: 999999
    }
}

export const SAMPLE_CARS_INVALID = {
    carWithNoModel :{
        carBrandId: 1,
        carModelId: "",
        mileage: 0
    },
    carWithInvalidMileage : {
        carBrandId: 1,
        carModelId: 1,
        mileage: 99999999999
    }
}

export const INVALID_USER_CAR_ID = 789654123
export const USER_CARS = {
    OKEY_KOSS: {
        "status": "ok",
        "data": [
            {
                "id": 71573,
                "carBrandId": 1,
                "carModelId": 2,
                "initialMileage": 122,
                "updatedMileageAt": "2023-12-03T12:33:55.000Z",
                "carCreatedAt": "2023-12-03T12:33:55.000Z",
                "mileage": 122,
                "brand": "Audi",
                "model": "R8",
                "logo": "audi.png"
            },
            {
                "id": 71472,
                "carBrandId": 1,
                "carModelId": 1,
                "initialMileage": 0,
                "updatedMileageAt": "2023-12-03T11:00:01.000Z",
                "carCreatedAt": "2023-12-03T11:00:01.000Z",
                "mileage": 0,
                "brand": "Audi",
                "model": "TT",
                "logo": "audi.png"
            },
            {
                "id": 68855,
                "carBrandId": 1,
                "carModelId": 2,
                "initialMileage": 122,
                "updatedMileageAt": "2023-11-26T15:37:09.000Z",
                "carCreatedAt": "2023-11-26T15:37:09.000Z",
                "mileage": 122,
                "brand": "Audi",
                "model": "R8",
                "logo": "audi.png"
            },
            {
                "id": 68852,
                "carBrandId": 1,
                "carModelId": 2,
                "initialMileage": 122,
                "updatedMileageAt": "2023-11-26T15:36:35.000Z",
                "carCreatedAt": "2023-11-26T15:36:35.000Z",
                "mileage": 122,
                "brand": "Audi",
                "model": "R8",
                "logo": "audi.png"
            },
            {
                "id": 68851,
                "carBrandId": 1,
                "carModelId": 2,
                "initialMileage": 122,
                "updatedMileageAt": "2023-11-26T15:33:34.000Z",
                "carCreatedAt": "2023-11-26T15:33:34.000Z",
                "mileage": 122,
                "brand": "Audi",
                "model": "R8",
                "logo": "audi.png"
            },
            {
                "id": 68850,
                "carBrandId": 1,
                "carModelId": 2,
                "initialMileage": 122,
                "updatedMileageAt": "2023-11-26T15:33:07.000Z",
                "carCreatedAt": "2023-11-26T15:33:07.000Z",
                "mileage": 122,
                "brand": "Audi",
                "model": "R8",
                "logo": "audi.png"
            },
            {
                "id": 68849,
                "carBrandId": 1,
                "carModelId": 1,
                "initialMileage": 1,
                "updatedMileageAt": "2023-11-26T15:32:33.000Z",
                "carCreatedAt": "2023-11-26T15:32:33.000Z",
                "mileage": 1,
                "brand": "Audi",
                "model": "TT",
                "logo": "audi.png"
            },
            {
                "id": 67219,
                "carBrandId": 1,
                "carModelId": 1,
                "initialMileage": 0,
                "updatedMileageAt": "2023-11-18T18:14:04.000Z",
                "carCreatedAt": "2023-11-18T18:14:04.000Z",
                "mileage": 0,
                "brand": "Audi",
                "model": "TT",
                "logo": "audi.png"
            }
        ]
    }
}
