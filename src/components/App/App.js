import React from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './App.css';

function App() {
  const loggedIn = true;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function handleOpenSidebarButtonClick() {
    setIsSidebarOpen(true);
  }

  function handleCloseSidebarButtonClick() {
    setIsSidebarOpen(false);
  }

  return (
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
            <Movies />
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
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Sidebar loggedIn={loggedIn} isOpen={isSidebarOpen} onClose={handleCloseSidebarButtonClick} />
    </div>
  );
}

export default App;
