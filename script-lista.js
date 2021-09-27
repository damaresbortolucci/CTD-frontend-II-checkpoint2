let button = document.getElementById('btn') //botão de + do formulário
let body = document.querySelector('body') 
let inputNovaTarefa = document.getElementById('novaTarefa') // input de text para inserir nova tarefa
let inputDataDeTermino = document.getElementById('dataDeTermino')
let ulFazer = document.getElementById('TarefasFazer') // UL das tarefas a fazer
let ulFeitas = document.getElementById('TarefasFeitas') // UL das tarefa feitas
let indexCard=0; //contador do id


window.onload = _ => {

    //recupera array de tarefas a fazer
    let arrayTarefas = JSON.parse(localStorage.getItem('tarefas'));
    //recupera array de tarefas feitas
    let arrayFeitas =  JSON.parse(localStorage.getItem('tarefasFeitas'));

    //recria cards das tarefas a fazer
    if(arrayTarefas != null){
        //pega o ultimo id no localstorage e armazena na variável de novo para criar os novos cards
        indexCard =  arrayTarefas.lastIndex
        arrayTarefas.forEach((element) => {
            criarCards(element.id, element.tarefa);
        });
    }

    //recria cards das tarefas feitas (riscadas pelo checkbox)
    if(arrayFeitas != null){
        arrayFeitas.forEach((element) => {
            criarCardFeitas(element.tarefa);
        });
    }
}



//CRIAR NOVOS CARDS
function criarCards(id, input){
    const li = document.createElement('li')
    li.setAttribute('class', 'tarefa tarefaFazer')
    li.setAttribute('id', id)

    const divNotDone = document.createElement('div') //div que contem o botão de exclusao 
    const btnNotDone = document.createElement('button') // botão para excluir a tarefa 
    btnNotDone.setAttribute('class', 'not-done')
    btnNotDone.setAttribute('onclick', 'mostrarModal('+id+')') //(chama o modal)

    const divDescricao = document.createElement('div') // div que contem o p com descrição da tarefa
    divDescricao.setAttribute('class', 'descripcion')

    const p = document.createElement('p') //descrição da tarefa
    p.setAttribute('class', 'nome' )
    p.innerHTML = input
 
    const dataEcheck = document.createElement('div') //div que contem a data de criação e checkbox
    dataEcheck.setAttribute('class', 'dataEcheck')

    const p2 = document.createElement('p') //data de criaçao
    p2.setAttribute('class', 'timestamp')

    const inputCheckBox = document.createElement('input') // checkbox
    inputCheckBox.setAttribute('type', 'checkbox')
    inputCheckBox.setAttribute('id', 'checkbox')
    inputCheckBox.setAttribute('onclick', 'riscar('+id+')')

    dataEcheck.appendChild(p2)
    dataEcheck.appendChild(inputCheckBox)
    divDescricao.appendChild(p)
    divDescricao.appendChild(dataEcheck)
    divNotDone.appendChild(btnNotDone)
    li.appendChild(divNotDone)
    li.appendChild(divDescricao)
    ulFazer.appendChild(li)

    
    //NESSE MÉTODO ABAIXO ESTÁ GERANDO PROBLEMA NA HORA DE ATRIBUIR UM ID PARA ALGUNS TAREFAS
    // POR ISSO NÃO USEI

    /* let ulFazer = document.getElementById('TarefasFazer')
    ulFazer.innerHTML += `
    <li class="tarefa tarefaFazer" id="${id}">
        <div>
            <button class="not-done" onclick="mostrarModal(${id})"></button>
        </div>
        <div class="descripcion">
            <div>
                <span>${id}</span>
                <span class="nome">${input}</span>
            </div>
            <div class="dataEcheck">
                <p class="timestamp">Criada: 19/04/20</p>
                <input type="checkbox" id="checkbox" onclick="riscar(${id})">
            </div>
        </div>
    </li>` */
   
}

//CRIAR CARDS DE TAREFAS RISCADAS COM O CHECKBOX (FEITAS)
function criarCardFeitas(input){
    ulFeitas.innerHTML += `
    <li class="tarefa">
            <div class="not-done"></div>
            <div class="descripcion">
                <p class="nome">${input}</p>
                <div class="dataEcheck">
                    <p class="timestamp">Criada: 19/04/20</p>
                </div>
            </div>
        </li>`
}



