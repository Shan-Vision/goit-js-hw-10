import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputCountryName, DEBOUNCE_DELAY));

function onInputCountryName() {
  const isInput = refs.input.value.trim();
  refs.info.innerHTML = '';
  refs.list.innerHTML = '';

  if (isInput) {
    fetchCountries(isInput)
      .then(dataChecking)
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
        console.log(error);
      });
  }

  function dataChecking(data) {
    console.log(data);
    if (data.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
      return;
    }

    listOfCountriesMarkUp(data);
  }
  function listOfCountriesMarkUp(data) {
    console.log(data);

    const countryFilter = data
      .map(({ flags: { svg }, name: { official } }) => {
        return `<li><img src="${svg}" alt="${official}" width="50" height="50"/>${official}</li>`;
      })
      .join('');

    if (data.length === 1) {
      const languages = Object.values(data[0].languages);
      const currency = Object.values(data[0].currencies);
      const valute = currency[0].name;

      const countyInfoMarkup = `<ul>
        <li>Capital: ${data[0].capital}</li>
        <li>Population: ${data[0].population}</li>
        <li>Languages: ${languages}</li>
        <li>Currency: ${valute}</li>
        </ul>`;

      refs.info.insertAdjacentHTML('afterbegin', countyInfoMarkup);
    }
    return refs.list.insertAdjacentHTML('afterbegin', countryFilter);
  }
}
