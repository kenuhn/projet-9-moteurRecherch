let store = []

async function index() {
  const recettes = recipes
  const data = trieElInput()
  afficheCards(recettes)
  animationBtnTag(data)
  trieRechercheInput()
  document.addEventListener("input", (evenement) => { trieBarreSearch(evenement) })
}
index()


//Affiche les cartes trier dans la galerie
function tabRecetteTrier(recettes, tabMotCles) {
  const barreRecherche = document.querySelector('.barre-recherche');
  let tabRecette = [];
  const tab = [barreRecherche.value];
  tabMotCles.forEach(el => tab.push(el));
  console.log('motcles + saisie ==> ', tab);

  recettes.forEach(recette => {
      let nbTrue = 0;
      tab.forEach(motCles => {
          let motClesPresent = false;
          recette.ingredients.forEach(el => {
              if (el.ingredient.toLowerCase().includes(motCles.toLowerCase())) {
                  motClesPresent = true;
                  console.log('première verrification ', motClesPresent, motCles);
              }
          });

          if (!motClesPresent) {
              if (recette.name.toLowerCase().includes(motCles.toLowerCase()) || recette.description.toLowerCase().includes(motCles.toLowerCase())) {
                  motClesPresent = true;
                  console.log('deuième verrification ', motClesPresent, motCles);
              }
          }

          if (!motClesPresent && tab.length > 1) {
              console.log('on retre dans la troisième partie');
              if (recette.appliance.toLowerCase().includes(motCles.toLowerCase())) {
                  motClesPresent = true;
                  console.log('troisième verrification ', motClesPresent, motCles);
              } else {
                  recette.ustensils.forEach(el => {
                      if (el.toLowerCase().includes(motCles.toLowerCase())) {
                          motClesPresent = true;
                          console.log('troisième verrification ', motClesPresent, motCles);
                      }
                  });
              }
          }

          if (motClesPresent) {
              nbTrue++;
          }
      });

      if (nbTrue === tab.length) {
          console.log('ils sont ==> ', nbTrue, ' recettes a être inclure les mots clés');
          tabRecette.push(recette);
      }
  });
  console.log('tabRecette ==> ', tabRecette);
  return tabRecette;
}
//Affiche les cartes trier dans la galerie
async function trieBarreSearch(e) {
	const barreRecherche = document.querySelector('.barre-recherche');
	const recettes = recipes;
	const galerie = document.querySelector('.galerie');

	if (e.target === barreRecherche) {
		const saisie = e.target.value.toLowerCase();
		// console.log("store ==> ", store)

		const newRecettes = tabRecetteTrier(recettes, store);
		if (saisie.length > 3) {
			if (newRecettes.length > 0) {
				removeGalerie();
				afficheCards(newRecettes);
			} else if (newRecettes.length === 0) {
				removeGalerie();
				galerie.textContent = 'Aucun élément de la recherche ne correspond';
			}
		} else {
			if (store < 1) {
				removeGalerie();
				afficheCards(recettes);
			} else {
				removeGalerie();
				afficheCards(newRecettes);
			}
		}
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
      const newTab = tab.filter(el => el.toLowerCase().includes(valeurSaisie))
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
  let nodeListTag = document.querySelectorAll(".tag-block")

  /* Ensuite pour chaque mot clés du newTab vérifie si la valeur de la saisie 
      est strictement = à un des éléments du newTab si oui ?
      => Affiche un tag => suprime la galerie de recettes 
      => créer un nouveau tableau de recettes en fonction des mots clés
      => supprime les anciennes recettes dans la galerie => et affiche les nouvelles 
      */
  obj = supprTagDoublon(nodeListTag) //renvoie un tableau
  store = obj.tabMotCles
  let newRecettes = tabRecetteTrier(recettes, obj.tabMotCles)
  removeGalerie()
  afficheCards(newRecettes)
  removeTag(nodeListTag, obj.tabMotCles)
  return obj
}

// Fonction permettant d'empecher la création de toublon lorsque l'on saisie un mot clés
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
  for (let index = 0; index < closeBtn.length; index++) {

    closeBtn[index].addEventListener("click", () => {

      nodeList[index].remove()
      tabMotCles.splice(index, 1)
      let newRecettes = tabRecetteTrier(recettes, tabMotCles)
      store = tabMotCles
      console.log(newRecettes)

        removeGalerie()
        afficheCards(newRecettes)

      removeTag(nodeList, tabMotCles)
    })
  }
}

