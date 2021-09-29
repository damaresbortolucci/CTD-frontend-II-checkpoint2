const body = document.querySelector("body") //Selecionar o body

const divCanvas = document.createElement("div") //Criando uma div
divCanvas.setAttribute("class", "canvas")   //Atribuindo uma classe á ela

const canvas = document.createElement("canvas") // Criar um canvas
canvas.setAttribute("id", "myCanvas")   //Atribuindo um id

const p = document.createElement("p")   //Criando um texto
p.setAttribute("class", "percent")  //Atribuindo um texto

const divDot = document.createElement("div")  //Criando uma div
divDot.setAttribute("class", "dots") //Atribuindo uma classe á ela


//Posicionando os elementos criado acima
body.appendChild(divCanvas)
divCanvas.appendChild(canvas)
divCanvas.appendChild(p)
divCanvas.appendChild(divDot)


let c = document.getElementById("myCanvas"); //Selecionando o canvas criado
let ctx = c.getContext("2d");  //Criando uma figura 2d á ela

let numLoad = 0.02

//Criando uma função contador, pra dar uma volta completa
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

// Criando a função do carregamento
async function inLoad() {
    c.width = 300   //Tamanho do canvas
    c.height = 150  //Tamanho do canvas
    for (let i = 0; i < 100; i++) { //Criando um for, pra dar a volta no círculo
        await loading() //Executar a função contadora
        ctx.beginPath(); //O beginpath cria um novo caminho
        ctx.lineWidth = 4;  //LineWidth determina o tamanho da linha
        ctx.clearRect(0, 0, c.width, c.height); //Limpa o círculo antigo
        ctx.arc(150, 75, 20, 0, numLoad * Math.PI); //Cria o círculo
        ctx.strokeStyle = "#eaeaea";   //Determina a cor da linha
        ctx.stroke() //Mostra o desenho que você fez
        document.querySelector(".percent").innerHTML = i + 2 //Escreve no p, o progresso do carregamento
        if (numLoad >= 2) { //Verifica se deu uma volta completa
            for (let i1 = 200; i1 >= 0; i1--) {
                setTimeout(function () {
                    c.style.opacity = (i1 * 5) / 1000
                    document.querySelector(".percent").style.opacity = (i1 * 5) / 1000
                }, 200 - i1) //Essa função faz a opacidade sumir devagarinho
            }
            const dots = document.querySelector(".dots")
            setTimeout(function () {
                ctx.clearRect(0, 0, c.width, c.height);
                c.style.diplay = "none"
                dots.style.transition = "none"
                dots.style.color = "transparent"
                dots.style.display = "none"
                stopEffect()
            }, 1000) //Essa função some com toda a criação do círculo
            for (let v = 1; v <= 3; v++) {
                if (v == 1) dots.style.color = "#c9c9c9"
                setTimeout(function () {
                    dots.innerHTML += "<span></span>."
                }, 250 * v) // Mostra os 3 pontinhos se mexendo no final
            }
        }
    }
}


//Função para sumir com os objetos criados(blur, dots...)
const stopEffect = () => {
    let form = document.querySelector("form")
    form.style.filter = "none";
    document.querySelectorAll("input").forEach(el => el.disabled = false)
    document.querySelector(".blur").style.display = "none"
    document.querySelector(".percent").style.display = "none"
    document.querySelector(".canvas").style.display = "none"
}

//Chama o círculo
if(!sessionStorage.getItem("isloaded")){
    const blur = document.createElement("div")
    blur.setAttribute("class", "blur")
    document.querySelector("body").appendChild(blur)
    inLoad()
    sessionStorage.setItem("isloaded", true)
}
