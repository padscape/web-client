# api
This repository contains the code used by the Padscape server to handle requests.

## Using
**This requires having Git (for the installation), Node.js, and MySQL installed**
### Creating the database
```bash
> sudo mysql -u root -p
```
Then, in the MySQL interface:
```sql
CREATE DATABASE padscape;
USE padscape;
CREATE TABLE code_ids (
    CodeId INT,
    Code MEDIUMTEXT,
    Creator TINYTEXT
);
```

### Installing the packages
```bash
> npm install cors mysql express body-parser multer
```

### Downloading the code
```bash
> git clone https://github.com/padscape/api
> cd api/src/
> sudo node app.js
```

To run it you need to have a valid SSL certificate as it uses HTTPS. If you don't have one, simply change the code so that it runs on plain `Express` or the built-in `HTTP` module.
## Testing
In `client.js` you can find a simple library to use the API.

- BonfireScratch
  - Project Moderator
