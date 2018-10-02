# Music Finder

School projet
A website allowing users to search any album and track list and bookmark their favorite album using [Last.fm](https://www.last.fm/) API

![Alt text](img/MusicFinder.png?raw=true "MusicFinder")

## Technologies used

### Front-end 
[VueJS](https://vuejs.org/)
 + Vuetify
 + vuex
 + vue-router
 + axios

[Webpack](https://webpack.js.org/) <br />
[Vue CLI](https://cli.vuejs.org/) for the projet generation <br />

### Back-end
[NodeJS](https://nodejs.org/en/) <br />
[Express](https://expressjs.com/fr/) <br />
[MongoDB](https://www.mongodb.com/) <br />
[JSON Web Tokens](https://jwt.io/) for authentification. <br />
[bcrypt](https://www.npmjs.com/package/bcrypt) <br />


## Requirement

NodeJS >= v9.7.1 <br />
NPM >= v5.6.0 <br />
MongoDB >= v3.6 <br />
A valid [Last.fm API key](https://www.last.fm/api/account/create) <br />

## Installation

### Build Setup

```bash
# Go to server directory and install dependencies
cd server
npm install

# Create a '.env' file and add these values
SECRET_JWT=YourJWTSecretHere
DATABASE_URL=mongodb://localhost/music-finder
```
```bash
# Go to client directory and install dependencies
cd client
npm install

# Create a '.env' file there and add these values
# client/.env
LASTFM_KEY=YourLastfmAPIKeyHere
```

### Server
```bash
cd server

# Launch the API server
npm start
```

### Client
```bash
cd client

# Launch the client
npm start
```
