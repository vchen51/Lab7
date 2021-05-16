// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
const gear = document.querySelector("img[alt=settings]");
const newEntry = document.querySelector("h1");


// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
      });
  });
}

newEntry.addEventListener('click', () => {
  // if (history.state != null && history.state.name != 'home') {
  setState({name: 'home'}, false);
  // };
});

gear.addEventListener('click', () => {
  setState({name: 'settings'}, false);
});

window.addEventListener('popstate', (event) => {
  setState(event.state, true);
});

document.addEventListener('DOMContentLoaded', () => {
  let entryId = 0;
  setState("home");
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then((response) => response.json())
    .then((entries) => {
      entries.forEach((entry) => {
        let newPost = document.createElement('journal-entry');
        entryId++; 
        newPost.entry = entry;
        newPost.id = entryId;
        newPost.addEventListener('click', () => {
          setState({name: 'entry', id: newPost.id}, false);
        });
        document.querySelector('main').appendChild(newPost);
      });
    });
});