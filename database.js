const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

async function main() {
  const client = new MongoClient(process.env.mongoURI);
  try {
    await client.connect();
    // await listDatabases(client);
    // await createMovie(client, {
    //   name: 'xxxx',
    //   director: 'xxxx',
    //   link: 'xxxx'
    // });

    // await createMovies(client, [
    //   {
    //     name: 'Movie 1',
    //     director: 'diretor 1',
    //     link: 'xxxx'
    //   },
    //   {
    //     name: 'Movie 2',
    //     director: 'xxxx',
    //     link: 'xxxx'
    //   },
    //   {
    //     name: 'Movie 3',
    //     director: 'xxxx',
    //     link: 'xxxx'
    //   },
    // ]);

    // await findMovieByName(client, '12 anos de escravidão');
    await findAllMovies(client);
    await updateMovieById(client, '633edfbb3c06dc65855fb190',
      { name: 'O diário de Anne Frank' }
    );
    // await updateMovieByName(client, 'Central do Brasil',
    //   { name: 'teste' }
    // );

  } catch (error) {
    console.log('Error:', error);
  } finally {
    await client.close();
  }
};

main().catch(console.error);

//Listar os banco de dados. 
async function listDatabases(client) {
  const databaseList = await client.db().admin().listDatabases();
  console.log('Databases');
  databaseList.databases.forEach(db => {
    console.log(` - ${db.name}`);
  });
}

async function createMovie(client, movie) {
  const result = await client.db("dsw").collection("movies").insertOne(movie);
  console.log(`New movie inserted with the following id ${result.insertedId}`);
}

//movies should be an array of movies
async function createMovies(client, movies) {
  const result = await client.db("dsw").collection("movies").insertMany(movies);
  console.log(`${result.insersetedCount} movies inserted on the db`);
  console.log(`Inserted Ids ${result.insertedIds}`);
}

async function findMovieByName(client, name) {
  console.log(`Buscando filme com o nome ${name} ...`);
  const result = await client.db("dsw").collection("movies").findOne({ name: name });
  if (result) {
    console.log(`Filme encontrado com o nome ${name}`);
    console.log(result);
  } else {
    console.log(`Filme não encontrado com o nome ${name}`);
  }
}

async function findAllMovies(client) {
  console.log(`Buscando todos os filmes`);
  const cursor = await client.db("dsw").collection("movies").find();

  const results = await cursor.toArray();
  if (results.length > 0) {
    console.log(`Filmes encontrados`);
    results.forEach((result, i) => {
      console.log(`id: ${result._id}`)
      console.log(`${result.name}`);
      console.log(`${result.director}`);
    })
  } else {
    console.log(`Não existe nenhum filme cadastrado`);
  }
}

async function updateMovieById(client, movieId, updatedMovie) {
  console.log(`Update movie com id=${movieId}`);
  movieId = new ObjectId(movieId);
  const result = await client.db("dsw").collection("movies").updateOne({ _id: movieId }, { $set: updatedMovie });

  console.log(`${result.matchedCount} movies matched the query criteria`);
  console.log(`${result.modifiedCount} filmes foram atualizados.`)
}

async function updateMovieByName(client, movieName, updatedMovie) {
  console.log(`Update movie com nome=${movieName}`);
  const result = await client.db("dsw").collection("movies").updateOne({ name: movieName }, { $set: updatedMovie });

  console.log(`${result.matchedCount} movies matched the query criteria`);
  console.log(`${result.modifiedCount} filmes foram atualizados.`)
}