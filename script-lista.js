let button = document.getElementById('btn') //botão de + do formulário
let body = document.querySelector('body') 
let inputNovaTarefa = document.getElementById('novaTarefa') // input de text para inserir nova tarefa
let inputDataDeTermino = document.getElementById('dataDeTermino')
let ulFazer = document.getElementById('TarefasFazer') // UL das tarefas a fazer
let ulFeitas = document.getElementById('TarefasFeitas') // UL das tarefa feitas
let indexCard=0; //contador do id
let username = document.querySelector('.user-info > p')
let user = JSON.parse(sessionStorage.getItem('user'));
let nav = document.getElementById('nav-tarefas')
let msgErro = document.getElementById('msgErro')

checkbox.checked = (sessionStorage.getItem('darkmode') == null) ? false : true;

let form = document.querySelector('form');
let btnImg = document.querySelector('#btn img');
let header = document.querySelector('header');
let cardsUser = document.querySelectorAll('.descripcion');
let tarefas = document.getElementById('tarefas');



/* Limitar data do input data de término */
let data = new Date();
let ano = data.getUTCFullYear();
let mes = data.getMonth() + 1;
let dia = data.getDate();
if(dia<10){
    dia= '0' + dia;
}
if(mes<10){
    mes='0'+mes;
}
let hoje = ano + "-" + mes + "-" + dia;
document.getElementById("dataDeTermino").setAttribute('min', hoje)



window.onload = _ => {
    axios.get("https://dog.ceo/api/breeds/image/random")
    .then(url => {
        const img = document.createElement("img")
        img.setAttribute("src", url.data.message)
        document.querySelector(".user-image").appendChild(img)
    })
    //recupera array de tarefas a fazer
    let arrayTarefas = JSON.parse(localStorage.getItem('tarefas'));
    //recupera array de tarefas feitas
    let arrayFeitas =  JSON.parse(localStorage.getItem('tarefasFeitas'));
    username.innerHTML = user.name;
    nav.style.borderBottom = ".2rem solid white";

    //recria cards das tarefas a fazer
    if(arrayTarefas != null){
        //pega o ultimo id no localstorage e armazena na variável de novo para criar os novos cards
        indexCard =  arrayTarefas.lastIndex
        arrayTarefas.forEach((element) => {
            criarCards(element.id, element.tarefa, element.termino);
        });
    }

    //recria cards das tarefas feitas (riscadas pelo checkbox)
    if(arrayFeitas != null){
        arrayFeitas.forEach((element) => {
            criarCardFeitas(element.tarefa);
        });
    }
    defineAll();
}



//CRIAR NOVOS CARDS
function criarCards(id, inputTarefa, inputData){
    const divTarefas = document.createElement('div')
    divTarefas.setAttribute('class', 'tarefa tarefaFazer')
    divTarefas.setAttribute('id', id)

    const divNotDone = document.createElement('div') //div que contem o botão de exclusao 
    const btnNotDone = document.createElement('button') // botão para excluir a tarefa 
    const xButton = document.createElement("img")
    btnNotDone.setAttribute('class', 'not-done')
    btnNotDone.setAttribute('onclick', 'mostrarModal('+id+')') //(chama o modal)
    xButton.setAttribute("src", "./assets/close.svg")

    const divDescricao = document.createElement('div') // div que contem o p com descrição da tarefa
    divDescricao.setAttribute('class', 'descripcion')
    applyDarkMode(divDescricao);

    const p = document.createElement('p') //descrição da tarefa
    p.setAttribute('class', 'nome' )
    p.innerHTML = inputTarefa
 
    const dataEcheck = document.createElement('div') //div que contem a data de criação e checkbox
    dataEcheck.setAttribute('class', 'dataEcheck')

    const p2 = document.createElement('p') //data de criaçao
    p2.setAttribute('class', 'timestamp')
    let n =  new Date();
    let y = n.getFullYear();
    let m = n.getMonth() + 1;
    let d = n.getDate();
    p2.innerHTML = 'Criação: ' + d + "/" + m + "/" + y;

    const p3 = document.createElement('p') // data de termino
    p3.setAttribute('id', 'dataFim')
    p3.innerHTML = "Término: " + inputData

    const inputCheckBox = document.createElement('input') // checkbox
    inputCheckBox.setAttribute('type', 'checkbox')
    inputCheckBox.setAttribute('id', 'checkboxCard')
    inputCheckBox.setAttribute('onclick', 'riscar('+id+')')

    const divRodape = document.createElement('div')
    divRodape.setAttribute('class', 'rodapeCard')

    divRodape.appendChild(dataEcheck)
    divRodape.appendChild(inputCheckBox)

    const divCorte = document.createElement("div")
    divCorte.setAttribute("id", "div-cut")


    btnNotDone.appendChild(xButton)
    divNotDone.appendChild(btnNotDone)
    divDescricao.appendChild(p)
    dataEcheck.appendChild(p2)
    dataEcheck.appendChild(p3)
    divRodape.appendChild(dataEcheck)
    divRodape.appendChild(inputCheckBox)
    divTarefas.appendChild(divCorte)
    divTarefas.appendChild(divNotDone)
    divTarefas.appendChild(divDescricao)
    divTarefas.appendChild(divRodape)
    ulFazer.appendChild(divTarefas)

}

