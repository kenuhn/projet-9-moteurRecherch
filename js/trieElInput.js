function trieElInput() {
    const recettes = recipes
    let tabIngredients = []
    let tabAppareils = []
    let tabUstensils = []
    recettes.forEach((recette) => {
        //on pousse la liste de tous les appareils dans un nouveau tableau
        const minuscule = recette.appliance.toLowerCase()
        tabAppareils.push(
            minuscule.replace(minuscule[0], minuscule[0].toUpperCase())
        )

        recette.ingredients.forEach((ingredient) => {
            const minuscule = ingredient.ingredient.toLowerCase()
            tabIngredients.push(
                minuscule.replace(minuscule[0], minuscule[0].toUpperCase())
            )
            //console.log(ingredient.ingredient.toLowerCase().replace(ingredient.ingredient[0], ingredient.ingredient[0].toUpperCase()))
        })
        recette.ustensils.forEach((ustensile) => {
            //ustensile.forEach((el) => el.toLowerCase())
            // remplace la première lettre de l'alphabet par une lettre majuscule
            tabUstensils.push(
                ustensile.replace(ustensile[0], ustensile[0].toUpperCase())
            )
        })
    })

    //const tabTrier = tabIngredients.filter((x, i) => tabIngredients.indexOf(x) === i )
    const ingredients = [...new Set(tabIngredients)]
    const appareils = [...new Set(tabAppareils)]
    const ustensiles = [...new Set(tabUstensils)]

    return [ingredients, appareils, ustensiles]
}
