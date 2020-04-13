# Movie rating API
REST API created in Node.js that allows users to browse and rate movies present in the OMDb API database.

## Deployment
This application utilizes a PostgreSQL database. If you don't have a local instance of Postgres running on your machine, I highly recommend using [PostgreSQL docker image](https://hub.docker.com/_/postgres) to deploy it and use with this application. Once you get your database up and running, make sure to create the database with the same name you use in the `.env` file. Required tables will be created automatically if they don't exist. Connection details and other necessary information should be included in a `.env` file in the project's root directory. Below is an example of the `.env` file:
```
DB_NAME=my_database
DB_USERNAME=db_user
DB_PASSWORD=super_safe_password
DB_HOST=localhost
OMDB_API_KEY=your_api_key
AUTH_TOKEN=auth-token
SECRET=secret
```

`AUTH_TOKEN` property is used as the name of a header that will be used along with JWT to authenticate users. `SECRET` is also used by JWT to create tokens. Other properties are self-explanatory.

In order to start the application, begin by cloning it to your local machine:
```
git clone https://github.com/meehaw1337/movie-rating-api
cd movie-rating-api
```
Then, install all required dependencies:
```
npm install
```
Finally, start the application:
```
npm start
```

Make sure that your Node.js version supports ES6 modules.

## Simplified API specification
### Registering an user
To register an user, a POST request at `/api/users/register` needs to be sent, with the username and password as the body of the request:
```
{
    "username": "cool_guy_1337",
    "password": "very_secret"
}
```

### Logging in
To log in, a POST request similar to the one used in registration should be used, with the exception that the URL changes to `/api/users/login`. If the login process is succesful, an authorization token is returned in a header of the response, it's name is equal to the property described by `AUTH_TOKEN` in the `.env` file. All endpoints described below require this token to authenticate the user.

### Movie search
Movie search can be performed by sending a GET request at `/api/movies/search`, the `title` parameter should be present in the request's parameters. Example response (make sure to include the auth-token):
```
{
    "Title": "Star Wars: Episode IV - A New Hope",
    "Year": "1977",
    "Genre": "Action, Adventure, Fantasy, Sci-Fi",
    "imdbID": "tt0076759",
    "UserRating": 3,
    "AverageRating": 4.333333333333333,
    "Favourite": false
}
```
### Adding and removing movies from favourites
Users can mark (or unmark) a movie as his or her favourite by sending at POST request at `/api/movies/favourite` with the movie ID (imdbID) in the request body:
```
{
	"movieId": "tt0076759"
}
```
and a `action` parameter with the value of either `mark` or `unmark`.

### Rating a movie
Users can rate movies by sending a POST request at `/api/movies/rate` with the movie ID and rating in the request body:
```
{
	"movieId": "tt0076759",
	"rating": 3.0
}
```


