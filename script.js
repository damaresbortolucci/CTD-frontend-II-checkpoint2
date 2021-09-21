
let button = document.getElementById('btn')
let body = document.querySelector('body')


button.addEventListener('click', function(event) {
    event.preventDefault()

    /* Pega a ul das tarefas a fazer */
    let ulFazer = document.getElementById('TarefasFazer')
    /* Pega a ul das tarefas a feitas */
    let ulFeitas = document.getElementById('TarefasFeitas')


    fetch('https://jsonplaceholder.typicode.com/todos/')
        .then((response) => response.json())
            .then((json) => json.map(json => {
                
                /* cria uma li (item da lista de tarefas) */
                const li = document.createElement('li')
                li.setAttribute('class', 'tarefa')

                /* cria o botao de check que no html/css é uma div estilizada*/
                const btnCheck = document.createElement('div')
                btnCheck.setAttribute('class', 'not-done')

                /* cria a div que conterá a descrição da tarefa */
                const divDescricao = document.createElement('div')
                divDescricao.setAttribute('class', 'descripcion')

                /* cria o páragro com descrição da tarefa */
                const p = document.createElement('p')
                p.setAttribute('class', 'nome' )
                p.innerHTML = json.title

                /* paragrafo que conterá a data de criaçao */
                const p2 = document.createElement('p')
                p2.setAttribute('class', 'timestamp')

                divDescricao.appendChild(p)
                divDescricao.appendChild(p2)
                li.appendChild(btnCheck)
                li.appendChild(divDescricao)

                /* se o atributo completed for false - a tarefa vai para a lista de a fazer */
                if(json.completed == false){
                    ulFazer.appendChild(li)
                    body.appendChild(ulFazer)
                }else{
                     /* se o atributo completed for true - a tarefa vai para a lista de a feito */
                    ulFeitas.appendChild(li)
                    body.appendChild(ulFeitas)
                }
             
            }))
})