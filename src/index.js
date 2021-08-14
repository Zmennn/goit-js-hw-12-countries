import fetchCountries from './js/fetchCountries';
import { refs } from './js/refs';
import debounce from 'lodash/debounce';
import countriesTemplate from './hbs/countries.hbs';
import countryTemplate from './hbs/country.hbs'

refs.input.addEventListener('input', debounce(onInput, 1500));


function onInput(event) {

    fetchCountries(event.target.value)

        .then(response => response.json())
        .then((countries) => responseHandler(countries))

}


function responseHandler(countries) {
    const numberCountries = countries.length;
    if (numberCountries === 1) {

        refs.output.innerHTML = countryTemplate(countries[0]);
        console.log(countries[0]);
        return

    } else if (numberCountries > 1 && numberCountries <= 10) {

        refs.output.innerHTML = countriesTemplate(countries);
        return
    }
}