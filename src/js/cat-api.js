// import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_RjFrT6Nw9qX7Z0iWmOUphd7cuMV9RTuhDF659rrpmA75tC9IbGcCyy1GGtgKwHy5';

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    } else {
      return res.json();
    }
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    } else {
      return res.json();
    }
  });
}

// axios.defaults.headers.common['x-api-key'] = API_KEY;
// axios.defaults.baseURL = BASE_URL;

// export function fetchBreeds() {
//   return axios.get('/breeds').then(response => {
//     return response.data;
//   });
// }

// export function fetchCatByBreed(breedId) {
//   return axios.get(`/images/search?breed_ids=${breedId}`).then(resp => {
//     return resp.data;
//   });
// }
