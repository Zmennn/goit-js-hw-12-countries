import fetchCountries from './js/fetchCountries';
import { refs } from './js/refs';
import debounce from 'lodash/debounce';

refs.input.addEventListener('input', debounce(onInput, 1500));


function onInput(event) {

    fetchCountries(event.target.value)

        .then(response => { return response.json() })
        .then((country) => console.log(country))
}