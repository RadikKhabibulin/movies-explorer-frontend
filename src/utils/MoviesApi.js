import {
  BeatfilmMoviesApiUrl, Api
} from './constants';

class MoviesApi extends Api{
  getMovies() {
      return this._getData(`${this._baseUrl}/beatfilm-movies`);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: BeatfilmMoviesApiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default moviesApi;
