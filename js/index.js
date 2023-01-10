let store = [];

async function index() {
	const recettes = recipes;
	const data = trieElInput();
	afficheCards(recettes);
	animationBtnTag(data);
	trieRechercheInput();
	document.addEventListener('input', (evenement) => {
		trieBarreSearch(evenement);
	});
}
index();
// Affine la recherche en trier les recettes qui contiennent l'ensemble des mots clés
 function tabRecetteTrier(recettes, tabMotCles) {
	const barreRecherche = document.querySelector('.barre-recherche');
	let tabRecette = [];
	const tab = [barreRecherche.value];
	for (el of tabMotCles) {
		tab.push(el);
	}
	console.log('motcles + saisie ==> ', tab);
	/* pour chaque mot clès verrifie si le est les présents dans le nom l'ingredients ou la description de la recette */
	for (let i = 0; i < recettes.length; i++) {
		let nbTrue = 0;
		for (motCles of tab) {
			let motClesPresent = false;
			recettes[i].ingredients.forEach((el) => {
				if (el.ingredient.toLowerCase().includes(motCles.toLowerCase())) {
					motClesPresent = true;
					console.log('première verrification ', motClesPresent, motCles);
				}
			});

			if (motClesPresent === false) {
				if (
					recettes[i].name.toLowerCase().includes(motCles.toLowerCase()) ||
					recettes[i].description.toLowerCase().includes(motCles.toLowerCase())
				) {
					motClesPresent = true;
					console.log('deuième verrification ', motClesPresent, motCles);
				}
			}

			if (motClesPresent === false &&  tab.length > 1) {
				console.log('on retre dans la troisième partie');
				if (recettes[i].appliance.toLowerCase().includes(motCles.toLowerCase())) {
					motClesPresent = true;
					console.log('troisième verrification ', motClesPresent, motCles);
				} else {
					recettes[i].ustensils.forEach((el) => {
						if (el.toLowerCase().includes(motCles.toLowerCase())) {
							motClesPresent = true;
							console.log('troisième verrification ', motClesPresent, motCles);
						}
					});
				}
			}

			if (motClesPresent === true) {
				nbTrue++;
			}
			// si tous les mots clés sont présent dans {l'objet recette}, alors push recette dans un tableau
			if (nbTrue === tab.length) {
				console.log('ils sont ==> ', nbTrue, ' recettes a être inclure les mots clés');
				tabRecette.push(recettes[i]);
			}
		}
	}
	console.log('tabRecette ==> ', tabRecette);
	return tabRecette;
}
 


/* Trie les mots clés afficher à l'interieur de chaque input de couleur 
  afine la recherche en fonction des mots tag présents 
*/
async function trieRechercheInput() {
	const input = document.querySelectorAll('.contenant-mot-clés');
	const motCles = document.querySelectorAll('.mots-clés');
	// la fonction triElInput renvoie un objet contenant des tableaux de mots clés pour: ustensiles, ingredients, appareils
	const tabInput = trieElInput();
	// pour chaque input de couleur affilie un tableau de mots clés
	for (i = 0; i < input.length; i++) {
		const tab = tabInput[i];
		const newMotcles = motCles[i];
		const indexInput = i;

		input[i].addEventListener('input', (e) => {
			/*  si la valeur de la saisie est inclue dans le tableaux des mots clés correspondant  
        alors pousse le mot clés dans un nouveau tableau 
     */
			const valeurSaisie = e.target.value.toLowerCase();
			const newTab = [];
			for (el of tab) {
				if (el.toLowerCase().includes(valeurSaisie)) {
					newTab.push(el);
				}
			}
			/* supprime les mots clés présent dans l'input et affiche les mot clés  
      du nouveau tableau de mot clés en appelant la fonction affiche mot clés 
      */
			newMotcles.innerHTML = ' ';
			afficheMotCles(newMotcles, newTab);

			/* Ensuite pour chaque mot clés du newTab vérifie si la valeur de la saisie 
      est strictement = à un des éléments du newTab si oui ?
      => Affiche un tag =>
      */
			for (el of newTab) {
				if (el.toLowerCase() === valeurSaisie) {
					afficheTag(el, indexInput);
				}
			}
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
	/* Ensuite pour chaque mot clés du newTab vérifie si la valeur de la saisie 
      est strictement = à un des éléments du newTab si oui ?
      => Affiche un tag => suprime la galerie de recettes 
      => créer un nouveau tableau de recettes en fonction des mots clés
      => supprime les anciennes recettes dans la galerie => et affiche les nouvelles 
      */
	let newRecettes = tabRecetteTrier(recettes, store);
	removeGalerie();
	afficheCards(newRecettes);
	removeTag(nodeListTag, /* obj.tabMotCles */ obj.tabMotCles);
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
		for (i = indxIterable; i < tab.length; i++) {
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
			nodeList[index].remove();
			store = tabMotCles;
			let newRecettes = tabRecetteTrier(recettes, store);
			removeGalerie();
			afficheCards(newRecettes);

			removeTag(nodeList, tabMotCles);
		});
	}
}
