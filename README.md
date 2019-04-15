# GraphQL exercise

## Scripts

`docker container run -d -v ecommerceWithGraphQL:/var/lib/postgresql/data -e POSTGRES_PASSWORD=password -e POSTGRES_USER=user -p 5432:5432 postgres:latest`
Create a docker container with postgres

`initdb`
(On server side) Initialise the database

`yarn start:dev`
Run the server side

`yarn start`
Run the client side.
Open [http://localhost:3000](http://localhost:3000) to view in browser.