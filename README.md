# api
This repository contains the code used by the Padscape server to handle requests, as well as the landing website.

## Using
**This requires having Git, Node.js, and MongoDB installed**
```bash
> git clone https://github.com/padscape/web-client
> cd api
> npm init
```

## Testing
Before you run the code, make sure to add a valid connection URI to the MongoDB Atlas database or comment out line 4 in `connection.js` (the one we are using cannot be found in the code for security reasons). Then, go to http://localhost:3000 and start testing the website and API locally. In `client.js` you can find a simple library to use the API. It relies on jQuery's `ajax()` method to run.

## Technologies Used
- Heroku for deploying the website
- MongoDB Atlas for hosting the database in the cloud
- Node.js for the back-end
- jQuery for document traversal
- Bootstrap 4 for the website styling

## 

- BonfireScratch
  - Project Moderator
