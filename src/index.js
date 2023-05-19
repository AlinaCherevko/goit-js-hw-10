import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputEl = document.getElementById('search-box');
const ulEl = document.querySelector('.country-list');
const divEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  clearInput();
  const value = inputEl.value.trim();
  if (value === '') return;
  fetchCountries(value)
    .then(showMarkup)
    .catch(error => console.log(error));
}

function showMarkup(results) {
  if (results.length === 1) {
    createMarkupCountryDiv(results);
  } else if (results.length >= 2 && results.length <= 10) {
    createMarkupCountryList(results);
  } else {
    Notify.info('Too many matches found. Please enter a more specific name');
  }
}

function createMarkupCountryList(results) {
  const markupList = results
    .map(
      ({ flags, name }) => ` <ul class="list">
    <li class="item"><div class="wrapper">
      <img class = "img-list" src="${flags.svg}" alt="" height = 30px
      width = 30px/>
      <p class="title">${name.official}</p></div>
    </li>
  </ul>`
    )
    .join('');
  ulEl.insertAdjacentHTML('beforeend', markupList);
}

function createMarkupCountryDiv(results) {
  const markupDiv = results
    .map(
      ({ flags, name, capital, population, languages }) => ` <ul class="list">
    <li class="item"><div class="wrapper">
      <img "img-div"  src="${flags.svg}" alt="" height = '30px'
      width = '30px' />
      <p class="title">${name.official}</p></div>
      <p class="deskr-capital">Capital: ${capital}</p>
        <p class="deskr-population">Population: ${population}</p>
        <p class="deskr-languages">Languages: ${Object.values(languages).join(
          ', '
        )}</p>
    </li>
  </ul>`
    )
    .join('');
  divEl.insertAdjacentHTML('beforeend', markupDiv);
}
function clearInput() {
  divEl.innerHTML = ' ';
  ulEl.innerHTML = ' ';
}
