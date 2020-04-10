# api
This repository contains the code used by the Padscape server to handle requests. Built with MongoDB and Atlas Cloud.

## Using
**This requires having Git (for the installation), Node.js, and MongoDB installed**
### Installing the packages
```bash
> npm install cors mongoose express body-parser multer
```

### Downloading the code
```bash
> git clone https://github.com/padscape/api
> cd api/src/
> sudo node app.js &> padscape_log.txt &
```

To run it you need to have a valid SSL certificate as it uses HTTPS. If you don't have one, simply change the code so that it runs on plain `Express` or the built-in `HTTP` module. For security reasons, the Atlas password for the database is not shown in the code, so you will have to set up the database locally with MongoDB.

## Testing
In `client.js` you can find a simple library to use the API.

## 

- BonfireScratch
  - Project Moderator
