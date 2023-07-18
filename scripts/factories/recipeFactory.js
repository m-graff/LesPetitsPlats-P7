// Fonction de création de la card recette comprenant toutes leurs informations
function recipeFactory(recipe) {
    const { name, ingredients, time, description } = recipe;

    // Création du DOM de la carte recette
    function getRecipesCardDOM() {
        const card = document.createElement('article');
        card.classList.add('card');

        const link = document.createElement('a');
        //link.setAttribute('href', '#');
        card.appendChild(link);

        const img = document.createElement('div');
        img.classList.add('card-img');
        link.appendChild(img);

        const body = document.createElement('div');
        body.classList.add('card-body');
        link.appendChild(body);

        const header = document.createElement('div');
        header.classList.add('card-header');
        body.appendChild(header);

        const h2 = document.createElement('h2');
        h2.classList.add('card-title');
        h2.textContent = name;
        header.appendChild(h2);

        const timing = document.createElement('span');
        timing.classList.add('card-time');
        header.appendChild(timing);

        const clock = document.createElement('i')
		clock.classList.add('far', 'fa-clock')
        timing.appendChild(clock);

        const minutes = document.createElement('p');
        minutes.textContent = `${time} min`;
        timing.appendChild(minutes);

        const main = document.createElement('div');
        main.classList.add('card-main');
        body.appendChild(main);

        const ingredientsList = document.createElement('ul');
        ingredientsList.classList.add('card-ingredientsList');
        main.appendChild(ingredientsList);

        ingredients.forEach((ingredient) => {
            const ingredientsLine = document.createElement('li');
            ingredientsLine.classList.add('card-ingredient');

            const ingredientsItem = document.createElement('p');
            ingredientsItem.textContent = `${ingredient['ingredient']}`;
            ingredientsLine.appendChild(ingredientsItem)

            const ingredientsQty = document.createElement('span')
            // Cas de figure où la liste d'ingrédients contient une unité en plus de la quantité
            if (('ingredient' in ingredient) & ('quantity' in ingredient) & ('unit' in ingredient)) {
				ingredientsQty.textContent = ` : ${ingredient['quantity']} ${ingredient['unit']}`
            // Cas de figure où la liste d'ingrédients ne contient qu'une quantité
			} else if (('ingredient' in ingredient) & ('quantity' in ingredient)) {
				ingredientsQty.textContent = ` : ${ingredient['quantity']}`
			}
            ingredientsItem.appendChild(ingredientsQty);
            ingredientsList.appendChild(ingredientsLine);

        })

        const descriptionText = document.createElement('p');
        descriptionText.classList.add('card-description');
        descriptionText.textContent = description;
        main.appendChild(descriptionText);
        
        

        return (card);
    }

    return { getRecipesCardDOM };
}