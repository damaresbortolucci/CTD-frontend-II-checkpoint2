let button = document.querySelector('button')

button.addEventListener('click', function (event) {
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

axios.get("https://dog.ceo/api/breeds/image/random")
    .then(url => {
        console.log(url.data)
        const images = document.querySelector(".image")
        const img = document.createElement("img")
        images.appendChild(img)
        img.setAttribute("src", url.data.message)
    })