
const app = require('./config/server');
const db = require('./config/dbConnection');
const routes = require('./app/routes/routes');
routes.getMovies(app);
routes.addMovie(app);
routes.getMovieById(app);
routes.updateMovieById(app);
routes.deleteMovieById(app);


module.exports = app;