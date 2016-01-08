import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
  _id: String,
  title: String,
  year: Number,
  rating: Number,
  shortPlot: String
});

movieSchema.static('findById', function (id, callback) {
  return this.find({ _id: id }, callback);
});

const Movie = mongoose.model('Movie', movieSchema);


function dbConnect() {
  return mongoose.connect('mongodb://moviefucker:pass@localhost:27017/movies');
}

function dbClose(db) {
  db.connection.close();
}

export function save(movieJSON) {
  const movie = new Movie(movieJSON);
  const db = dbConnect();
  movie.save((err, movie) => {
    dbClose(db);
    if (err) {
      return console.error(err);
    } else {
      console.log('saved into database');
    }
  });
}

export function getMovieFromDB(id) {
  return new Promise((resolve, reject) => {
    const db = dbConnect();
    Movie.findById(id, (err, movie) => {
      dbClose(db);
      if (!err && movie.length > 0) {
        resolve(movie);
      } else {
        reject(err);
      }
    })
  });
}