//CRIAR CARDS DE TAREFAS RISCADAS COM O CHECKBOX (FEITAS)
function criarCardFeitas(input){
    ulFeitas.innerHTML += `
        <div class="tarefa">
            <div id="div-cut"></div>
            <div class="not-done"></div>
            <div class="descripcion">
                <p class="nome">${input}</p>
            </div>
        </div>`

        cardsUser = document.querySelectorAll('.descripcion');
}




//criar nova tarefa inserida pelo usuario 
button.addEventListener('click', function(event) {
    event.preventDefault()

    //validação se está preenchendo o campo de tarfa
    if(inputNovaTarefa.value == ""){
        msgErro.innerHTML = "Escreva a tarefa antes de envia-la"
    }
    else if(inputNovaTarefa.value.length < 10 && inputNovaTarefa.value != ""){
        msgErro.innerHTML = "A descrição da tarefa precisa ter no mínimo 10 caracteres"
    }
    else if(inputNovaTarefa.value.length > 80){
        msgErro.innerHTML = "A descrição da tarefa precisa ter menos de 80 caracteres"
    }
    else if(inputDataDeTermino.value == ""){
        msgErro.innerHTML = "Preencha a data de termino da tarefa antes de envia-la."
    }
    else{

        let arrayDeTarefas = []; //se o localstorage estiver vazio, o novo card será armazenado aqui
        indexCard+=1;
        let data = new Date(inputDataDeTermino.value)
        let dataFormatada = ((data.getDate()+1 )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear()
        criarCards(indexCard, inputNovaTarefa.value, dataFormatada)


        let tarefasStorage = JSON.parse(localStorage.getItem('tarefas'));

        //se já existirem tarefas no localstorage
        if(tarefasStorage != null) {

            let tarefasStorage = JSON.parse(localStorage.getItem('tarefas'));
            indexCard =  tarefasStorage[0].lastIndex + 1;
    
            let novaTarefa = {"id": indexCard, "tarefa": inputNovaTarefa.value, "termino": dataFormatada, "lastIndex": indexCard}

            tarefasStorage.forEach(element => {
                element.lastIndex = indexCard;
                arrayDeTarefas.push(element);
            });
    
            arrayDeTarefas.push(novaTarefa)
            localStorage.removeItem('tarefas');
            localStorage.setItem('tarefas', JSON.stringify(arrayDeTarefas));

        } else {
            arrayDeTarefas.push(
                {
                id: indexCard,
                tarefa: inputNovaTarefa.value,
                termino: dataFormatada,
                lastIndex: indexCard
                }
            );
            localStorage.removeItem('tarefas');
            localStorage.setItem('tarefas', JSON.stringify(arrayDeTarefas));
            indexCard = arrayDeTarefas[0].id;
        }   
        
        /* limpa o input para escrever uma nova tarefa */
        inputNovaTarefa.value="";
        dataFormatada="";
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
    let checkboxCard = document.querySelectorAll('#checkboxCard')
    let ulPendentes = document.querySelectorAll('.tarefaFazer')
    let listaTarefas = JSON.parse(localStorage.getItem('tarefas'))
    
    for(let i=0; i < ulPendentes.length; i++){
        
        if(checkboxCard[i].checked){

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

checkbox.addEventListener('change', function() {
    defineAll();
    sessionStorage.setItem('darkmode', checkbox.checked);
});


function applyDarkMode(element) {
    (checkbox.checked) ? element.classList.add('darkmode') : element.classList.remove('darkmode');
}

function defineAll() {
    applyDarkMode(body);
    applyDarkMode(inputDataDeTermino);
    applyDarkMode(inputNovaTarefa);
    applyDarkMode(btnImg);
    applyDarkMode(header);
    applyDarkMode(form);
    cardsUser.forEach(card => applyDarkMode(card));
    applyDarkMode(tarefas);
}

