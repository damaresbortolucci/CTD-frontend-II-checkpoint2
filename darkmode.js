let checkbox = document.getElementById('checkbox');
checkbox.checked = (sessionStorage.getItem('darkmode') == null) ? false : true;
let body = document.querySelector('body');
let form = document.querySelector('form');
let h1 = document.querySelector('h1');
let input = document.querySelectorAll('input');
let button = document.querySelector('button');

window.onload = function() {
    defineAll();
}

checkbox.addEventListener('change', function() {
    defineAll();
    sessionStorage.setItem('darkmode', checkbox.checked);
});

function defineAll() {
    applyDarkMode(body);
    applyDarkMode(form);
    applyDarkMode(h1);
    input.forEach(input => applyDarkMode(input));
    applyDarkMode(button);
}

function applyDarkMode(element) {
    (checkbox.checked) ? element.classList.add('darkmode') : element.classList.remove('darkmode');
}
