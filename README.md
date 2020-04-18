# api
This repository contains the code used by the Padscape server to handle requests. Built with MongoDB and Atlas Cloud.

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

Before you run the code, make sure to open `src/config.json` and see if the configurations match your needs. If you have a valid SSL certificate and want to run the API in HTTPS, set `https: true` and in the `privateKey` and `certificate` values add the paths to your SSL certificate. In `connection` enter the MongoDB database that you want to connect to. Then, go to `http://localhost` and start testing the API (if you run with HTTPS you will be redirected to a secure localhost).

## Testing
In `client.js` you can find a simple library to use the API. It relies on jQuery's `ajax()` method to run.

## 

- BonfireScratch
  - Project Moderator
