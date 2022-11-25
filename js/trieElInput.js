/* Renvoie un tableau avec tous les ingredients, appareils et ustenils 
  Afin de le réutiliser pour la recherche par mot clés
    => Problématique: les mots clés peuvent exister dans plusieurs recettes donc doublons possibles
*/

function trieElInput() {
    const recettes = recipes
    let tabIngredients = []
    let tabAppareils = []
    let tabUstensils = []
    recettes.forEach((recette) => {
        //on pousse la liste de tous les appareils/Recettes   dans un nouveau tableau
      const minuscule = recette.appliance.toLowerCase() 
      // remplace la première lettre de l'alphabet par une lettre majuscule 
      tabAppareils.push(minuscule.replace(minuscule[0], minuscule[0].toUpperCase()))

      recette.ingredients.forEach((ingredient) => {
        const minuscule = ingredient.ingredient.toLowerCase()
        tabIngredients.push(minuscule.replace(minuscule[0], minuscule[0].toUpperCase()))
        
    })
      recette.ustensils.forEach((ustensile) => {
  
        tabUstensils.push(ustensile.replace(ustensile[0], ustensile[0].toUpperCase()))
      })
    })

 
    /* enlever les doublons pour chaque tableau de mots clés  */
    const ingredients = [...new Set(tabIngredients)]
    const appareils = [...new Set(tabAppareils)]
    const ustensiles = [...new Set(tabUstensils)]
  
   return ([ingredients, appareils, ustensiles])
  }

  