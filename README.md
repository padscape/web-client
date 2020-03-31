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
> node app.js
```
## Testing
In `client.js` you can find a simple library to use the API.

- BonfireScratch
  - Project Moderator
