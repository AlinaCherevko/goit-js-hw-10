import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputEl = document.getElementById('search-box');
const ulEl = document.querySelector('.country-list');
const divEl = document.querySelector('.country-info');
// console.log(inputEl);
// inputEl.addEventListener('input', onInput);
