# Muber Case Study REST API Documentation

This document provides a detailed description of the REST API endpoints for the muberDriverLocationApi.

## To start setting up the project

Step 1: Clone the repo

```bash
git clone https://github.com/muratdemirci/muber-driver-api.git
```

Step 2: cd into the cloned repo and run:

```bash
npm install
```

Step 3: Put your credentials in the driverlocationapi/config/default.ts file.

```bash
  port: 1337,
  secret_key: 'follow_the_deusmur',
  dbUri: '',
```

Step 4: To generate example data, run:

```bash
 npm run seed
```

## Create Driver Locations

This endpoint creates a new driver location entry in the system.

### Request

`POST http://localhost:1337/api/driver-locations`

### Request Body

The request body must contain the following parameters:

| Parameter    | Type    | Description                                                                            |
| ------------ | ------- | -------------------------------------------------------------------------------------- |
| name         | string  | The name of the driver                                                                 |
| destination  | string  | The current destination of the driver                                                  |
| hasPassenger | boolean | Indicates whether the driver has a passenger or not                                    |
| idle         | boolean | Indicates whether the driver is idle or not                                            |
| location     | object  | The current location of the driver. It should contain a type and coordinates property. |

Example request body:

```

{
"name": "john doe",
"destination": "Istanbul/Turkey",
"hasPassenger": false,
"idle": false,
"location": {
"type": "Point",
"coordinates": [40.94289771, 29.0390297]
}
}

```

### Response

This endpoint does not return a response body.

## Get Single Driver Location

This endpoint retrieves the driver location with the specified driver ID.

### Request

`GET http://localhost:1337/api/driver-locations/:driverId`

**:driverId**: The unique identifier of the driver.

### Response

This endpoint does not return a response body.

## Get Nearest Driver

This endpoint retrieves the nearest driver to the provided location.

### Request

`GET http://localhost:1337/api/search/location?longitude=:longitude&latitude=:latitude`

**:longitude**: The longitude of the location.

**:latitude**: The latitude of the location.

### Request Headers

| Key            | Value     |
| -------------- | --------- |
| x-access-token | JWT Token |

### Response

This endpoint does not return a response body.

## Remove Single Driver Location

This endpoint removes the driver location with the specified driver ID.

### Request

`DELETE http://localhost:1337/api/driver-locations/:driverId`

**:driverId**: The unique identifier of the driver.

### Response

This endpoint does not return a response body.

## Update Single Driver Location

This endpoint updates the driver location with the specified driver ID.

### Request

`PUT http://localhost:1337/api/driver-locations/:driverId`

**:driverId**: The unique identifier of the driver.

### Request Body

The request body must contain the following parameters:

| Parameter    | Type    | Description                                                                            |
| ------------ | ------- | -------------------------------------------------------------------------------------- |
| name         | string  | The name of the driver                                                                 |
| destination  | string  | The current destination of the driver                                                  |
| hasPassenger | boolean | Indicates whether the driver has a passenger or not                                    |
| idle         | boolean | Indicates whether the driver is idle or not                                            |
| location     | object  | The current location of the driver. It should contain a type and coordinates property. |

Example request body:

```

{
"name": "murat",
"destination": "Ankara/Turkey",
"hasPassenger": false,
"idle": false,
"location": {
"type": "Point",
"coordinates": [40.94289771, 29.0390297]
}
}

```

### Response

This endpoint does not return a response body.

## Driver Locations Health Check

This endpoint performs a health check on the driver locations API.

### Request

`GET /api/healthcheck`

### Request Headers

| Key            | Value     |
| -------------- | --------- |
| x-access-token | JWT Token |

### Response

This endpoint does not return a response body.

## Matching API Health Check

This endpoint performs a health check on the matching API.

### Request

`GET http://localhost:1447/api/healthcheck`

### Request Headers

| Key            | Value |
| -------------- | ----- |
| x-access-token |       |

### Response

This endpoint does not return a response body.

## Matching API Valid Token

This endpoint tests the validity of the provided token for the matching API.

### Request

`GET http://localhost:1447/api/token`

### Response

This endpoint does not return a response body.

## Matching API Invalid Token

This endpoint tests the invalidity of a token for the matching API.

### Request

`GET http://localhost:1447/api/tokenNotAuthenticated`

### Response

This endpoint does not return a response body.

## Matching API Search Driver

This endpoint searches for a driver within a specified distance from a location.

### Request

`POST http://localhost:1447/api/search/driver`

### Request Headers

| Key            | Value     |
| -------------- | --------- |
| x-access-token | JWT Token |

### Request Body

The request body must contain the following parameters:

| Parameter | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| latitude  | string | The latitude of the location  |
| longitude | string | The longitude of the location |

Example request body:

```

{
"latitude": "40.619080",
"longitude": "29.227659"
}

```

### Response

This endpoint does not return a response body.

```

```
