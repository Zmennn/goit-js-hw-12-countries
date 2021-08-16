import fetchCountries from './js/fetchCountries';
import { refs } from './js/refs';
import debounce from 'lodash/debounce';
import countriesTemplate from './hbs/countries.hbs';
import countryTemplate from './hbs/country.hbs';
import { notificationSettings, onErrorNotification } from './js/notifications'




refs.input.addEventListener('input', debounce(onInput, 700));



function onInput(event) {
    notificationSettings.close();

    if (event.target.value.trim("") === "") { return };

    refs.output.innerHTML = "";

    fetchCountries(event.target.value.trim(""))

        .then(response => response.ok ? response : Promise.reject(response))
        .then(response => response.json())
        .then((countries) => {
            responseHandler(countries)
        })

        .catch((err) => { console.log(err); errorHandler(err.status) })
};







function responseHandler(countries) {


    const numberCountries = countries.length;
    if (numberCountries === 1) {

        refs.output.innerHTML = countryTemplate(countries[0]);
        return

    };
    if (numberCountries > 1 && numberCountries <= 10) {

        refs.output.innerHTML = countriesTemplate(countries);
        refs.countryList.addEventListener('click', onCountryList)
        return
    };

    onErrorNotification("Уточните запрос", "Полученно слишком много результатов")
};









function errorHandler(errNumber) {
    console.log(errNumber);
    if (errNumber === 404) {
        onErrorNotification("Ошибка", "Похоже такой страны нет");
        return
    };
    onErrorNotification("Ошибка", "Скорее всего проблема связи")
};






function onCountryList(event) {


    if (event.target.dataset.attribute !== "country") { return };
    const a = event.target.textContent
    console.log(coun).bind(responseHandler);

}
