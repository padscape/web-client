# api
This repository contains the code used by the Padscape server to handle requests.

## Using locally
**This requires having Git (for the installation), PHP, and MySQL installed**
### Creating the database
```bash
> sudo mysql -u root -p
```
Then, in the MySQL interface:
```sql
create database padscape;
use padscape;
create table code_ids (
    CodeId int,
    Code mediumtext,
    Creator tinytext
);

```

### Installing the code
```bash
> git clone https://github.com/padscape/api.git
> php -S 192.168.1.12:8000 -t public
```
