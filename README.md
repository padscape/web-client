# api
This repository contains the code used by the Padscape server to handle requests, as well as the landing website. The API was built with MongoDB and Atlas Cloud, while the website was made with Node.js and JavaScript. The repository is hosted with Heroku.

## Using
**This requires having Git (for the installation), Node.js, and MongoDB installed**
### Installing the packages
```bash
> npm i cors mongoose express express-session body-parser multer
```

### Downloading the code
```bash
> git clone https://github.com/padscape/api
> cd api
> npm start
```

Before you run the code, make sure to add a valid connection URI to the Atlas Cloud database (the one we are using cannot be found in the code for security purposes). Then, go to `http://localhost:3000` and start testing the API.

## Testing
In `client.js` you can find a simple library to use the API. It relies on jQuery's `ajax()` method to run.

## 

- BonfireScratch
  - Project Moderator
