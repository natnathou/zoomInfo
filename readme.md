API POST CSV PARSER

To run the server go to the root directory and run:

- docker compose up --build

Please see below the routes available of the api:

GET: http://localhost:8080/logdata/latestFile
GET: http://localhost:8080/logdata/stats

Field of the attachment in the form data have to be 'file':

POST: http://localhost:8080/logdata/upload
