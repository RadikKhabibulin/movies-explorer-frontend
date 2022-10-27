import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { CurrentUserContext, defaultUser } from '../../contexts/CurrentUserContext';

import Main from '../Main/Main';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Sidebar from '../Sidebar/Sidebar';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('loggedIn') === 'true' ? true : false
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [responseError, setResponseError] = useState('');
  const [responseSucces, setResponseSucces] = useState('');

  const [isPreloaderOpen, setIsPreloaderOpen] = useState(true);
  const [movies, setMovies] = useState([]);
  const [isMoviesLoaded, setIsMoviesLoaded] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSavedMoviesLoaded, setIsSavedMoviesLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    mainApi.getUserInfo()
    .then(userInfo => {
      setCurrentUser(userInfo.data);
    })
    .catch(err => {
      console.log(`Ошибка получения данных пользователя: ${err}`);
    });
  }, [loggedIn]);

  useEffect(() => {
    checkToken(true);
  }, []);

  useEffect(() => {
    handleSearchClick();
  }, []);

  useEffect(() => {
    if (!isMoviesLoaded || !isSavedMoviesLoaded) {
      return;
    }

    movies.forEach((movie) => {
      savedMovies.forEach((savedMovie) => {
        if (savedMovie.movieId === movie.id) {
          movie.isLiked = true;
        }
      });
    });

    setIsPreloaderOpen(false);
  }, [isMoviesLoaded, isSavedMoviesLoaded]);

  function checkTextIncludes(nameEN, nameRU, filter) {
    return (
      nameEN.toLowerCase().includes(filter.toLowerCase()) ||
      nameRU.toLowerCase().includes(filter.toLowerCase())
    );
  }

  function handleSearchClick() {
    setIsPreloaderOpen(true);
    setIsMoviesLoaded(false);
    setIsSavedMoviesLoaded(false);

    const isCheckboxEnabled = (
      localStorage.getItem('isCheckboxEnabled') === 'true' ? true : false
    );
    const searchFilter = (
      localStorage.getItem('searchFilter') ? localStorage.getItem('searchFilter') : ''
    );

    moviesApi.getMovies()
    .then((movies) => {
      const newArray = movies.filter(function (movie) {
        return (
          checkTextIncludes(movie.nameEN, movie.nameRU, searchFilter) &&
          (isCheckboxEnabled ? movie.duration <= 40 : true)
        );
      });

      setMovies(newArray);
      setIsMoviesLoaded(true);
    });

    mainApi.getMovies()
    .then((movies) => {
      const newArray = movies.data.filter(function (movie) {
        return (
          checkTextIncludes(movie.nameEN, movie.nameRU, searchFilter) &&
          (isCheckboxEnabled ? movie.duration <= 40 : true)
        );
      });

      setSavedMovies(newArray);
      setIsSavedMoviesLoaded(true);
    });
  }

  function handleOpenSidebarButtonClick() {
    setIsSidebarOpen(true);
  }

  function handleCloseSidebarButtonClick() {
    setIsSidebarOpen(false);
  }

  function checkToken(initial=false) {
    mainApi.getUserInfo()
    .then(() => {
      setLoggedIn(true);
      localStorage.setItem('loggedIn', true)
    })
    .catch(err => {
      let msg = '';
      localStorage.removeItem('loggedIn');
      setLoggedIn(false);

      if (err === 400)
        msg = 'При авторизации произошла ошибка. Токен не передан или передан не в том формате';
      else if (err === 401)
        msg = 'При авторизации произошла ошибка. Переданный токен некорректен';
      else
        msg = `На сервере произошла ошибка. Код ошибки: ${err}`;

      if (initial)
        console.log(msg);
      else
        setResponseError(msg);
    });
  };

  function handleLogin(email, password) {
    mainApi.login(email, password)
    .then(() => {
      checkToken();
    })
    .then(() => {
      navigate('/movies');
    })
    .catch((err) => {
      if (err === 400)
        setResponseError('Некорректно заполнено одно из полей');
      else if (err === 401)
        setResponseError('Вы ввели неправильный логин или пароль');
      else
        setResponseError(`На сервере произошла ошибка. Код ошибки: ${err}`);
    })
  }

  function handleRegister(name, email, password) {
    mainApi.register(name, email, password)
    .then(() => {
      handleLogin(email, password);
    })
    .catch((err) => {
      if (err === 400)
        setResponseError('Некорректно заполнено одно из полей');
      else if (err === 409)
        setResponseError('Пользователь с таким email уже существует');
      else
        setResponseError('При регистрации пользователя произошла ошибка');
    })
  }

  function handleUpdateUser(name, email) {
    mainApi.updateUserInfo(name, email)
    .then(newUserInfo => {
      setCurrentUser(newUserInfo.data);
      setResponseSucces('Успешное обновление профиля');
    })
    .catch(err => {
      if (err === 400)
        setResponseError('Некорректно заполнено одно из полей');
      else if (err === 409)
        setResponseError('Пользователь с таким email уже существует');
      else
        setResponseError('При обновлении профиля произошла ошибка');
    })
  }

  function handleLogout() {
    mainApi.logout()
    .then(() => {
      setLoggedIn(false);
      localStorage.clear();
      navigate('/');
    })
    .catch((err) => {
      setResponseError(`Ошибка выхода из системы. Код ошибки: ${err}`);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={
            <>
              <Header loggedIn={loggedIn} onSidebar={handleOpenSidebarButtonClick} />
              <Main />
              <Footer />
            </>
          } />
          <Route path="/movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} onSidebar={handleOpenSidebarButtonClick} />
              <Movies
                movies={movies}
                isPreloaderOpen={isPreloaderOpen}
                onHandleSearchClick={handleSearchClick}
                // isCheckboxEnabled={isCheckboxEnabled}
                // setIsCheckboxEnabled={setIsCheckboxEnabled}
                // searchFilter={searchFilter}
                // setSearchFilter={setSearchFilter}
              />
              <Footer />
            </ProtectedRoute>
          } />
          <Route path="/saved-movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} onSidebar={handleOpenSidebarButtonClick} />
              <SavedMovies />
              <Footer />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} onSidebar={handleOpenSidebarButtonClick} />
              <Profile
                onHandleUpdateUser={handleUpdateUser}
                onHandleLogout={handleLogout}
                setResponseSucces={setResponseSucces}
                setResponseError={setResponseError}
                responseSucces={responseSucces}
                responseError={responseError}
              />
            </ProtectedRoute>
          } />
          <Route path="/signin" element={
            <ProtectedRoute loggedIn={!loggedIn} navigateTo={'/movies'}>
              <Login
                onHandleLogin={handleLogin}
                setResponseError={setResponseError}
                responseError={responseError}
              />
            </ProtectedRoute>
          } />
          <Route path="/signup" element={
            <ProtectedRoute loggedIn={!loggedIn} navigateTo={'/movies'}>
              <Register
                onHandleRegister={handleRegister}
                setResponseError={setResponseError}
                responseError={responseError}
              />
            </ProtectedRoute>
          } />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Sidebar loggedIn={loggedIn} isOpen={isSidebarOpen} onClose={handleCloseSidebarButtonClick} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
