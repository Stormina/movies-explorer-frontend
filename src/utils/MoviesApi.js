const baseUrl = 'https://api.nomoreparties.co/beatfilm-movies';

function promiseReject(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getMovies = () => {
  return fetch(baseUrl, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(promiseReject);
};