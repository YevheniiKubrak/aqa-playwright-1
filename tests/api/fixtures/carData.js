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