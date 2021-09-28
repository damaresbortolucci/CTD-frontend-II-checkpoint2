const body = document.querySelector("body")

const divCanvas = document.createElement("div")
divCanvas.setAttribute("class", "canvas")

const canvas = document.createElement("canvas")
canvas.setAttribute("id", "myCanvas")

const p = document.createElement("p")
p.setAttribute("class", "percent")

const divDot = document.createElement("div")
divDot.setAttribute("class", "dots")

body.appendChild(divCanvas)
divCanvas.appendChild(canvas)
divCanvas.appendChild(p)
divCanvas.appendChild(divDot)


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
        ctx.lineWidth = 4;
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.arc(150, 75, 20, 0, numLoad * Math.PI);
        ctx.strokeStyle = "#eaeaea";
        ctx.stroke()
        document.querySelector(".percent").innerHTML = i + 2
        if (numLoad >= 2) {
            for (let i1 = 200; i1 >= 0; i1--) {
                setTimeout(function () {
                    c.style.opacity = (i1 * 5) / 1000
                    document.querySelector(".percent").style.opacity = (i1 * 5) / 1000
                }, 200 - i1)
            }
            const dots = document.querySelector(".dots")
            setTimeout(function () {
                ctx.clearRect(0, 0, c.width, c.height);
                c.style.diplay = "none"
                dots.style.transition = "none"
                dots.style.color = "transparent"
                dots.style.display = "none"
                stopEffect()
            }, 1000)
            for (let v = 1; v <= 3; v++) {
                if (v == 1) dots.style.color = "#c9c9c9"
                setTimeout(function () {
                    dots.innerHTML += "<span></span>."
                }, 250 * v)
            }
        }
    }
}

const stopEffect = () => {
    let form = document.querySelector("form")
    form.style.filter = "none";
    document.querySelectorAll("input").forEach(el => el.disabled = false)
    document.querySelector(".blur").style.display = "none"
    document.querySelector(".percent").style.display = "none"
}

if(!sessionStorage.getItem("isloaded")){
    const blur = document.createElement("div")
    blur.setAttribute("class", "blur")
    document.querySelector("body").appendChild(blur)
    inLoad()
    sessionStorage.setItem("isloaded", true)
}
