let obj = [];

async function index() {
  const recettes = recipes
  const data = trieElInput()
  //const tagData = ["lait"]
  afficheCards(recettes)
  animationBtnTag(data)
  trieRechercheInput()
  document.addEventListener("input", (evenement) => { trieBarreSearch(obj, evenement) })
}
index()

function tabRecetteTrier(recettes, tabRecherche) {
  let tabRecette = []
  recettes.forEach((recette) => {
    let nbTrue = 0;
    //Pour chaque recette, vérifier si la recette contient un des mots clés soit dans son nom sa descritpion ou ses ingredients 
    //boucle chaque élement du tableau recherche 
    tabRecherche.forEach((el) => {
      if (recette.name.toLowerCase().includes(el.toLowerCase()) === true || 
          recette.description.toLowerCase().includes(el.toLowerCase()) === true ||
          recette.ingredients.forEach((objIngredient) => {
            objIngredient.ingredient.toLowerCase().includes(el.toLowerCase())
        })
      )//si le mot clés est présent dans une des parties de l'objet recette  ajoute 1à la variable nombre de true
       {
        nbTrue++
       }
       // si tous les mots clés sont présent dans l'objet recette push recette dans un tableau 
      if (nbTrue === tabRecherche.length) {
        tabRecette.push(recette)
      }
    })
  })
  return tabRecette
}

//Affiche les cartes trier dans la galerie
async function trieBarreSearch(tabData, e) {
  const barreRecherche = document.querySelector(".barre-recherche")
  const recettes = recipes
  const galerie = document.querySelector(".galerie")
  if (e.target === barreRecherche){
    const saisie = e.target.value.toLowerCase()
     /* Renvoie un nouveau tableau avec les recettes incluants le tag taper dans la barre de recherche
   si la cible contient un groupe de lettres incluant le nom l'ingredients ou un mot de la description 
   et que la cible contient au moins 3 lettres */
     /* const newRecettes = recettes.filter(recette => 
        recette.name.toLowerCase().includes(saisie) || 

        recette.ingredients.forEach((objIngredient) => {
            objIngredient.ingredient.toLowerCase().includes(saisie)
        }) ||

        recette.description.toLowerCase().includes(saisie)
        )*/
        const newRecettes = []
        recettes.forEach((recette) => {
          if ( recette.name.toLowerCase().includes(saisie) || 

          recette.ingredients.forEach((objIngredient) => {
              objIngredient.ingredient.toLowerCase().includes(saisie)
          }) ||
  
          recette.description.toLowerCase().includes(saisie)) {
            newRecettes.push(recette)
          }
        })
      console.log(newRecettes)
      if (saisie.length > 3 ) {

        if ( newRecettes.length !== 0){
          // tabData.push(saisie)  if (newTab[0].length !== 0) {
               removeGalerie()
               afficheCards(newRecettes)
               console.log(newRecettes)
    
         } else if ( newRecettes.length === 0) {
           removeGalerie()
           galerie.textContent = "Aucun élément de la recherche ne correspond"
         }
      } else {
        removeGalerie()
        afficheCards(recettes)
      }
      console.log(saisie, tabData)

  } 
 
}
//Trie les recettes afficher à l'interieur de chaque input de couleur 
async function trieRechercheInput() {
  const recettes = recipes
  const input = document.querySelectorAll(".contenant-mot-clés")
  const motCles = document.querySelectorAll(".mots-clés")
  const tabInput = trieElInput()
  // pour chaque input de couleur execute ce code
  for (i = 0; i < input.length; i++) {
    const tab = tabInput[i]
    const newMotcles = motCles[i]
    const indexInput = i

    input[i].addEventListener("input", (e) => {
     
      const valeurRecherche = e.target.value.toLowerCase()
      const newTab = tab.filter(el => el.toLowerCase().includes(valeurRecherche))
      newMotcles.innerHTML = " "
      afficheMotCles(newMotcles, newTab)
      newTab.forEach((el) => {
        if (el.toLowerCase() === valeurRecherche) {
          afficheTag(el, indexInput)
          let newRecettes =  tabRecetteTrier(recettes, obj.tabMotCles)
          console.log("par ce que c'est ==>", newRecettes)
          removeGalerie()
          afficheCards(newRecettes)
        }
      })
    })
  }
}


async function afficheTag(texte, numero) {

  const contentTag = document.querySelector(".tag-content")
  const blockTag = document.createElement("div")
  switch (numero) {
    case 0: numero = "bleu";
      break;
    case 1: numero = "vert";
      break;
    case 2: numero = "rouge";
      break;
    default: console.log("numero n'a pas de valeur ")
  }
  console.log(numero)
  
  blockTag.classList.add("tag-block", numero)
  contentTag.appendChild(blockTag)
  blockTag.innerHTML = `
    <p class="text-tag">${texte}</p>   
    <i class="fa-regular fa-circle-xmark" id="close-tag"></i>                        
    </div>
    `
    let  nodeListTag = document.querySelectorAll(".tag-block")
   //console.log(nodeListTag)
  // Si nodeListag existe execute la fonction de suppression des tableaux dans la nodeList 
   obj  = supprTagDoublon(nodeListTag)
  removeTag(nodeListTag, obj.tabMotCles)
  return obj
}


function supprTagDoublon(tab) {
  let valCompare = 0
  let i = 0;
  let indxIterable = 1
  let tabMotCles = []
  // continue d'executer le code ci-dessous tant que la valeur de comparaisons n'est pas = au nombre total des index du tableau
  do {
    // pour chaque itération montre nous les deux valeurs de comparaisons
    for (i = indxIterable; i < tab.length; i++) {
      //console.log(tab[i].textContent, tab[valCompare].textContent)
      if (tab[i].outerText === tab[valCompare].outerText) {
        tab[i].remove()
      }
    }
    // une fois les les itérations du tableau fini ajoute 1 à la valeur de comparaison ainsi qu'a l'index de la boucle for
    valCompare++
    indxIterable++
  } while (valCompare < tab.length)
  // Envoyer tous les mot clés dans un tableau sans qu'il n'y ait aucun doublon à l'intérieur 
  tab.forEach((el) => {
    if (!el.outerText.includes("\n")) {
      tabMotCles.push(el.outerText)
    }
  })
  return { tab: [...tab], tabMotCles: [...tabMotCles] }
}


function removeTag(nodeList, tabMotCles) {
  let recettes = recipes
  let closeBtn = document.querySelectorAll("#close-tag")
 console.log(closeBtn.length)
  for(let index = 0; index < closeBtn.length; index ++){
 
    closeBtn[index].addEventListener("click", () => {
      
      nodeList[index].remove()
      tabMotCles.splice(index, 1)
      let newRecettes = tabRecetteTrier(recettes, tabMotCles)
      console.log(newRecettes)
      if (tabMotCles.length > 1 || tabMotCles.length === 1 ){
        
        removeGalerie()
        afficheCards(newRecettes)

      }
      else  {
        removeGalerie()
        afficheCards(recettes)
      }
      removeTag(nodeList, tabMotCles)
  })
}
}

/**/