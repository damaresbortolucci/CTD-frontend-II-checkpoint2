let tarefasFazer = document.getElementById('TarefasFazer');
let tarefasFeitas = document.getElementById('TarefasFeitas');
let username = document.querySelector('.user-info > p')
let user = JSON.parse(sessionStorage.getItem('user'));
let nav = document.getElementById('nav-lista');
checkbox.checked = (sessionStorage.getItem('darkmode') == null) ? false : true;
console.log(sessionStorage.getItem('darkmode'));
let formApi = document.querySelector('form');
let novaTarefaApi = document.getElementById('novaTarefa');
let dataDeTerminoApi = document.getElementById('dataDeTermino');
let btnImgApi = document.querySelector('#btn img');
let headerApi = document.querySelector('header');
let cardsAPI = document.querySelectorAll('.descripcion');
let divtarefas = document.getElementById('tarefas');


// axios.get("https://dog.ceo/api/breeds/image/random")
//     .then(url => {
//         const img = document.createElement("img")
//         img.setAttribute("src", url.data.message)
//         document.querySelector(".user-image").appendChild(img)
// })

window.onload = _ => {
    getTarefas();
    // Define nomedousuário
    username.innerHTML = user.name;
    // const img = document.createElement("img")   
    // img.setAttribute("src", sessionStorage.getItem("imgAPI"))
    // document.querySelector(".user-image").appendChild(img)
    nav.style.borderBottom = ".2rem solid white"
}


// Função para buscar tarefas na API baseado no id do usuário
async function getTarefas() {
    const rawResponse = await fetch('https://jsonplaceholder.typicode.com/todos?userId=' + user.id);
    const lista = await rawResponse.json();
    lista.forEach(todo => {
        if (todo.completed) {
            tarefasFeitas.appendChild(criaItem(todo.id, todo.title));
        } else {
            tarefasFazer.appendChild(criaItem(todo.id, todo.title));
        }
    });
    defineAll();
    cardsAPI = document.querySelectorAll('.descripcion');
    cardsAPI.forEach(card => applyDarkMode(card));
}

// Função para criar um item da lista
function criaItem(id, tarefa) {
    const item = document.createElement('li')
    // aqui onde está a classe .descripcion que eu queria aplicar o script de tema escuro
    item.innerHTML = `
    <li class="tarefa" id="${id}">
        <div id="div-cut"></div>
        <div>
            <button class="not-done" onclick="excluirTarefa(${id})">
            </button>
        </div>
        <div class="descripcion">
            <div id="tarefa-api">
                <span>${id}</span>
                <span class="nome">${tarefa}</span>
            </div>
            <div class="dataEcheck">
                <p class="timestamp"></p>
            </div>
        </div>
    </li>`
    return item;
}


function excluirTarefa(id) {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then((response) => response.json())
        .then((json) => json.map(json => {

            let li = document.getElementById(id)

            if (json.id = id) {
                if (json.completed == false) {
                    tarefasFeitas.appendChild(li)
                }
            }
        }))
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
    applyDarkMode(divtarefas);
}

// Função que aplica/remove a classe darkmode para aplicar a estilização no css
function applyDarkMode(element) {
    (checkbox.checked) ? element.classList.add('darkmode') : element.classList.remove('darkmode');
}
