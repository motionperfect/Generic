## Description

Starter template for protected micro-service.

## Requirements

1. Node.js 12.x
2. ECDSA JWKS endpoint (ex: [Gandalf](https://github.com/motionperfect/Gandalf))

## Installation

> Note: these steps are only for non-docker users

1. Download all dependencies: 
    ```shell script
    npm install
    ```

2. Build service (only for production)
   ```shell script
   npm run build
   ```

## Usage

#### Environment variables
##### Required
* TOKEN_ISSUER - UID of signing endpoint
* TOKEN_AUDIENCE - UID of this app
* JWK_URL - JWKS endpoint which exposes your signing keys
* APP_PORT - Application port
##### Optional
* HTTP_TIMEOUT - Waiting time before requests get cancelled (in seconds)

#### Running the app

> Note: these steps are only for non-docker users

###### In development
```shell script
npm run start:debug
```

###### In production
```shell script
npm run start:prod
```

## Features

*Not listed right now ;(*

## Enhancements

* Cache invalidation when public key not found
* Algorithm configuration
