const button = document.querySelector('button')
const username = document.getElementById('username')

button.addEventListener('click', function (event) {
    event.preventDefault()
    console.log("user: " + username.value)
    login()
})

// Função para fazer login verificando o nome de usuário
async function login() {
    const rawResponse = await fetch('https://jsonplaceholder.typicode.com/users?username='+ username.value);
    const content = await rawResponse.json();
    console.log(content)
    if (content.length === 0) {
        alert('User not found')
    } else {
        alert('Welcome ' + content[0].name)
        sessionStorage.setItem("userId",  content[0].id);
        sessionStorage.setItem("userName",  content[0].name);
        window.location.href = './lista-tarefas-api.html'
    }  
}



