// Страны в списке от 2 до 10 шт сделаны кликабельными,
//     оно просилось так сделать, хоть в условии вроде нет
//     такого требования)


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
            new ResultHandler(countries)
        })

        .catch((err) => { errorHandler(err.status) })
};


class ResultHandler {

    constructor(countries) {
        this.countries = countries;
        this.responseHandler();
    };

    responseHandler() {


        const numberCountries = this.countries.length;
        if (numberCountries === 1) {

            refs.output.innerHTML = countryTemplate(this.countries[0]);
            return

        };
        if (numberCountries > 1 && numberCountries <= 10) {

            refs.output.innerHTML = countriesTemplate(this.countries);
            refs.countryList.addEventListener('click', this.onCountryList.bind(this))
            return
        };

        onErrorNotification("Уточните запрос", "Полученно слишком много результатов")
    };

    onCountryList(event) {
        refs.countryList.removeEventListener('click', this.onCountryList.bind(this));
        event.preventDefault();

        if (event.target.dataset.attribute !== "country") { return };

        this.countries.forEach((country) => {
            if (country.name === event.target.textContent) {
                refs.output.innerHTML = countryTemplate(country)
            }
        })
    }
}


function errorHandler(errNumber) {

    if (errNumber === 404) {
        onErrorNotification("Ошибка", "Похоже такой страны нет");
        return
    };
    onErrorNotification("Ошибка", "Скорее всего проблема связи")
};






