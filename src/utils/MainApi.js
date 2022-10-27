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

  // updateUserAvatar(data) {
  //     return this._sendData(`${this._baseUrl}/users/me/avatar`, 'PATCH', data)
  // }

  // getCards() {
  //     return this._getData(`${this._baseUrl}/cards`);
  // }

  // setLike(cardId) {
  //     return this._sendData(`${this._baseUrl}/cards/${cardId}/likes`, 'PUT', {});
  // }

  // deleteLike(cardId) {
  //     return this._sendData(`${this._baseUrl}/cards/${cardId}/likes`, 'DELETE', {});
  // }

  // changeLikeCardStatus(cardId, setLike) {
  //     return setLike ? this.setLike(cardId) : this.deleteLike(cardId);
  // }

  // createCard({ name, link }) {
  //     return this._sendData(`${this._baseUrl}/cards`, 'POST', { name, link });
  // }

  // deleteCard(cardId) {
  //     return this._sendData(`${this._baseUrl}/cards/${cardId}`, 'DELETE', {});
  // }
}

const mainApi = new MainApi({
  baseUrl: MainApiUrl,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;
