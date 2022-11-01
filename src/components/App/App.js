import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { prepareMovieParams } from '../../utils/constants';
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
  const [isItWaitingAnswer, setIsItWaitingAnswer] = useState(false);

  const [isPreloaderOpen, setIsPreloaderOpen] = useState(false);
  const [movies, setMovies] = useState(
    localStorage.getItem('Movies') ? JSON.parse(localStorage.getItem('Movies')) : []
  );
  const [savedMovies, setSavedMovies] = useState(
    localStorage.getItem('SavedMovies') ? JSON.parse(localStorage.getItem('SavedMovies')) : []
  );
  const [isMoviesLoaded, setIsMoviesLoaded] = useState(false);
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

    localStorage.setItem('Movies', JSON.stringify(movies));
    localStorage.setItem('SavedMovies', JSON.stringify(savedMovies));

    setIsPreloaderOpen(false);
  }, [isMoviesLoaded, isSavedMoviesLoaded]);

  function downloadMovies() {
    if (!loggedIn) {
      return;
    }

    setIsPreloaderOpen(true);
    setIsMoviesLoaded(false);
    setIsSavedMoviesLoaded(false);

    moviesApi.getMovies()
    .then((movies) => {
      setMovies(movies);
      setIsMoviesLoaded(true);
    });

    mainApi.getMovies()
    .then((savedMovies) => {
      setSavedMovies(savedMovies.data);
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
    return mainApi.getUserInfo()
    .then(() => {
      setLoggedIn(true);
      localStorage.setItem('loggedIn', true);
    })
    .catch(err => {
      let msg = '';

      setLoggedIn(false);
      setMovies([]);
      setSavedMovies([]);
      localStorage.clear();

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
    setIsItWaitingAnswer(true);

    mainApi.login(email, password)
    .then(() => {
      return checkToken()
        .then(() => {
          navigate('/movies');
        });
    })
    .catch((err) => {
      if (err === 400)
        setResponseError('Некорректно заполнено одно из полей');
      else if (err === 401)
        setResponseError('Вы ввели неправильный логин или пароль');
      else
        setResponseError(`На сервере произошла ошибка. Код ошибки: ${err}`);
    })
    .finally(() => {
      setIsItWaitingAnswer(false);
    });
  }

  function handleRegister(name, email, password) {
    setIsItWaitingAnswer(true);

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

      setIsItWaitingAnswer(false);
    });
  }

  function handleUpdateUser(name, email) {
    setIsItWaitingAnswer(true);

    mainApi.updateUserInfo(name, email)
    .then(newUserInfo => {
      setCurrentUser(newUserInfo.data);
      setResponseSucces('Успешное обновление профиля');
    })
    .catch(err => {
      if (err === 400)
        setResponseError('Некорректно заполнено одно из полей');
      else if (err === 401) {
        handleLogout();
      }
      else if (err === 409)
        setResponseError('Пользователь с таким email уже существует');
      else
        setResponseError('При обновлении профиля произошла ошибка');
    })
    .finally(() => {
      setIsItWaitingAnswer(false);
    })
  }

  function handleLogout() {
    setIsItWaitingAnswer(true);

    mainApi.logout()
    .then(() => {
      setLoggedIn(false);
      localStorage.clear();
      setMovies([]);
      setSavedMovies([]);
      navigate('/');
    })
    .catch((err) => {
      setResponseError(`Ошибка выхода из системы. Код ошибки: ${err}`);
    })
    .finally(() => {
      setIsItWaitingAnswer(false);
    });
  }

  function handleMovieLike(movie) {
    if (movie.isLiked) {
      movie.isLiked = false;
      const deletedMovieId = savedMovies.find(m => m.movieId === movie.id)._id;

      mainApi.deleteMovie(deletedMovieId)
      .then((deletedMovie) => {
        const newMovies = movies.map(m => m.id === movie.id ? movie : m);
        const newSavedMovies = savedMovies.filter(m => m._id !== deletedMovie.data._id);

        localStorage.setItem('Movies', JSON.stringify(newMovies));
        localStorage.setItem('SavedMovies', JSON.stringify(newSavedMovies));

        setMovies(newMovies)
        setSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        if (err === 401) {
          handleLogout();
        }
        console.log(`Ошибка удаления фильма из списка сохраненных: ${err}`);
      })
    }
    else {
      const newMovieParams = prepareMovieParams(movie);
      if (!newMovieParams) {
        console.log('Ошибка добавления фильма в сохраненные. Попробуйте перезагрузить страницу.');
        return;
      }

      mainApi.createMovie(newMovieParams)
      .then((createdMovie) => {
        movie.isLiked = true;
        const newMovies = movies.map(m => m.id === movie.id ? movie : m);
        const newSavedMovies = [createdMovie, ...savedMovies];

        localStorage.setItem('Movies', JSON.stringify(newMovies));
        localStorage.setItem('SavedMovies', JSON.stringify(newSavedMovies));

        setMovies(newMovies);
        setSavedMovies(newSavedMovies);
      })
      .catch(err => {
        if (err === 401) {
          handleLogout();
        }
        console.log(`Ошибка добавления фильма в список сохраненных: ${err}`);
      })
    }
  }

  function handleDeleteMovie(movieId) {
    mainApi.deleteMovie(movieId)
    .then((deletedMovie) => {
      const foundMovie = movies.find(m => m.id === deletedMovie.data.movieId);
      const newSavedMovies = savedMovies.filter(m => m._id !== deletedMovie.data._id);

      if (foundMovie) {
        foundMovie.isLiked = false;
      }

      localStorage.setItem('Movies', JSON.stringify(movies));
      localStorage.setItem('SavedMovies', JSON.stringify(newSavedMovies));

      setMovies(movies);
      setSavedMovies(newSavedMovies);
    })
    .catch(err => {
      if (err === 401) {
        handleLogout();
      }
      console.log(`Ошибка удаления фильма из списка сохраненных: ${err}`);
    })
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
                setMovies={setMovies}
                isPreloaderOpen={isPreloaderOpen}
                onDownloadMovies={downloadMovies}
                onHandleMovieLike={handleMovieLike}
              />
              <Footer />
            </ProtectedRoute>
          } />
          <Route path="/saved-movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} onSidebar={handleOpenSidebarButtonClick} />
              <SavedMovies
                moviesLength={movies.length}
                savedMovies={savedMovies}
                isPreloaderOpen={isPreloaderOpen}
                onDownloadMovies={downloadMovies}
                onHandleDeleteMovie={handleDeleteMovie}
              />
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
                isItWaitingAnswer={isItWaitingAnswer}
              />
            </ProtectedRoute>
          } />
          <Route path="/signin" element={
            <ProtectedRoute loggedIn={!loggedIn} navigateTo={'/movies'}>
              <Login
                onHandleLogin={handleLogin}
                setResponseError={setResponseError}
                responseError={responseError}
                isItWaitingAnswer={isItWaitingAnswer}
              />
            </ProtectedRoute>
          } />
          <Route path="/signup" element={
            <ProtectedRoute loggedIn={!loggedIn} navigateTo={'/movies'}>
              <Register
                onHandleRegister={handleRegister}
                setResponseError={setResponseError}
                responseError={responseError}
                isItWaitingAnswer={isItWaitingAnswer}
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
