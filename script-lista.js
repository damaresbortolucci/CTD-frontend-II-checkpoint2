<<<<<<< HEAD
let button = document.getElementById('btn')
let body = document.querySelector('body')
let inputNovaTarefa = document.getElementById('novaTarefa')
let inputDataDeTermino = document.getElementById('dataDeTermino')
let tarefasFazer = document.getElementById('TarefasFazer');
let tarefasFeitas = document.getElementById('TarefasFeitas');

window.onload = getTarefas;
    
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

=======



/* window.onload = () => {
    carregarAPI();
}


//carregar tarefas na tela com os itens vindos da API
function carregarAPI(){

   //Pega a ul das tarefas a fazer
   let ulFazer = document.getElementById('TarefasFazer')
   //Pega a ul das tarefas a feitas
   let ulFeitas = document.getElementById('TarefasFeitas')


   fetch('https://jsonplaceholder.typicode.com/todos/')
   .then((response) => response.json())
       .then((json) => json.map(json => {
           
           //cria uma li (item da lista de tarefas)
           const li = document.createElement('li')
           li.setAttribute('class', 'tarefa')

           //cria o botao de check que no html/css é uma div estilizada
           const btnCheck = document.createElement('div')
           btnCheck.setAttribute('class', 'not-done')

           //cria a div que conterá a descrição da tarefa
           const divDescricao = document.createElement('div')
           divDescricao.setAttribute('class', 'descripcion')

           //cria o páragro com descrição da tarefa
           const p = document.createElement('p')
           p.setAttribute('class', 'nome' )
           p.innerHTML = json.title

           //paragrafo que conterá a data de criaçao
           const p2 = document.createElement('p')
           p2.setAttribute('class', 'timestamp')

           divDescricao.appendChild(p)
           divDescricao.appendChild(p2)
           li.appendChild(btnCheck)
           li.appendChild(divDescricao)

       
           //se o atributo completed for false - a tarefa vai para a lista de a fazer
           if (json.completed == false) {
               ulFazer.appendChild(li)
           } else {
               //se o atributo completed for true - a tarefa vai para a lista de a feito
               ulFeitas.appendChild(li)
           }
        
       }))
} */



//validação de campos vazios


//let validarTarefaPreenchido = document.getElementById('novaTarefa')

>>>>>>> main
