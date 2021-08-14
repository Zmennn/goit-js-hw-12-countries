import fetchCountries from './js/fetchCountries';
import { refs } from './js/refs';
import debounce from 'lodash/debounce';

refs.input.addEventListener('input', debounce(onInput, 1500));


function onInput(event) {
    console.log(event.target.value);
    fetchCountries(event.target.value);

}