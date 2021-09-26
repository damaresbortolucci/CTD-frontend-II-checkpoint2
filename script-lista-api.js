let button = document.getElementById('btn')
let body = document.querySelector('body')
let inputNovaTarefa = document.getElementById('novaTarefa')

let ulFazer = document.getElementById('tarefasFazer')


let ulFeitas = document.getElementById('tarefasFeitas')
let checkFeito = document.getElementById('checkFeito')



window.onload = () => {
    carregarAPI();
}


//carregar tarefas na tela com os itens vindos da API
function carregarAPI() {

    fetch('https://jsonplaceholder.typicode.com/todos')
        .then((response) => response.json())
        .then((json) => json.map(json => {

            //cria uma li (item da lista de tarefas)
            const li = document.createElement('li')
            li.setAttribute('class', 'tarefa')
            li.setAttribute('id', json.id)

            //cria o botao de check que no html/css é uma div estilizada
            const btnCheck = document.createElement('div')
            btnCheck.setAttribute('class', 'not-done')
            btnCheck.setAttribute('onclick', "excluirTarefa(" + json.id + ")")

            //cria a div que conterá a descrição da tarefa
            const divDescricao = document.createElement('div')
            divDescricao.setAttribute('class', 'descripcion')

            const id = document.createElement('p')
            id.innerHTML = json.id

            //cria o páragro com descrição da tarefa
            const p = document.createElement('p')
            p.setAttribute('class', 'nome')
            p.innerHTML = json.title

            //paragrafo que conterá a data de criaçao
            const p2 = document.createElement('p')
            p2.setAttribute('class', 'timestamp')

            divDescricao.appendChild(id)
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
}


function excluirTarefa(id) {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then((response) => response.json())
        .then((json) => json.map(json => {

            let li = document.getElementById(id)

            if (json.id = id) {
                if (json.completed == false) {
                    ulFeitas.appendChild(li)
                }
            }
        }))
}

