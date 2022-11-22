function afficheCards(recettes){
    const galerie = document.querySelector(".galerie")

        recettes.forEach((recette) => {
            //console.log(recette.ingredients)
            const cards = document.createElement("div")
            const media = document.createElement("div")
            const contentRecette = document.createElement("div")
            const titreRecette = document.createElement("h3")
            const tempsRecette  = document.createElement("p")
            const ingredients = document.createElement("div")
            const description = document.createElement("p")
            
            titreRecette.textContent = recette.name
            tempsRecette.textContent = recette.time + " min"
            recette.ingredients.forEach((ingredient) => {
                const texteIngredients = document.createElement("p")
                texteIngredients.className = "texte-ingredients"
                const texteIngredientsBold = document.createElement("p")
                texteIngredientsBold.className = "bold-text-ingredients"
                ingredients.appendChild(texteIngredientsBold)
                ingredients.appendChild(texteIngredients)
                texteIngredientsBold.textContent = ingredient.ingredient + ": "
                if (ingredient.ingredient && ingredient.quantity && !ingredient.unit){
                    texteIngredients.textContent =  ingredient.quantity

                }
               else if (ingredient.ingredient && ingredient.quantity && ingredient.unit){
                    texteIngredients.textContent =  ingredient.quantity + " " + ingredient.unit
                }
                    
            })

            description.textContent = recette.description

            cards.className = "carte-recette"
            media.className = "carte-recette-media"
            contentRecette.className = "content-recette"
            tempsRecette.className = "temps-recette"
            titreRecette.className= "titre-recette"
            ingredients.className = "content-ingredients"
            description.className = "carte-recette-description"

            galerie.appendChild(cards)
            cards.appendChild(media)
            cards.appendChild(contentRecette)
            contentRecette.appendChild(titreRecette)
            contentRecette.appendChild(tempsRecette)
            contentRecette.appendChild(ingredients)
            contentRecette.appendChild(description)
        })
}


function removeGalerie() {
    const galerie = document.querySelector(".galerie")
    galerie.innerHTML = " "
}