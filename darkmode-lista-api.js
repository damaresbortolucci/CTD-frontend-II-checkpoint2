checkbox.checked = (sessionStorage.getItem('darkmode') == null) ? false : true;
let formApi = document.querySelector('form');
let novaTarefaApi = document.getElementById('novaTarefa');
let dataDeTerminoApi = document.getElementById('dataDeTermino');
let btnImgApi = document.querySelector('#btn img');
let headerApi = document.querySelector('header');

//seletor dos cards que está retornando undefined
let cardsAPI = document.querySelectorAll('.descripcion');

window.onload = function() {
    //definir o tema escuro no carregamento da página se o checkbox estiver marcado
    defineAll();
}

// evento para mudar o tema com base no checkbox
checkbox.addEventListener('change', function() {
    defineAll();
    sessionStorage.setItem('darkmode', checkbox.checked);
});

//funçao para definir todos os elemetos desejados
function defineAll() {
    applyDarkMode(body);
    applyDarkMode(formApi);
    applyDarkMode(novaTarefaApi);
    applyDarkMode(dataDeTerminoApi);
    applyDarkMode(btnImgApi);
    applyDarkMode(headerApi);
    //a função não aplica os cards pois está retornando undefined
    cardsAPI.forEach(card => applyDarkMode(card));
}

// Função que aplica/remove a classe darkmode para aplicar a estilização no css
function applyDarkMode(element) {
    (checkbox.checked) ? element.classList.add('darkmode') : element.classList.remove('darkmode');
}
