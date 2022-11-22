function animationBtnTag(data) {
    const input = document.querySelectorAll(".mots-clés-input")
    const arrowUp = document.querySelectorAll("#arrow-up")
    const arrowDown = document.querySelectorAll("#arrow-down")
    const texteInput = document.querySelectorAll(".placeholder-texte")
    const contenantInput = document.querySelectorAll(".contenant-mot-clés")
    const motCles = document.querySelectorAll(".mots-clés")
    console.log(motCles)
    input.forEach((el) => el.style.width = "150px")
    document.addEventListener("click", (e) => {
        for (i = 0; i < input.length; i++) {
            // pour chaque index executer les commandes suivantes
            if (e.target === input[i] && input[i].style.width === "150px") {
                //console.log(e.target, input[i])
                input[i].style.width = "800px"
                arrowUp[i].style.display = "block"
                arrowDown[i].style.display = "none"
                arrowUp[i].style.display = "block"
                texteInput[i].style.display = "none"
                input[i].setAttribute("placeholder", "rechercher des" + texteInput[i].textContent + "...")
                contenantInput[i].style.height = "375px"
                motCles[i].style.display = "flex"
                afficheMotCles (motCles[i], data[i])
            } else if (e.target !== input[i] && input[i].style.width === "800px") {
               // console.log(e.target, input[i])
                input[i].value = " "
                input[i].style.width = "150px";
                arrowUp[i].style.display = "none"
                arrowDown[i].style.display = "block"
                texteInput[i].style.display = "block"
                input[i].setAttribute("placeholder", "")
                contenantInput[i].style.height = "50px"
                motCles[i].textContent = ""
                motCles[i].style.display = "none"
            }
            // 
            else if (e.target === input[i] && input[i].style.width === "800px") {
                console.log(e.target, input[i])
                e.target.value = " "
                input[i].style.width = "150px";
                arrowUp[i].style.display = "none"
                arrowDown[i].style.display = "block"
                texteInput[i].style.display = "block"
                input[i].setAttribute("placeholder", "")
                contenantInput[i].style.height = "50px"
                motCles[i].textContent = ""
                motCles[i].style.display = "none"
            }
        }
    })

}

function afficheMotCles (motCles, data) {

    const newTab = data.filter(el => data.indexOf(el) < 30) // n'affiche pas plus de 30 mot clès
    newTab.forEach((el) => {
        const p = document.createElement("p")
        p.textContent = el
        p.className = "texte-mot-clés"
        motCles.appendChild(p)
    })

}