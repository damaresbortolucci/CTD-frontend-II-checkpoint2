const button = document.querySelector('button')
const username = document.getElementById('username')
const password = document.querySelector("input[type='password']")

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
        if (password.value === username.value) {
            alert('Welcome ' + content[0].name)
            sessionStorage.setItem("user", JSON.stringify(content[0]));
            window.location.href = './lista-tarefas-api.html'
        } else {
            alert('Wrong password')
        }
    }  
}



