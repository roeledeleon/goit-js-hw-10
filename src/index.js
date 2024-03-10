import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const breedSelectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

let breedId = '';

catInfoEl.style.display = 'none';
loaderEl.style.display = 'none';
errorEl.style.display = 'none';

//CREATE THE OPTIONS
function chooseBreed() {
  fetchBreeds().then(data => {
    //console.log(data);
    let optionsMarkup = data.map(({ name, id }) => {
      return `<option value=${id}>${name}</option>`;
    });
    breedSelectEl.insertAdjacentHTML('beforeend', optionsMarkup);
  });
}

chooseBreed();

breedSelectEl.addEventListener('change', e => {
  let breedId = e.target.value;
  fetchCatByBreed(breedId)
    .then(data => {
      const { url, breeds } = data[0];
      const { name, description, temperament } = breeds[0];

      //console.log(data[0]);
      //console.log(breeds[0]);

      catInfoEl.style.display = 'block';

      catInfoEl.innerHTML = `
      <br />
      <img src='${url}' alt='${name}' width="400" />
      <div class='box'>
        <h2>${name}</h2>
        <p>${description}</p>
        <p>${temperament}</p>
        `;
    })
    .catch(onError);
});

function onError(error) {
  Notiflix.Notify.warning(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
