const client = require('../../config/dbConnection');
const { ObjectId } = require('mongodb');
const util = require('util');

module.exports = class MoviesModel {

    static async getMovies() {
        console.log(`[Model Movies]`);
        const cursor = await client.db("dsw").collection("movies").find();

        // console.log(`[Movie Model get all movies: cursor] ${cursor}`);
        const movies = await cursor.toArray();
        // console.log(`[Movie Model get all movies: results] ${results}`);
        return movies;
    }

    static async getMovieById(movieId) {
        console.log(`[getMovieById Model] ${movieId}`);
        movieId = new ObjectId(movieId);
        const movie = await client.db("dsw").collection("movies").findOne({ _id: movieId });
        return movie;
    }

    static async addMovie(data) {
        console.log(`[Movie Model - Add Movie] ${data}`);
        try {
            const newMovie = {
                name: data.name,
                director: data.director,
                link: data.link,
                date: new Date()
            }
            const addedMovie = await client.db("dsw").collection("movies").insertOne(newMovie);
            console.log(`New movie inserted with the following id ${addedMovie.insertedId}`);
            return addedMovie;
        } catch (error) {
            console.log(`[movieService] Error: ${error}`);
        }
    }

    static async updateMovieById(movieId, data) {
        try {
            const updatedMovie = { ...data, date: new Date() }
            console.log(`[Movie Model - Movie id] ${movieId}`);
            console.log(`[Movie Model - Movie to update] ${util.inspect(updatedMovie, false, null, true )}`);
            movieId = new ObjectId(movieId);
            const result = await client.db("dsw").collection("movies").updateOne({ _id: movieId }, { $set: updatedMovie });

            console.log(`Movie updated ${result}`);
            return result;
        } catch (error) {
            console.log(`[movieService] Error: ${error}`);
        }
    }

    static async deleteMovieById(movieId) {
        console.log(`[deleteMovieById Model] ${movieId}`);
        movieId = new ObjectId(movieId);
        const movie = await client.db("dsw").collection("movies").deleteOne({ _id: movieId });
        return movie;
    }


    static async getArticlebyId(articleId) {
        try {
            const singleArticleResponse = await Article.findById({ _id: articleId });
            return singleArticleResponse;
        } catch (error) {
            console.log(`Article not found. ${error}`)
        }
    }

    static async updateArticle(title, body, articleImage) {
        try {
            const updateResponse = await Article.updateOne(
                { title, body, articleImage },
                { $set: { date: new Date.now() } });

            return updateResponse;
        } catch (error) {
            console.log(`Could not update Article ${error}`);

        }
    }

    static async deleteArticle(articleId) {
        try {
            const deletedResponse = await Article.findOneAndDelete(articleId);
            return deletedResponse;
        } catch (error) {
            console.log(`Could  ot delete article ${error}`);
        }

    }
}