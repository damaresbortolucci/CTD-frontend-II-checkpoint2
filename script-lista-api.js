let tarefasFazer = document.getElementById('TarefasFazer');
let tarefasFeitas = document.getElementById('TarefasFeitas');
let username = document.querySelector('.user-info > p')
let user = JSON.parse(sessionStorage.getItem('user'));

window.onload = _ => {
    getTarefas();
    // Define nomedousuário
    username.innerHTML = user.name;
    const img = document.createElement("img")
    img.setAttribute("src", sessionStorage.getItem("imgAPI"))
    document.querySelector(".user-image").appendChild(img)
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
}

// Função para criar um item da lista
function criaItem(id, tarefa) {
    const item = document.createElement('li')
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
                <p class="timestamp">Criada: 19/04/20</p>
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
