import React from 'react';
import { useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import '../../index.css';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';


function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function handleOpenSidebarButtonClick() {
    setIsSidebarOpen(true);
  }

  function handleCloseSidebarButtonClick() {
    setIsSidebarOpen(false);
  }

  function handleLogout() {
    console.log('Выход из системы');
  }

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={
          <>
            <Header loggedIn={loggedIn} onSidebar={handleOpenSidebarButtonClick} onHandleLogout={handleLogout}/>
            <Main />
            <Footer />
          </>
        } />
        <Route path="/movies" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} onSidebar={handleOpenSidebarButtonClick} onHandleLogout={handleLogout}/>
            movies
            <Footer />
          </ProtectedRoute>
        } />
        <Route path="/saved-movies" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} onSidebar={handleOpenSidebarButtonClick} onHandleLogout={handleLogout}/>
            saved-movies
            <Footer />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} onSidebar={handleOpenSidebarButtonClick} onHandleLogout={handleLogout}/>
            profile
          </ProtectedRoute>
        } />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Sidebar loggedIn={loggedIn} isOpen={isSidebarOpen} onClose={handleCloseSidebarButtonClick}/>
    </div>
  );
}

export default App;
