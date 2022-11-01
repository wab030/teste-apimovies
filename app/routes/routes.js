const MoviesController = require("../controllers/moviesController");

module.exports = {
  getMovies: (app) => {
    app.get('/api/filmes',MoviesController.getMovies);
  },
  getMovieById: (app) => {
    app.get('/api/filmes/:id',MoviesController.getMovieById);
  },
  addMovie: (app) => {
    app.post('/api/filmes', MoviesController.addMovie);
  },
  updateMovieById: (app) => {
    app.put('/api/filmes/:id', MoviesController.updateMovieById);
  },
  deleteMovieById: (app) => {
    app.delete('/api/filmes/:id', MoviesController.deleteMovieById);
  },
}
