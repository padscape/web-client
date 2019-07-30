# api
**This is a reference point for myself at the moment, and is not meant to be understood by other users for now**

I have just setted up a new Raspberry Pi 3B+ running Raspbian, and having MariaDB (MySQL) installed.

##### There is no server setup yet, so I will be using the databases locally for now

## Logging into the database

sudo mysql -u root -p
use padscape;
## To see all ids

select * from code_ids;
## To insert to ids table

insert into code_ids
values (1, '<html>test</html>');
