import recipes from './data/recipes.js';
import * as cards from './cardsRecette.js';
import * as input from './inputCouleur.js';
import trieElInput from './trieElInput.js';
let store = [];

async function index() {
  const recettes = recipes;
  cards.afficheCards(recettes);
  input.animationBtnTag(recettes);
  trieRechercheInput();
  document.addEventListener('input', (evenement) => {
    afficheNewGalerie(evenement);
  });
}
index();
// Affine la recherche en trier les recettes qui contiennent l'ensemble des mots clés
function tabRecetteTrier(recettes, store) {
  const saisie = document.querySelector('.barre-recherche');
  let tabRecette = [];
  const tabMotCles = [saisie.value];
  for (let el of store) {
    tabMotCles.push(el);
  }
  /* pour chaque mot clès verrifie si le est les présents dans le nom l'ingredients ou la description de la recette */
  for (let i = 0; i < recettes.length; i++) {
    let nbTrue = 0;
    for (let motCles of tabMotCles) {
      let motClesPresent = false;
      recettes[i].ingredients.forEach((el) => {
        if (el.ingredient.toLowerCase().includes(motCles.toLowerCase())) {
          motClesPresent = true;
        }
      });

      if (!motClesPresent) {
        if (
          recettes[i].name.toLowerCase().includes(motCles.toLowerCase()) ||
          recettes[i].description.toLowerCase().includes(motCles.toLowerCase())
        ) {
          motClesPresent = true;
        }
      }

      if (!motClesPresent && tabMotCles.length > 1) {
        if (
          recettes[i].appliance.toLowerCase().includes(motCles.toLowerCase())
        ) {
          motClesPresent = true;
        } else {
          recettes[i].ustensils.forEach((el) => {
            if (el.toLowerCase().includes(motCles.toLowerCase())) {
              motClesPresent = true;
            }
          });
        }
      }

      if (motClesPresent) {
        nbTrue++;
      }
      if (nbTrue === tabMotCles.length) {
        tabRecette.push(recettes[i]);
      }
    }
  }

  return tabRecette;
}

//Affiche les cartes trier dans la galerie
async function afficheNewGalerie(e) {
  const barreRecherche = document.querySelector('.barre-recherche');
  const recettes = recipes;
  const galerie = document.querySelector('.galerie');

  if (e.target === barreRecherche) {
    const saisie = e.target.value.toLowerCase();

    const newRecettes = tabRecetteTrier(recettes, store);
    if (saisie.length > 3) {
      if (newRecettes.length > 0) {
        cards.removeGalerie();
        cards.afficheCards(newRecettes);
      } else if (newRecettes.length === 0) {
        cards.removeGalerie();
        cards.afficheCards(newRecettes);
      }
    } else {
      if (store < 1) {
        cards.removeGalerie();
        cards.afficheCards(recettes);
      } else {
        cards.removeGalerie();
        cards.afficheCards(newRecettes);
      }
    }
  }
}

/* Trie les mots clés afficher à l'interieur de chaque input de couleur 
  afine la recherche en fonction des mots tag présents 
*/
async function trieRechercheInput() {
  const recettes = recipes;
  const inputCouleur = document.querySelectorAll('.contenant-mot-clés');
  const contenantMotCles = document.querySelectorAll('.mots-clés');
  const newRecettes = tabRecetteTrier(recettes, store);
  const tabInput = trieElInput(newRecettes);

  for (let i = 0; i < inputCouleur.length; i++) {
    inputCouleur[i].addEventListener('input', (e) => {
      const valeurSaisie = e.target.value.toLowerCase();
      const newTab = [];
      for (let el of tabInput[i]) {
        if (el.toLowerCase().includes(valeurSaisie)) {
          newTab.push(el);
        }
      }
      contenantMotCles[i].innerHTML = ' ';
      input.afficheMotCles(contenantMotCles[i], newTab);
    });
  }
}

//Fonction permettant d'afficher les tags  elle est appelé lorsqu'il ya une occurence entre la saisie et les mots clés
async function afficheTag(texte, numero) {
  const recettes = recipes;
  const contentTag = document.querySelector('.tag-content');
  const blockTag = document.createElement('div');
  switch (numero) {
    case 0:
      numero = 'bleu';
      break;
    case 1:
      numero = 'vert';
      break;
    case 2:
      numero = 'rouge';
      break;
    default:
      console.log("numero n'a pas de valeur ");
  }

  blockTag.classList.add('tag-block', numero);
  contentTag.appendChild(blockTag);
  blockTag.innerHTML = `
    <p class="text-tag">${texte}</p>   
    <i class="fa-regular fa-circle-xmark" id="close-tag"></i>                        
    </div>
    `;
  let nodeListTag = document.querySelectorAll('.tag-block');
  // Si nodeListag existe execute la fonction de suppression des tableaux dans la nodeList
  let obj = supprTagDoublon(nodeListTag);
  store = obj.tabMotCles;

  let newRecettes = tabRecetteTrier(recettes, store);
  cards.removeGalerie();
  cards.afficheCards(newRecettes);
  removeTag(nodeListTag, obj.tabMotCles);
  return obj;
}

// Fonction permettant d'empecher la création de toublon lorsque l'on saisie un mot clés
function supprTagDoublon(tab) {
  let valCompare = 0;
  let i = 0;
  let indxIterable = 1;
  let tabMotCles = [];
  // continue d'executer le code ci-dessous tant que la valeur de comparaisons n'est pas = au nombre total des index du tableau
  do {
    // pour chaque itération montre nous les deux valeurs de comparaisons
    for (let i = indxIterable; i < tab.length; i++) {
      //console.log(tab[i].textContent, tab[valCompare].textContent)
      if (tab[i].outerText === tab[valCompare].outerText) {
        tab[i].remove();
      }
    }
    // une fois les les itérations du tableau fini ajoute 1 à la valeur de comparaison ainsi qu'a l'index de la boucle for
    valCompare++;
    indxIterable++;
  } while (valCompare < tab.length);
  // Envoyer tous les mot clés dans un tableau sans qu'il n'y ait aucun doublon à l'intérieur
  tab.forEach((el) => {
    if (!el.outerText.includes('\n')) {
      tabMotCles.push(el.outerText);
    }
  });
  return { tab: [...tab], tabMotCles: [...tabMotCles] };
}

/* Petite fonction récursive pour supprimer les tags  */
function removeTag(nodeList, tabMotCles) {
  let recettes = recipes;
  let closeBtn = document.querySelectorAll('#close-tag');
  for (let index = 0; index < closeBtn.length; index++) {
    closeBtn[index].addEventListener('click', () => {
      tabMotCles.splice(index, 1);
      console.log(nodeList)
      nodeList[index].remove();
      store = tabMotCles;
      let newRecettes = tabRecetteTrier(recettes, store);
      cards.removeGalerie();
      cards.afficheCards(newRecettes);

      removeTag(nodeList, tabMotCles);
    });
  }
}

export { store, tabRecetteTrier, afficheTag };
