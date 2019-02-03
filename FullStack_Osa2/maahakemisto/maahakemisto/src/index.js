import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'

const promise = axios.get('https://restcountries.eu/rest/v2/all')
console.log(promise)

promise.then(response => {
    console.log(response)
})

axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
        const countries = response.data
        console.log(countries)
        
    })

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
