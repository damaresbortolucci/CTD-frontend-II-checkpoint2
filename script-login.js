
let button = document.querySelector('button')

button.addEventListener('click', function(event) {
    event.preventDefault()
   
    let usuario = document.getElementById('username').value

    fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
            .then((json) => json.map(json => {
                if (json.username == usuario) {
                    alert("Usuário encontrado.")
                } else {
                    console.log("Usuário não encontrado.")
                }
            }))
})