import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchApi } from './fetchCountries.js';



export const BASE_URL = 'https://restcountries.com/v3.1/name'
const DEBOUNCE_DELAY = 300;


export const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, 300));







function onInput(){
    fetchApi(input.value.trim()).then((data) => {
        
        if(input.value.trim() === ''){
            list.innerHTML = '';
        }else if(data.length > 10){
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.' );
            list.innerHTML = ' ';
        }else if(2 < data.length < 10){
            createMarkupForMultiply(data);
        }
        
        if(data.length === 1){
            createMarkupForOne(data)
        }

        
        
    }).catch(err => {
        if(input.value.trim()){
            Notiflix.Notify.failure('Oops, there is no country with that name');
        }
})
}




function createMarkupForOne(mass){
    const markup = mass.map(({capital, languages, population, name:{official}, flags:{svg}}) => {
        return `<h2><img src='${svg}' alt="Country flag" width='20px'>${official}</h2>
        <p>Capital: ${capital[0]}</p>
        <p>Languages: ${Object.values(languages)}</p>
        <p>Population: ${population}</p>`
    }).join(' ');
    list.innerHTML = markup;
}


function createMarkupForMultiply(mass){
    const markup = mass.map(({name:{official}, flags:{svg}}) => {
        return `<h2><img src='${svg}' alt="Country flag" width='20px'>${official}</h2>`
    }).join(' ');
    list.innerHTML = markup;
}