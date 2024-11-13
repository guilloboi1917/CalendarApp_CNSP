# CNSP Calendar

The CNSP Calendar App is a simple client-server web application based on a MERN-stack (MongoDB, Express, React \& Node.js).

## Project Details and Setup

This project was bootstrapped with React + Express + MongoBD.

The application can simply be run with docker after running:

_docker-compose up --build_

in the application root directory.
When the containers are running, the client can be access through http://localhost:80 and https://localhost:443.
The frontend is served via http and https with nginx.
The backend is exposed via port 3000.
Mongodb uses port 27017.
In total, three containers will be created, one for the frontend, backend and the mongodb database.
