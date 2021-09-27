const button = document.querySelector('button')
const username = document.getElementById('username')
const password = document.querySelector("input[type='password']")
const errorPassword = document.getElementById('error-password')
const errorUser = document.getElementById('error-user')

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
    if (username.value.length === 0) {
        errorUser.style.display = 'block'
        exibeErro('Informe um usuário', errorUser)
    } else if (content.length === 0) {
        exibeErro('Usuário não encontrado', errorUser)
    } else {
        switch (password.value) {
            case "":
                errorPassword.style.display = 'block'
                exibeErro('Informe uma senha', errorPassword)
                break;
            case username.value:
                sessionStorage.setItem("user", JSON.stringify(content[0]));
                window.location.href = './lista-tarefas-api.html'
                errorPassword.style.display = 'none'
                errorUser.style.display = 'none'
                break;
            default:
                errorUser.style.display = 'none'
                exibeErro('Senha incorreta', errorPassword)
        }
    }  
}

function exibeErro(erro, elemento) {
    elemento.style.display = 'block'
    elemento.innerHTML = erro
}

axios.get("https://dog.ceo/api/breeds/image/random")
    .then(url => {
        console.log(url.data)
        const images = document.querySelector(".image")
        const img = document.createElement("img")
        images.appendChild(img)
        img.setAttribute("src", url.data.message)
        sessionStorage.setItem("imgAPI", url.data.message)
})
