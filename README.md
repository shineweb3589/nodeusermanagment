## Overview

Node JS user management


## Installation
If you don't have `node` and `npm` installed, do [that](https://docs.npmjs.com/getting-started/installing-node) first.


Navigate into the project directory and install package dependencies.

```bash
# Make sure you are in the correct directory
$ cd nodeusermanagement

# Install all necessary npm packages:
$ npm install
$ npm install mongoose express jsonwebtoken dotenv bcryptjs 
$ npm install nodemon -D

```

Create an environment file to store keys and tokens

```bash
 $ touch .env
 ```

Add your Cloud Elements keys to the `.env` file:

```
API_PORT=4000
MONGO_URI= 'mongodb://localhost/usermanagement'
TOKEN_KEY=shinewebservices

```



## Available Scripts

In the project directory, you can run:

#### `npm run dev`
