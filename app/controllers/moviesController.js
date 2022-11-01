const Joi = require('joi');
const MoviesModel = require("../models/moviesModel");
const util = require('util')

const schema = Joi.object().keys({
   name: Joi.string().required().min(1).max(50),
   director: Joi.string().required().min(1).max(50),
   link: Joi.string().required().min(1).max(150)
});

module.exports = class MoviesController {

   static async updateMovieById(req, res, next) {
      console.log('[Update Movie Controller]', req.body);
      // Ler o movie
      console.log(`[Update Movie Controller] id = ${req.params.id}`);
      try {
         const movieId = req.params.id;
         const movie = await MoviesModel.getMovieById(movieId);
         if (!movie) {
            res.status(404).json(`Não existe filme cadastrado com o id ${movieId}.`);
         }
         let updatedMovie = { ...movie };
         delete updatedMovie._id;
         // console.log(`[Update Movie Controller] ${util.inspect(updatedMovie, false, null, true)}`);
         // console.log(`[Update Movie Controller] req.body ${util.inspect(req.body, false, null, true)}`)
         for (let key in req.body) {
            updatedMovie = { ...updatedMovie, [key]: req.body[key] };
            console.log(`[Update Movie Controller] ${util.inspect(updatedMovie, false, null, true )}`)
         }

         const { error, value } = schema.validate(updatedMovie);

         if (error) {
            const result = {
               msg: 'Filme não incluído. Campos não foram preenchidos corretamente.',
               error: error.details
            }
            res.status(404).json(result);
            return;
         }
         const result = await await MoviesModel.updateMovieById(movieId, updatedMovie);
         console.log(`[Update Movie Controller]  - Filme alterado com sucesso] ${result}`);

         res.status(200).json(result);
      } catch (error) {
         console.log(`[Update Movie Controller]  - error] ${error}`);
         res.status(500).json({ error: error });
      }
   }

   static async addMovie(req, res, next) {
      console.log('[Add Movie Controller]', req.body);
      const { error, value } = schema.validate(req.body);
      // console.log(`[Controller add movie error: ] ${value} - ${error.details}`);
      console.log(util.inspect(value, false, null, true /* enable colors */))
      if (error) {
         const result = {
            msg: 'Filme não incluído. Campos não foram preenchidos corretamente.',
            error: error.details
         }
         res.status(404).json(result);
         return;
      }
      try {
         const addedMovie = await MoviesModel.addMovie(req.body);
         res.status(200).json(addedMovie);
      } catch (error) {
         res.status(500).json({ error: error });
      }
   }

   static async getMovies(req, res, next) {
      console.log('Controller Movies - get movies');
      try {
         const movies = await MoviesModel.getMovies();

         if (!movies) {
            res.status(404).json(`Não existe filme cadastrado.`);
         }
         movies.forEach(movie => {
            console.log(`[Movie controller: retorno do banco] ${movie.name}`);
         });
         res.status(200).json(movies);
      } catch (error) {
         console.log(`[getallmovies error] ${error}`);
         res.status(500).json({ error: error })
      }
   }

   static async getMovieById(req, res, next) {
      console.log(`Controller Movies - get movie by id ${req.params.id}`);
      try {
         const movieId = req.params.id;
         const movie = await MoviesModel.getMovieById(movieId);
         if (!movie) {
            res.status(404).json(`Não existe filme cadastrado com o id ${movieId}.`);
         }
         res.status(200).json(movie);
      } catch (error) {
         console.log(`[Controller - get movie by id error] ${error}`);
         res.status(500).json({ error: error })
      }
   }

   static async deleteMovieById(req, res, next) {
      console.log(`Controller Movies - delete movie by id ${req.params.id}`);
      try {
         const movieId = req.params.id;
         const movie = await MoviesModel.deleteMovieById(movieId);
         if (!movie) {
            res.status(404).json(`Não existe filme cadastrado com o id ${movieId}.`);
         }
         res.status(200).json(movie);
      } catch (error) {
         console.log(`[Controller - delete movie by id error] ${error}`);
         res.status(500).json({ error: error })
      }
   }

   static async apiGetArticleById(req, res, next) {
      try {
         let id = req.params.id || {};
         const article = await ArticleService.getArticlebyId(id);
         res.json(article);
      } catch (error) {
         res.status(500).json({ error: error })
      }
   }

   static async apiUpdateArticle(req, res, next) {
      try {
         const comment = {}
         comment.title = req.body.title;
         comment.body = req.body.body;
         comment.articleImage = req.body.article_image

         const updatedArticle = await ArticleService.updateArticle(comment);

         if (updatedArticle.modifiedCount === 0) {
            throw new Error("Unable to update article, error occord");
         }

         res.json(updatedArticle);

      } catch (error) {
         res.status(500).json({ error: error });
      }
   }

   static async apiDeleteArticle(req, res, next) {
      try {
         const articleId = req.params.id;
         const deleteResponse = await ArticleService.deleteArticle(articleId)
         res.json(deleteResponse);
      } catch (error) {
         res.status(500).json({ error: error })
      }
   }

}