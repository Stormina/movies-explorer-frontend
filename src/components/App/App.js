import {Routes, Route } from 'react-router-dom';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import ErrorPage from '../ErrorPage/ErrorPage.js';

function App() {
  
  const isLoggedIn = false; // Временное решение с авторизацией

  return (
      <div className="page">
        <Routes>
          <Route exact path="/"
            element={
              <div className="page__container">
                <Header isLoggedIn={isLoggedIn}/>
                <Main />
                <Footer />
              </div>
          }/>
          <Route exact path="/movies"
            element={
              <div className="page__container">
                <Header isLoggedIn={isLoggedIn}/>
                <Movies />
                <Footer />
              </div>
          }/>
          <Route exact path="/saved-movies"
            element={
              <div className="page__container">
                <Header isLoggedIn={isLoggedIn}/>
                <SavedMovies />
                <Footer />
              </div>
          }/>
          <Route exact path="/profile"
            element={
              <div className="page__container">
                <Header isLoggedIn={isLoggedIn}/>
                <Profile />
              </div>
          }/>
          <Route exact path="/signup"
            element={
                <Register />
          }/>
          <Route exact path="/signin"
            element={
                <Login />
          }/>
          <Route exact path="/error"
            element={
                <ErrorPage />
          }/>
        </Routes>
      </div>
  );
}

export default App;
