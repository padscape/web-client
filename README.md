# api
This repository contains the code used by the Padscape server to handle requests. Built with MongoDB and Atlas Cloud, hosted with Heroku.

## Using
**This requires having Git (for the installation), Node.js, and MongoDB installed**
### Installing the packages
```bash
> npm i cors mongoose express body-parser multer
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
