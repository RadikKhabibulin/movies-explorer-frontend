import {
  MainApiUrl, Api
} from './constants';

class MainApi extends Api {
  register(name, email, password) {
    return this._sendData(`${this._baseUrl}/signup`, 'POST', {name, email, password});
  }

  login(email, password) {
    return this._sendData(`${this._baseUrl}/signin`, 'POST', {email, password});
  }

  logout() {
    return this._getData(`${this._baseUrl}/signout`);
  }

  getUserInfo() {
    return this._getData(`${this._baseUrl}/users/me`);
  }

  updateUserInfo(name, email) {
    return this._sendData(`${this._baseUrl}/users/me`, 'PATCH', {name, email});
  }

  getMovies() {
    return this._getData(`${this._baseUrl}/movies`);
  }

  createMovie(params) {
    return this._sendData(`${this._baseUrl}/movies`, 'POST', params);
  }

  deleteMovie(movieId) {
    return this._sendData(`${this._baseUrl}/movies/${movieId}`, 'DELETE', {});
  }
}

const mainApi = new MainApi({
  baseUrl: MainApiUrl,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;
