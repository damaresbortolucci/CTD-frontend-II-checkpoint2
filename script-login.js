
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



let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let numLoad = 0.02

function loading() {
    return new Promise(function (resolve, reject) {
        setTimeout(_ => {
            if (numLoad <= 2) {
                resolve(numLoad += 0.02)
            } else {
                reject(console.log("Err"))
            }
        }, 16)
    })
}
async function inLoad() {
    c.width = 300
    c.height = 150
    for (let i = 0; i < 100; i++) {
        await loading()
        ctx.beginPath();
        ctx.lineWidth = 12;
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.arc(150, 75, 25, 0, numLoad * Math.PI);
        ctx.strokeStyle = "#eaeaea";
        ctx.stroke()
        document.querySelector(".percent").innerHTML = i+2
        if (numLoad >= 2) {
            setTimeout(function () {
                let form = document.querySelector("form")
                form.style.filter = "none";
                ctx.clearRect(0, 0, c.width, c.height);
                c.style.diplay = "none"
                document.querySelectorAll("input").forEach(el => el.disabled = false)
                document.querySelector(".blur").style.display = "none"
                document.querySelector(".percent").style.display = "none"
            }, 1000)
        }
    }
}

window.onload = _ => {
    inLoad()
}