//criar nova tarefa inserida pelo usuario 
button.addEventListener('click', function(event) {
    event.preventDefault()

    //validação se está preenchendo o campo de tarfa
    if(inputNovaTarefa.value == ""){
        alert("Escreva a tarefa antes de envia-la")
    }
    else if(inputNovaTarefa.value.length < 10 && inputNovaTarefa.value != ""){
        alert("A descrição da tarefa precisa ter 10 caracters")
    }
    else if(inputDataDeTermino.value == ""){
        alert("Preencha a data de termino da tarefa antes de envia-la.")
    }
    else{

        let arrayObjetos = []; //se o localstorage estiver vazio, o novo card será armazenado aqui
        indexCard+=1;
        criarCards(indexCard, inputNovaTarefa.value)

        //pega os dados do localstorage
        let getObj = JSON.parse(localStorage.getItem('tarefas'));

        //se já existirem tarefas no localstorage
        if(getObj != null) {

            let getObj = JSON.parse(localStorage.getItem('tarefas'));
            //Recupera id atual no lastIndex 
            indexCard =  getObj[0].lastIndex + 1;
    
            //cria o card da tarefa que usuario esta escolhendo
            let newObj = {"id": indexCard, "tarefa": inputNovaTarefa.value, "lastIndex": indexCard}
    
            /* Todos os obj recebem o lastindex o ultimo ID sera recuperado */
            getObj.forEach(element => {
                element.lastIndex = indexCard;
                arrayObjetos.push(element);
            });
    
            /* Insere dados do novo card no array de objetos temporario */
            arrayObjetos.push(newObj)
    
            /* Apaga localStorage para receber array atualizado com cards antigos e novos */
            localStorage.removeItem('tarefas');
            /* Insere o array temporario convertido em JSON no localStorage */
            localStorage.setItem('tarefas', JSON.stringify(arrayObjetos));

        } else {
            arrayObjetos.push(
                {
                    id: indexCard,
                    tarefa: inputNovaTarefa.value,
                    lastIndex: indexCard
                }
            );

            /* Apaga localStorage para receber array atualizado com cards antigos e novos */
            localStorage.removeItem('tarefas');
            /* Insere o array temporario convertido em JSON no localStorage */
            localStorage.setItem('tarefas', JSON.stringify(arrayObjetos));
            indexCard = arrayObjetos[0].id;
        }    
        /* limpa o input para escrever uma nova tarefa */
        inputNovaTarefa.value="";
        inputDataDeTermino.value="";
    }
}) 



function mostrarModal(id){
    let el = document.getElementById('deleteModal')
    let minha_modal = new bootstrap.Modal(el)

    minha_modal.show()
    el.setAttribute("data-bs-dismiss", "modal")
    let button = document.querySelector(".btn-excluir")
    button.setAttribute("onclick", "deletar("+id+")")
  }



  //deletar um card pelo botao excluir do modal
  function deletar(id){
    let arrayTarefas = JSON.parse(localStorage.getItem('tarefas'))
    let index = arrayTarefas.findIndex(element => element.id == id)

    if(arrayTarefas.length > 1) {
        arrayTarefas.splice(index, 1)
        let arrayJson = JSON.stringify(arrayTarefas)
        localStorage.setItem('tarefas', arrayJson)
    } else {
        localStorage.removeItem('tarefas');
    }
    document.location.reload(true);
  }




  // riscar card pelo checkbox e passar para a lista de tarefas feitas abaixo
function riscar(id){
    let checkbox = document.querySelectorAll('#checkbox')
    let ulPendentes = document.querySelectorAll('.tarefaFazer')
    let listaTarefas = JSON.parse(localStorage.getItem('tarefas'))
    
    for(let i=0; i < ulPendentes.length; i++){
        
        if(checkbox[i].checked){

            //criar ou atualizar os cards de tarefas riscadas
            let arrayFeitas =  JSON.parse(localStorage.getItem('tarefasFeitas'));

            if(arrayFeitas === null){
                let tarefaFeita = [];
                tarefaFeita.push({tarefa: listaTarefas[i].tarefa})
                localStorage.removeItem('tarefasFeitas');
                localStorage.setItem('tarefasFeitas', JSON.stringify(tarefaFeita));
             
            }else{
                arrayFeitas.push({tarefa: listaTarefas[i].tarefa})
                localStorage.removeItem('tarefasFeitas');
                localStorage.setItem('tarefasFeitas', JSON.stringify(arrayFeitas));
            }


           //atualizar os cards de tarefas a fazer excluindo o card riscado
           let arrayTarefas = JSON.parse(localStorage.getItem('tarefas'))
           let index = arrayTarefas.findIndex(element => element.id == id)

           if(arrayTarefas.length > 1) {
                arrayTarefas.splice(index, 1)
                let arrayJson = JSON.stringify(arrayTarefas)
                localStorage.setItem('tarefas', arrayJson)
            } else {
                localStorage.removeItem('tarefas');
            }
        }
    }
    document.location.reload(true);
}

