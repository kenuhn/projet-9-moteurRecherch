async function index() {
  const recettes = recipes
  const data = trieElInput()
  afficheCards(recettes)
  animationBtnTag(data)
  trieRechercheInput()
  document.addEventListener("input", (evenement) => { trieBarreSearch(evenement) })
}
index()

// Affine la recherche en trier les recettes qui contiennent l'ensemble des mots clés
function tabRecetteTrier(recettes, tabMotCles) {
  //const galerie = document.querySelector(".galerie")
  let tabRecetteTrier = []
  
  /* Pour chaque recette, vérifier si la recette contient chacun des mots clés 
    du tableau tabRecherche soit dans son nom sa descritpion ou ses ingredients */
  recettes.forEach((recette) => {
    let nbTrue = 0;
    /* parcours le tableau recherche afin de rechercher si tous le mots sont présents  */

    tabMotCles.forEach((el) => {
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
      if (nbTrue === tabMotCles.length) {
        tabRecetteTrier.push(recette)
      } 
    })

  })
  return tabRecetteTrier
}

//Affiche les cartes trier dans la galerie
async function trieBarreSearch(e) {
  const barreRecherche = document.querySelector(".barre-recherche")
  const recettes = recipes
  
  if (e.target === barreRecherche){
    const saisie = e.target.value.toLowerCase()  
      if (saisie.length > 3 ) {
        /* Renvoie un nouveau tableau avec les recettes incluants le saisie taper dans la barre de recherche
        si la cible contient un groupe de lettres incluant le nom l'ingredients ou un mot de la description 
         et que la cible contient au moins 3 lettres */
        const newRecettes = recettes.filter(recette => 
          recette.name.toLowerCase().includes(saisie) || 
          recette.ingredients.forEach((objIngredient) => {
              objIngredient.ingredient.toLowerCase().includes(saisie)
          }) ||
          recette.description.toLowerCase().includes(saisie))

        if ( newRecettes.length !== 0){
               removeGalerie()
               afficheCards(newRecettes)
               console.log(newRecettes)
    
         } else if ( newRecettes.length === 0) {
          afficheError ()
         }
      } else {
        removeGalerie()
        afficheCards(recettes)
      }
      console.log(saisie)

  } 
 
}
//Trie les recettes afficher à l'interieur de chaque input de couleur 
async function trieRechercheInput() {
  const allInput = document.querySelectorAll(".contenant-mot-clés")
  const motCles = document.querySelectorAll(".mots-clés")
  // la fonction triElInput renvoie un objet contenant des tableaux de mots clés pour: ustensiles, ingredients, appareils
  const tabInput = trieElInput()
  // pour chaque input de couleur execute ce code

  allInput.forEach((input, index) => {

    const tab = tabInput[index]
    const newMotcles = motCles[index]
    const indexInput = index

    input.addEventListener("input", (e) => {
      const valeurSaisie = e.target.value.toLowerCase()
        /*  si la valeur de la saisie est inclue dans le tableaux des mots clés correspondant  
        alors pousse le mot clés dans un nouveau tableau 
     */
      const newTab = tab.filter(el =>  el.toLowerCase().includes(valeurSaisie))
      newMotcles.innerHTML = " "
       /* Ensuite pour chaque mot clés du newTab vérifie si la valeur de la saisie 
      est strictement = à un des éléments du newTab si oui ?
      => Affiche un tag => 
      */
      afficheMotCles(newMotcles, newTab)
      newTab.forEach((motCles) => {
        if (motCles.toLowerCase() === valeurSaisie) {
          afficheTag(motCles, indexInput)
        }
      })
    })

  }) 
  
}

/* ==> Fonction permettant d'afficher les tags  elle est appelé lorsqu'il ya une occurence entre la saisie et les mots clés
   ==> prends en paramétres l'index de l'input que l'utilisateur saisie 
   ==> Appelle removeTag 
   ==> return un un objet contenant tous les mots clés du tag 
*/
async function afficheTag(motCles, indexInput) {
  const recettes = recipes
  const contentTag = document.querySelector(".tag-content")
  const blockTag = document.createElement("div")
  switch (indexInput) {
    case 0: indexInput = "bleu";
      break;
    case 1: indexInput = "vert";
      break;
    case 2: indexInput = "rouge";
      break;
    default: console.log("numero n'a pas de valeur ")
  }

  blockTag.classList.add("tag-block", indexInput)
  contentTag.appendChild(blockTag)
  blockTag.innerHTML = `
    <p class="text-tag">${motCles}</p>   
    <i class="fa-regular fa-circle-xmark" id="close-tag"></i>                        
    </div>
    `
    // Si nodeListag existe execute la fonction de suppression des tableaux dans la nodeList 
    let  nodeListTag = document.querySelectorAll(".tag-block")

  /* Ensuite pour chaque mot clés du newTab vérifie si la valeur de la saisie 
      est strictement = à un des éléments du newTab si oui ?
      => Affiche un tag => suprime la galerie de recettes 
      => créer un nouveau tableau de recettes en fonction des mots clés
      => supprime les anciennes recettes dans la galerie => et affiche les nouvelles 
      */
   obj  = supprTagDoublon(nodeListTag)
   let newRecettes = tabRecetteTrier(recettes, obj.tabMotCles)
   console.log(newRecettes.length)
   if (newRecettes.length === 0 ) {
      removeGalerie()
      afficheError ()
      removeTag(nodeListTag, obj.tabMotCles)
   }else {
    removeGalerie()
    afficheCards(newRecettes)
    removeTag(nodeListTag, obj.tabMotCles)
   }
  return obj
}

function afficheError () {
  const galerie = document.querySelector(".galerie")
  removeGalerie()
  galerie.textContent = "Aucun élément de la recherche ne correspond"
}

// Fonction permettant d'empecher la création de tag ayant la même valeur 
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

//fonction récursive pour supprimer les tags au clique.
function removeTag(nodeList, tabMotCles) {
  let recettes = recipes
  let closeBtn = document.querySelectorAll("#close-tag")
  for(let index = 0; index < closeBtn.length; index ++){
 
    closeBtn[index].addEventListener("click", () => {
      
      nodeList[index].remove()
      tabMotCles.splice(index, 1)
      let newRecettes = tabRecetteTrier(recettes, tabMotCles)
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