export const BeatfilmMoviesApiUrl = 'https://api.nomoreparties.co';
export const MainApiUrl = 'https://api.portfolio.nomorepartiesxyz.ru';

export const DEFAULT_INITIAL_ROW_COUNT = 4;
export const MOBILE_INITIAL_ROW_COUNT = 5;

const IS_FULL_WIDTH = 1280;
const IS_LARGE_WIDTH = 1000;
const IS_MIDDLE_WIDTH = 768;
const FULL_WIDTH_COLUMN_COUNT = 4;
const LARGE_WIDTH_COLUMN_COUNT = 3;
const MIDDLE_WIDTH_COLUMN_COUNT = 2;
const SMALL_WIDTH_COLUMN_COUNT = 1;
const MAX_SHORT_MOVIE_DURATION = 40;

export class Api {
  constructor({ baseUrl, headers, credentials }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._credentials = credentials;
  }

  _getData(url) {
    return fetch(url, {
      method: 'GET',
      headers: this._headers,
      credentials: this._credentials,
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }

      return Promise.reject(res.status);
    });
  }

  _sendData(url, method, data) {
    return fetch(url, {
      method: method,
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status);
    });
  }
}

export const filterMovies = (movie, filter, isShrot) => {
  return (
    (movie.nameEN.toLowerCase().includes(filter.toLowerCase()) ||
    movie.nameRU.toLowerCase().includes(filter.toLowerCase())) &&
    (isShrot ? movie.duration <= MAX_SHORT_MOVIE_DURATION : true)
  );
}

export const getColumnsCount = () => {
  const width = document.documentElement.clientWidth;

  if (width > IS_FULL_WIDTH) {
    return FULL_WIDTH_COLUMN_COUNT;
  }
  else if (width <= IS_FULL_WIDTH && width > IS_LARGE_WIDTH) {
    return LARGE_WIDTH_COLUMN_COUNT;
  }
  else if (width <= IS_LARGE_WIDTH && width > IS_MIDDLE_WIDTH) {
    return MIDDLE_WIDTH_COLUMN_COUNT;
  }
  else {
    return SMALL_WIDTH_COLUMN_COUNT;
  }
}

export const prepareMovieParams = (movie) => {
  try {
    return {
      "nameRU": movie.nameRU,
      "nameEN": movie.nameEN,
      "director": movie.director,
      "country": movie.country,
      "year": movie.year,
      "duration": movie.duration,
      "description": movie.description,
      "trailerLink": movie.trailerLink,
      "image": BeatfilmMoviesApiUrl + movie.image.url,
      "thumbnail": BeatfilmMoviesApiUrl + movie.image.formats.thumbnail.url,
      "movieId": movie.id
    }
  } catch {
    return null;
  }
}
