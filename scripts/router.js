// router.js

export const router = {};

const body = document.querySelector("body");
const header = document.querySelector("header").querySelector("h1");

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */ 
router.setState = function(state, backState) {
  if (state.name == 'home' || state == null) {
    body.className = '';
    header.innerHTML = 'Journal Entries';
    if (!backState) {history.pushState(state, "", "/Lab7#settings");}
  }
  else if (state.name == 'settings') {
    body.className = 'settings';
    header.innerHTML = 'Settings';
    if (!backState) {history.pushState({ page: "settings" }, "", "/Lab7#settings");}
  }
  else if (state.name == 'entry') {
    let newEntry = document.createElement("entry-page");
    newEntry.entry = document.getElementById(state.id).entry;
    body.className = 'single-entry';
    header.innerHTML = 'Entry ' + state.id; 
    body.removeChild(document.querySelector("entry-page"));
    body.appendChild(newEntry);
    if (!backState) {history.pushState(state, "", 'entry' + state.id);}
  }
}
