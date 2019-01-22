## Project setup
- install npm packages by run command `npm install`
- open `database/config/config.js` to configure database configuration
- open `src/config.ts` to configure desired PORT number
- create the database by run command `npm run create-db` (first time initialization only)
- execute db table migrations by run command `npm run migrate-db` (first time initialization only)
- run `npm run dev` to start the service
- export postman collection file named `PlaygameTestEndpoints.postman_collection.json`

## Accessing secure endpoint
- call `login` endpoint to obtain `jwt token`
- add into the request header with key `Authorization` and the value should be `Bearer <obtained_token_from_login>`
