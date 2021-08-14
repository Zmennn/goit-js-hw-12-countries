import fetchCountries from './js/fetchCountries';
import { refs } from './js/refs';
import debounce from 'lodash/debounce';

refs.input.addEventListener('input', debounce(onInput, 1500));


function onInput(event) {

    fetchCountries(event.target.value)

        .then(response => response.json())
        .then((countries) => responseHandler(countries))

}


function responseHandler(countries) {
    const numberCountries = countries.length;
    if (numberCountries === 1) {
        markupCountry(countries);
        return
    } else if (numberCountries > 1 && numberCountries <= 10) {
        markupCountries(countries);
        return
    }
}