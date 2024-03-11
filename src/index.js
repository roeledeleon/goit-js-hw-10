// ---------- IMPORTS
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import './styles.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// ---------- DECLARATIONS
const breedSelectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

breedSelectEl.style.display = 'none';
catInfoEl.style.display = 'none';
loaderEl.style.display = 'none';
errorEl.style.display = 'none';

// ---------- FUNCTIONS
let breedId = '';

function chooseBreed() {
  loaderEl.style.display = 'block';
  fetchBreeds()
    .then(data => {
      //console.log(data);
      let optionsMarkup = data.map(({ name, id }) => {
        return `<option value=${id}>${name}</option>`;
      });
      breedSelectEl.insertAdjacentHTML('beforeend', optionsMarkup);
      loaderEl.style.display = 'none';
      breedSelectEl.style.display = 'block';
    })
    .catch(onError);
}

chooseBreed();

breedSelectEl.addEventListener('change', e => {
  e.preventDefault();
  loaderEl.style.display = 'block';
  let breedId = e.target.value;
  fetchCatByBreed(breedId)
    .then(data => {
      const { url, breeds } = data[0];
      const { name, description, temperament } = breeds[0];

      catInfoEl.innerHTML = `
        <br />
        <div class="box-img">
          <img src="${url}" alt="cat" width="500"/>
        </div>
       
        <div class="box">
          <h1>${name}</h1>
          <p>${description}</p>
          <p><b>Temperament:</b> ${temperament}</p>
        </div>
        `;

      catInfoEl.style.display = 'flex';
      loaderEl.style.display = 'none';
    })
    .catch(onError);
});

function onError(error) {
  //errorEl.style.display = 'block';
  Notiflix.Notify.warning(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

// function chooseBreed() {
//   let arrBreedsId = [];
//   breedSelectEl.style.display = 'block';
//   fetchBreeds()
//     .then(data => {
//       data.forEach(element => {
//         arrBreedsId.push({ text: element.name, value: element.id });
//       });
//       console.log(arrBreedsId);
//       new SlimSelect({
//         select: breedSelectEl,
//         data: arrBreedsId,
//         placeholder: 'Search',
//         showSearch: false, // shows search field
//         searchText: 'Sorry couldnt find anything',
//       });
//     })
//     .catch(onError);
// }
