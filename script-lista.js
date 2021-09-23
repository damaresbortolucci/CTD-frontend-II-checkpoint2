let button = document.getElementById('btn')
let body = document.querySelector('body')
let inputNovaTarefa = document.getElementById('novaTarefa')
let inputDataDeTermino = document.getElementById('dataDeTermino')
let ulFazer = document.getElementById('TarefasFazer')
let ulFeitas = document.getElementById('TarefasFeitas')

let indexCard=0; //contador do id
let arrayTarefas = []; //array onde armazenamos cada tarefa que é um objeto




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


        indexCard+=1; //contador para o id
        //cria o arrayTarefas no localstarogage
        localStorage.setItem('tarefas', JSON.stringify(arrayTarefas));
        //recupera o array do localstorage e armazena numa variavel
        let getObj = JSON.parse(localStorage.getItem('tarefas'));


        const li = document.createElement('li')
        li.setAttribute('class', 'tarefa')
        li.setAttribute('id', indexCard)
    
        const btnNotDone = document.createElement('div')
        btnNotDone.setAttribute('class', 'not-done')
        btnNotDone.setAttribute('onclick', 'mostrarModal('+indexCard+')')
    
        const divDescricao = document.createElement('div')
        divDescricao.setAttribute('class', 'descripcion')
    
        const p = document.createElement('p')
        p.setAttribute('class', 'nome' )
        p.innerHTML = inputNovaTarefa.value;
     
        const dataEcheck = document.createElement('div')
        dataEcheck.setAttribute('class', 'dataEcheck')
    
        const p2 = document.createElement('p')
        p2.setAttribute('class', 'timestamp')
    
        const inputCheckBox = document.createElement('input')
        inputCheckBox.setAttribute('type', 'checkbox')
    
        dataEcheck.appendChild(p2)
        dataEcheck.appendChild(inputCheckBox)
        divDescricao.appendChild(p)
        divDescricao.appendChild(dataEcheck)
        li.appendChild(btnNotDone)
        li.appendChild(divDescricao)
        ulFazer.appendChild(li)

        

        //cria um novo objeto guardando o ID e o texto da tarefa
        let newObj = {"id": indexCard, "tarefa": inputNovaTarefa.value}
    
        //adiciona esse novo objeto ao array de tarefas
        arrayTarefas.push(newObj)
    
        // Insere o array convertido em JSON no localStorage 
        localStorage.setItem('tarefas', JSON.stringify(arrayTarefas));


        /* limpa o input para escrever uma nova tarefa */
        inputNovaTarefa.value="";
        inputDataDeTermino.value="";

    }    
    }
    }
}) 



function mostrarModal(){
    let el = document.getElementById('deleteModal')
    let minha_modal = new bootstrap.Modal(el)
    minha_modal.show()
  }



  function deletar(){
    /* falta implementar */
  }


//validação de campos vazios
//let validarTarefaPreenchido = document.getElementById('novaTarefa')
