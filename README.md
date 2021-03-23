# Backend

This is the backend Node.js/Express server that will act as an API endpoint for the frontend web application.
This repo will contain the SQL logic that queries the UF Oracle DB server. Then will take that data and pass that to 
the front end in the form of JSON data to be rendered.

## Setup
To perform initial setup simply install the dependencies with `npm install`. Then start the server with `npm start`. 
The server will listen on your local ip address on port 3000 as defined in `bin\www.js`.
