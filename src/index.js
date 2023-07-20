import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_v5EguAbzIiJWZ7VTBs77ekkaDdiNotEihDYcrm3xSDi9iJqWcUq51xnFPLZxyao1";

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from "./cat-api"

const selectEl = document.querySelector('.breed-select');
const divEl = document.querySelector('.cat-info');
const loaderText = document.querySelector('.loader');
const errorText = document.querySelector('.error');


loaderText.hidden = true;
errorText.hidden = true;

const BASE_URL = `https://api.thecatapi.com/v1/breeds`;


fetchBreeds(BASE_URL).then((data) => {
    selectEl.innerHTML = '<option data-placeholder="true"></option>';
    const selectMarkup = createMarkup(data);
    selectEl.insertAdjacentHTML("beforeend", selectMarkup)

    new SlimSelect({
        select: '#selectElement',
        settings: {
    
        }
    })
})
    .catch(error => {
        Notiflix.Notify.failure(`${errorText.textContent}`)
        // errorText.hidden = false
    });


function createMarkup(arr) {
    return arr.map((el) => `<option value="${el.id}">${el.name}</option>`).join('')
}

selectEl.addEventListener('change', onSelect);

function onSelect(evt) {
    loaderText.hidden = false;
    divEl.innerHTML = '';

    fetchCatByBreed(evt.currentTarget.value)
        .then((data) => {
            loaderText.hidden = true;
            divEl.innerHTML = createCatImg(data);
            createCatText(data);    
        })   
}

function createCatImg(arr) {   
    return arr.map(({ url }) => `<img src="${url}" alt="">
    `).join('')   
}

function createCatText(arr) {
    const newArray = arr.flatMap((el) => el.breeds)
        .map((el) => `<div class ="cat-text"><h1>${el.name}</h1>
      <p>${el.description}</p>
      <p><span class = "cat-temerament-title">Temperament: </span>${el.temperament}</p></div>`
    ).join('')
    divEl.insertAdjacentHTML("beforeend", newArray)
}
