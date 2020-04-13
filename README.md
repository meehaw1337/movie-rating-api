# Movie rating API
REST API created in Node.js that allows users to browse and rate movies present in the OMDb API database.

### Deployment
In order to start the application, begin by cloning it to your local machine:
```
git clone https://github.com/meehaw1337/miquido-task
```
Then, install all required dependencies:
```
npm install
```
Finally, start the application:
```
npm start
```

This application utilizes a PostgreSQL database. Required tables will be created automatically if they don't exist. Connection details and other necessary information should be included in a `.env` file, in the project's root directory. Below is an example of the `.env` file:
```
DB_NAME=my_database
DB_USERNAME=db_user
DB_PASSWORD=super_safe_password
DB_HOST=localhost
OMDB_API_KEY=your_api_key
AUTH_TOKEN=auth-token
SECRET=secret
```

`AUTH-TOKEN` property is used as the name of a header that will be used along with JWS to authenticate users. `SECRET` is also used by JWT to create tokens. Other properties are self-explanatory.




