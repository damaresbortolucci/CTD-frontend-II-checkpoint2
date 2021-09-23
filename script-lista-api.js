let tarefasFazer = document.getElementById('TarefasFazer');
let tarefasFeitas = document.getElementById('TarefasFeitas');
let user = document.querySelector('.user-info > p')

window.onload = _ => {
    getTarefas();
    // Define nomedousuário
    user.innerHTML = sessionStorage.getItem('userName');
} 

    
// Função para buscar tarefas na API baseado no id do usuário
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

// Função para criar um item da lista
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


    function excluirTarefa(id){

       fetch('https://jsonplaceholder.typicode.com/todos')
        .then((response) => response.json())
            .then((json) => json.map(json => {
           
            let li = document.getElementById(id)

            if(json.id = id){
                if(json.completed == false){
                    ulFeitas.appendChild(li)
                }
            }  
       })) 
    }

