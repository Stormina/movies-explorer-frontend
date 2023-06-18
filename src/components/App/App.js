import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import ErrorPage from '../ErrorPage/ErrorPage.js';
import * as MainApi from '../../utils/MainApi.js';
import * as MoviesApi from '../../utils/MoviesApi.js';

function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [notFoundMovies, setNotFoundMovies] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const [isShortMovies, setShortMovies] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") || false);


  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(pathname === '/saved-movies') {
      const token = localStorage.getItem('jwt')
      setProfileMessage('');
      setIsSuccess(true);
        MainApi.getSavedMovies(token)
          .then((movies) => {
            setSavedMovies(movies);
          })
          .catch(() => {
            console.log("Что-то пошло не так...");
          })
    }
  }, [pathname]);

  useEffect(() => {
    if(pathname === '/movies') {
      const token = localStorage.getItem('jwt');
      const searchedMovies = JSON.parse(localStorage.getItem('movies'));

      Promise.all([MainApi.getUserInfo(token), MainApi.getSavedMovies(token)])
        .then(([userData, movies]) => {
          setCurrentUser(userData);
          localStorage.setItem('savedMovies', JSON.stringify(movies));
          setSavedMovies(movies);
          setMovies(searchedMovies);
          setLoggedIn(true)
        })
        .catch(() => {
            console.log("Что-то пошло не так...");
          }
        )
    }
  }, [navigate, pathname, isLoggedIn])

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if(token) {
      MainApi.checkToken(token)
      .then(() => {
        setLoggedIn(true);
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log('400 — Токен не передан или передан не в том формате');
        } else if (err.status === 401) {
          console.log('401 — Переданный токен некорректен');
        }
      });
    }
  }, []);

  function handleRegister(name, password, email) {
    setRegisterErrorMessage('');
    setIsLoading(true);
    MainApi.signUp({name, password, email})
      .then((res) => {
        if(res.user) {
          setRegisterErrorMessage('')
          handleLogin(password, email);
        }
      })
      .catch(() => {
        setRegisterErrorMessage("Что-то пошло не так...");
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleLogin(password, email) {
    setRegisterErrorMessage('');
    setIsLoading(true);

    MainApi.signIn({password, email})
      .then((data) => {
        if(data.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', data.token)
          setLoginErrorMessage('');

          MainApi.getUserInfo(data.token)
            .then((userData) => {
              setCurrentUser(userData)
            })
            .catch((res) => {
              setLoginErrorMessage("Что-то пошло не так...");
            });
            navigate('/movies');
        }
      })
      .catch(() => {
        setLoginErrorMessage("Что-то пошло не так...");
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUserInfo(name, email) {
    MainApi.patchUserInfo({name, email})
      .then((data) => {
        if(data) {
          setCurrentUser(data);
          setProfileMessage("Профиль успешно обновлен!");
          setIsSuccess(true);
        }
      })
      .catch((res) => {
        setIsSuccess(false);
        setProfileMessage("Что-то пошло не так...");
      })
  }

  function handleShortMovies(e) {
    setShortMovies(e.target.checked);
  }

  const searchMovies = (word) => {
    setIsLoading(true);
    setMovies([]);
    setNotFoundMovies(false);
      if(allMovies.length === 0 ) {
        MoviesApi.getMovies()
          .then((movies) => {
              setAllMovies(movies)
              const searchResult = handleSearchMovies(movies, word)
              if(searchResult.length === 0) {
                setNotFoundMovies(true);
                setMovies([]);
              } else {
                localStorage.setItem('movies', JSON.stringify(searchResult))
                setMovies(JSON.parse(localStorage.getItem('movies')));
                setNotFoundMovies(false);
              }})
          .catch(() => {
            console.log("Что-то пошло не так...")
          })
          .finally(() => {
            setIsLoading(false);
          })
      } else {
        const searchResult = handleSearchMovies(allMovies, word)
        if(searchResult.length === 0) {
          setNotFoundMovies(true);
          setMovies([]);
          setIsLoading(false);
        } else if(searchResult.length !== 0) {
          localStorage.setItem('movies', JSON.stringify(searchResult));
          setMovies(JSON.parse(localStorage.getItem('movies')));
          setIsLoading(false);
          setNotFoundMovies(false);
        }
      }
  }

  function handleSaveMovie(movie) {
    const token = localStorage.getItem('jwt')
    MainApi.createMovie(movie, token)
      .then((savedMovie) => {
        const films = [...savedMovies, savedMovie];
        localStorage.setItem('savedMovies', JSON.stringify(films));
        setSavedMovies(state => ([...state, savedMovie]));
      })
      .catch(() => {
        console.log("Что-то пошло не так...");
      })
  }

  function handleDeleteMovie(movieId) {
    const token = localStorage.getItem('jwt')

    MainApi.deleteMovie(movieId, token)
      .then(() => {
        const newSavedMovies = savedMovies.filter((deletedMovie) => {return deletedMovie._id !== movieId})
        setSavedMovies(newSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
      })
      .catch(() => {
        console.log("Что-то пошло не так...");
      })
  }

  const handleSearchMovies = (movies, word) => {

    const filterRegex = new RegExp(word, "gi");
    return movies.filter((movie) => {
      if (isShortMovies) {
        return movie.duration <= 40 && filterRegex.test(movie.nameRU)
      } else {
        return filterRegex.test(movie.nameRU)
      }
    })
  }

  function searchSavedMovies(word) {
    const allSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const searchSavedResult = handleSearchMovies(allSavedMovies, word);
    if (searchSavedResult.length === 0) {
      setNotFoundMovies(true);
      setSavedMovies([]);
      setIsLoading(false);
    } else {
      setSavedMovies(searchSavedResult);
      setIsLoading(false);
      setNotFoundMovies(false);
    }
  }

  function cleanErrors() {
    setRegisterErrorMessage("");
    setLoginErrorMessage("");
  }

  function handleOnSignOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("movies");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    setAllMovies([]);
    setMovies([]);
    setSavedMovies([]);
    setNotFoundMovies(false);
    setCurrentUser("");
    navigate('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        { pathname === "/" ||
          pathname === "/movies" ||
          pathname === "/saved-movies" ||
          pathname === "/profile" ?
          <Header isLoggedIn={isLoggedIn}/> : ""
        }

        <Routes>
          <Route exact path="/" element={ <Main isLoggedIn={isLoggedIn}/> }/>
          <Route exact path="/movies" element={
            <ProtectedRoute 
              component={Movies}
              movies={movies}
              isLoggedIn={isLoggedIn}
              onSearchMovies={searchMovies}
              onDeleteMovie={handleDeleteMovie}
              onMovieSave={handleSaveMovie}
              notFoundMovies={notFoundMovies}
              setNotFoundMovies={setNotFoundMovies}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              onShortMovies={handleShortMovies}
              isShortMovies={isShortMovies} 
            />
          }/>
          <Route exact path="/saved-movies" element={
            <ProtectedRoute 
              component={SavedMovies}
              movies={savedMovies}
              onDeleteMovie={handleDeleteMovie}
              onSearchSavedMovies={searchSavedMovies}
              notFoundMovies={notFoundMovies}
              setNotFoundMovies={setNotFoundMovies}
              onShortMovies={handleShortMovies}
              isShortMovies={isShortMovies}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              isLoggedIn={isLoggedIn}
            />
          }/>
          <Route exact path="/profile" element={
            <ProtectedRoute 
              component={Profile}
              onSignOut={handleOnSignOut}
              onUserInfo={handleUserInfo}
              profileMessage={profileMessage}
              isSuccess={isSuccess}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />
          }/>
          <Route exact path="/signup" element={
            <Register 
              onRegister={handleRegister}
              errorMessage={registerErrorMessage}
              isLoading={isLoading}
              onClean={cleanErrors}
              isLoggedIn={isLoggedIn}
            />
          }/>
          <Route path="/signin" element={
            <Login 
              onLogin={handleLogin}
              errorMessage={loginErrorMessage}
              isLoading={isLoading}
              onClean={cleanErrors}
              isLoggedIn={isLoggedIn}
            />
          }/>
          <Route path="*" element={ <ErrorPage /> }/>
        </Routes>

        { pathname === "/" ||
          pathname === "/movies" ||
          pathname === "/saved-movies" ?
          <Footer isLoggedIn={isLoggedIn}/> : ""
        }
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
