let button = document.getElementById('btn')
let body = document.querySelector('body')
let inputNovaTarefa = document.getElementById('novaTarefa')
let inputDataDeTermino = document.getElementById('dataDeTermino')
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

//criar nova tarefa inserida pelo usuario 
button.addEventListener('click', function(event) {
    event.preventDefault()
    
    //validação se está preenchendo o campo de tarfa
    if(inputNovaTarefa.value == ""){
        alert("Escreva a tarefa antes de envia-la")
    }
    else{

        //validação se a descrição da tarefa possui mais de 10 chars
    if(inputNovaTarefa.value.length < 10 && inputNovaTarefa.value != ""){
        alert("A descrição da tarefa precisa ter 10 caracters")
    }
    else{

        //validação data de termino
    if(inputDataDeTermino.value == ""){
        alert("Preencha a data de termino da tarefa antes de envia-la.")
    }
    else{


        //
    let ulFazer = document.getElementById('TarefasFazer')
    let ulFeitas = document.getElementById('TarefasFeitas')


    const li = document.createElement('li')
    li.setAttribute('class', 'tarefa')

    const btnCheck = document.createElement('div')
    btnCheck.setAttribute('class', 'not-done')

    const divDescricao = document.createElement('div')
    divDescricao.setAttribute('class', 'descripcion')

    const p = document.createElement('p')
    p.setAttribute('class', 'nome' )
    p.innerHTML = inputNovaTarefa.value;
    console.log(p)

    const p2 = document.createElement('p')
    p2.setAttribute('class', 'timestamp')

    divDescricao.appendChild(p)
    divDescricao.appendChild(p2)
    li.appendChild(btnCheck)
    li.appendChild(divDescricao)
    ulFazer.appendChild(li)

    
    /* limpa o input para escrever uma nova tarefa */
    inputNovaTarefa.value="";
    inputDataDeTermino.value="";
    }    
    }
    }
}) 

