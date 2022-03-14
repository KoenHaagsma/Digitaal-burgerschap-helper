/*** Fetching data -> refactor into module later ***/
const main = document.querySelector('main');
const cors = 'https://cors-anywhere.herokuapp.com/';
const endpoint = 'https://zoeken.oba.nl/api/v1/search/?q=';
const query = 'burgerschap';
const key = 'cdb8415c172ec6178b63451e222891a6';
const secret = '31978bcbb4e5eb7239f01c180e2f07b1';
const detail = 'Default';
const url = `${cors}${endpoint}${query}&authorization=${key}&detaillevel=${detail}&output=json`;

const config = {
    Authorization: `Bearer ${secret}`,
};

fetch(url, config)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
