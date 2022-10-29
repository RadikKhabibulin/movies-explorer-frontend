export const BeatfilmMoviesApiUrl = 'https://api.nomoreparties.co';
export const MainApiUrl = 'https://api.portfolio.nomorepartiesxyz.ru';

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
    (isShrot ? movie.duration <= 40 : true)
  );
}

export const getColumnsCount = () => {
  const width = document.documentElement.clientWidth;
  let columnCount = 0;

  if (width > 1280) {
    columnCount = 4;
  }
  else if (width <= 1280 && width > 1000) {
    columnCount = 3;
  }
  else if (width <= 1000 && width > 768) {
    columnCount = 2;
  }
  else {
    columnCount = 1;
  }

  return columnCount;
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
