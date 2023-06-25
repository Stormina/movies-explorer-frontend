const baseUrl = 'https://movies.students.nomoredomains.monster/api';

function promiseReject(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserInfo = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
  .then(promiseReject)
  .then((data) => data);
};

export const patchUserInfo = ({ name, email }) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  })
  .then(promiseReject);
};

export const createMovie = (movie, token) => {
  return fetch(`${baseUrl}/movies`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailerLink: movie.trailerLink,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }),
  })
  .then(promiseReject)
  .then((data) => data);
};

export const deleteMovie = (movieId, token ) => {
  return fetch(`${baseUrl}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
  .then(promiseReject)
  .then((data) => data);
};

export const getSavedMovies = (token) => {
  return fetch(`${baseUrl}/movies`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
  .then(promiseReject)
  .then((data) => data);;
};

export const signUp = ({ name, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    })
  })
  .then(promiseReject)
};

export const signIn = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(promiseReject)
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
  method: 'GET',
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    },
  })
  .then(promiseReject);
};