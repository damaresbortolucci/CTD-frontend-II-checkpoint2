let tarefasFazer = document.getElementById('TarefasFazer');
let tarefasFeitas = document.getElementById('TarefasFeitas');

window.onload = getTarefas;
window.onload = alert(idUsuarioGlobal);
    

async function getTarefas() {
    const rawResponse = await fetch('https://jsonplaceholder.typicode.com/todos?userId='+sessionStorage.getItem('userId'));
    const lista = await rawResponse.json();
    lista.forEach(todo => {
        if (todo.completed) {
            tarefasFeitas.appendChild(criaItem(todo.title));
        } else {
            tarefasFazer.appendChild(criaItem(todo.title));
        }
    });
}


function criaItem(nome) {
    const item = document.createElement('li')
    item.innerHTML = `<li class="tarefa">
    <div class="not-done"></div>
    <div class="descripcion">
        <p class="nome">${nome}</p>
    </div>
    </li>`
    return item;
}