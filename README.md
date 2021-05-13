# User Profile (NestJS)

## Run the app

### 1. Set up the environment

The following software will be necessary for running the app
* [Docker](https://docs.docker.com/get-docker/)
* [Docker compose](https://docs.docker.com/compose/install/)(Only if you are running this app on MacOS you need to install separately).

### 2. Start the app
***Note: Please make sure that you have enough space to install it, at least 2.5Gb.***

Open a terminal at the root app folder and use one of the following options to start the app:

1. Run the command `docker compose up -d` with which you'll be able to watch the output log.
2. Run the command `docker compose up` (*whitout `-d` flag*).

Once you type the command, please wait for a while. The first time may take a few minutes.

### 3. Stop the app

Open a terminal at the root app folder and use one of the following options to start the app:

1. Run the command `docker compose down` as long as you started the app with the previous option `1`.
2. Run the keys combination `Ctrl + C` as long as you started the app with the previous options `2`.

### Testing the app

Open `http://localhost:4000/api` which is based on [Swagger](https://swagger.io/specification/) to explore the API docs, then you can use any tools that you consider good enough for testing APIRest. Let me recommend you [Postman](https://www.postman.com/downloads/)(you can use the file `./postman_collection.json` to import the requests and test them easily).