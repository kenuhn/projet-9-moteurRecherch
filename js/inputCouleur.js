import trieElInput from "./trieElInput.js"
import { store } from "./index.js"
import { tabRecetteTrier } from "./index.js"
import { afficheTag } from "./index.js"
function animationBtnTag(recettes) {
    const input = document.querySelectorAll(".mots-clés-input")
    const arrowUp = document.querySelectorAll(".arrow-up")
    const arrowDown = document.querySelectorAll(".arrow-down")
    const texteInput = document.querySelectorAll(".placeholder-texte")
    const contenantInput = document.querySelectorAll(".contenant-mot-clés")
    const motCles = document.querySelectorAll(".mots-clés")

    input.forEach((el) => el.style.width = "150px")
    document.addEventListener("click", (e) => {
        for (let i = 0; i < input.length; i++) {
            // pour chaque index executer les commandes suivantes
           
            if (e.target === input[i] && input[i].style.width === "150px") {
                input[i].style.width = "800px"
                arrowUp[i].style.display = "none"
                arrowDown[i].style.display = "block"
                texteInput[i].style.display = "none"
                input[i].setAttribute("placeholder", "rechercher des" + texteInput[i].textContent + "...")
                contenantInput[i].style.height = "375px"
                motCles[i].style.display = "flex"
                let newRecettes = tabRecetteTrier(recettes, store)
                let data = trieElInput(newRecettes)
                afficheMotCles (motCles[i], data[i])
                console.log(motCles[i].children) 
            }
                let collection = motCles[i].children
                for(let item of collection){
                    if(e.target === item && input[i].style.width === "800px") {
                        //console.log("salut")
                        afficheTag(item.textContent, i)
                        motCles[i].innerHTML = ' ';
                        let newRecettes = tabRecetteTrier(recettes, store)
                        let data = trieElInput(newRecettes)
                        afficheMotCles (motCles[i], data[i])
                    }
                } 
         if (e.target !== input[i] && input[i].style.width === "800px") {
               // console.log(e.target, input[i])
                input[i].value = " "
                input[i].style.width = "150px";
                arrowUp[i].style.display = "block"
                arrowDown[i].style.display = "none"
                texteInput[i].style.display = "block"
                contenantInput[i].style.height = "50px"
                motCles[i].textContent = ""
                motCles[i].style.display = "none"
            }

        }
    })

}
function afficheMotCles (motCles, data) {

    const newTab = data.filter(el => data.indexOf(el) < 30) // n'affiche pas plus de 30 mot clès
    /* Pour chaque motCles présent dans le tablea de mot cles créer un nouveau mot cles das le conteneur de mots clés input */
    newTab.forEach((el) => {
        const p = document.createElement("p")
        p.textContent = el
        p.className = "texte-mot-clés"
        motCles.appendChild(p)
    })

}

export {animationBtnTag, afficheMotCles}