import fetchCountries from './js/fetchCountries';
import { refs } from './js/refs';

refs.input.addEventListener('input', onInput);


function onInput(event) {
    console.log(event.target.value);
    const result = fetchCountries(event.target.value);
    console.log(result);
}