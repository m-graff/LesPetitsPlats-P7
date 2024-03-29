import Select from './factories/Select.js'

// Déclaration des variables globales 
let recipes = []
let selectedIngredients = []
let selectedAppliances = []
let selectedUstensiles = []
const selects = []

const tags = document.querySelector('.tags')

// Récupération des différentes recettes via un fetch
async function getRecipes() {
    const res = await fetch("https://m-graff.github.io/LesPetitsPlats-P7/data/recipes.json")
    return await res.json()
}

// Fonction d'initialisation
async function init() {
    recipes = await getRecipes();
    displayRecipes();
    displayIngredientsSelect()
    displayAppliancesSelect()
    displayUstensilsSelect()
};
init();

// Affichage des Cards recette via la factory recipeFactory
function displayRecipes() {
    const recipeSection = document.getElementById('cards-container');
    recipeSection.innerHTML = '';

    // Itération sur chaque recette dans le tableau 'recipes'
    recipes.forEach((recipe) => {
        // Création d'un modèle de recette en utilisant la factory 'recipeFactory' 
        const recipeTemplate = recipeFactory(recipe);
        // Appel de la fonction 'getRecipesCardDOM()' du modèle de recette pour obtenir le DOM de la card de recette
        const recipeCardDOM = recipeTemplate.getRecipesCardDOM();
        // Ajout de la card de recette à la section des cards de recette pour son affichage
        recipeSection.appendChild(recipeCardDOM);
    });
}

// Fonction prenant une liste de recettes et renvoiant une liste de tous les ingrédients de ces recettes, en minuscule.
function getIngredientsFromRecipes(recipes) {
    // La méthode `map` transforme chaque recette en un tableau d'ingrédients normalisés (en minuscules)
    const ingredients = recipes
        .map(recipe =>
            // La méthode `map` extrait le nom de chaque ingrédient et le normalise en minuscules
            recipe.ingredients
                .map(ingredient => ingredient.ingredient.toLowerCase())
        ).flat(); // La méthode `flat` aplatit le tableau de tableaux d'ingrédients en un seul tableau

    // Création d'un nouvel ensemble (`Set`) à partir du tableau `ingredients`, ce qui élimine automatiquement les doublons, avant d'utiliser `Array.from()` pour convertir l'ensemble en un tableau contenant les ingrédients uniques normalisés
    return Array.from(new Set(ingredients));
}

// Listbox : Récupération et création de la liste déroulante d'ingrédients 
function displayIngredientsSelect() {
    const ingredients = getIngredientsFromRecipes(recipes)
    // Création d'un nouvel objet 'Select' pour gérer les fonctionnalités de la liste déroulante d'ingrédients
    const select = new Select(
        Array.from(new Set(ingredients)),
        'ingredient',
        'Ingrédient',
        'Recherchez vos ingrédients',
        'tri-ingredients',
        // Vérification pour éviter la sélection plusieurs fois d'un même ingrédient
        (ingredient) => {
            if(selectedIngredients.includes(ingredient)){
                return
            }
            selectedIngredients.push(ingredient) // Ajout de l'ingrédient sélectionné à la liste des ingrédients sélectionnés

            // Création d'un nouvel élément <li> (tag) pour représenter l'ingrédient sélectionné dans une liste de tags
            const listElement = document.createElement('li')
            listElement.innerText = ingredient
            listElement.style.background = "#3282F7"
            const listElementClose = document.createElement('i')
            listElementClose.classList.add("fa", "fa-times-circle")
            listElement.appendChild(listElementClose)
            tags.appendChild(listElement)
            search() // Appel de la fonction de recherche pour filtrer les recettes en fonction des ingrédients sélectionnés

            // Gestion de l'événement de clic pour supprimer l'ingrédient sélectionné
            listElement.addEventListener('click', () => {
                // Filtrage pour supprimer l'ingrédient sélectionné de la liste des ingrédients sélectionnés
                selectedIngredients = selectedIngredients
                    .filter(selectedIngredient => selectedIngredient !== ingredient)
                listElement.remove()
                search() // Réexécution de la fonction de recherche pour mettre à jour les recettes affichées
            })
        },
        // Gestion de l'ouverture Listbox, faisant en sorte de ne permettre l'affichage que d'une seule liste déroulante à la fois
        () => {
            if (select.isOpened) {
                selects.forEach(select => {
                    if (select.type !== 'ingredient') {
                        select.close()
                    }
                })
            }
        }
    )
    selects.push(select)
    // Ajout de la liste déroulante d'ingrédients au DOM
    const triIngredients = document.querySelector('.tri-ingredients')
    triIngredients.appendChild(select.render())
}

// Fonction prenant une liste de recettes et renvoiant une liste de tous les appareils de ces recettes, en minuscule.
function getAppliancesFromRecipes(recipes) {
    // La méthode `map` extrait l'appareil de chaque recette et le normaliser en minuscules
    const appliances = recipes.map(recipe => recipe.appliance.toLowerCase());

    // Création d'un nouvel ensemble (`Set`) à partir du tableau `appliances`, ce qui élimine automatiquement les doublons avant d'utiliser `Array.from()` pour convertir l'ensemble en un tableau contenant les appareils uniques normalisés
    return Array.from(new Set(appliances));
}

// Listbox : Récupération et création de la liste déroulante d'appareils
function displayAppliancesSelect() {
    const appliances = getAppliancesFromRecipes(recipes)
    // Création d'un nouvel objet 'Select' pour gérer les fonctionnalités de la liste déroulante d'appareils
    const select = new Select(
        Array.from(new Set(appliances)),
        'appareil',
        'Appareils',
        'Recherchez vos appareils',
        'tri-appareils',
        // Vérification pour éviter la sélection plusieurs fois d'un même appareil
        (appliance) => {
            if(selectedAppliances.includes(appliance)){
                return
            }
            selectedAppliances.push(appliance) // Ajout de l'appareil sélectionné à la liste des appareils sélectionnés

            // Création d'un nouvel élément <li> (tag) pour représenter l'appareil sélectionné dans une liste de tags
            const listElement = document.createElement('li')
            listElement.innerText = appliance
            listElement.style.background = "#68D9A4"
            const listElementClose = document.createElement('i')
            listElementClose.classList.add("fa", "fa-times-circle")
            listElement.appendChild(listElementClose)
            tags.appendChild(listElement)
            search() // Appel de la fonction de recherche pour filtrer les recettes en fonction des appareils sélectionnés

            // Gestion de l'événement de clic pour supprimer l'appareil sélectionné
            listElement.addEventListener('click', () => {
                // Filtrage pour supprimer l'appareil sélectionné de la liste des appareils sélectionnés
                selectedAppliances = selectedAppliances
                    .filter(selectedAppliance => selectedAppliance !== appliance)
                listElement.remove()
                search() // Réexécution de la fonction de recherche pour mettre à jour les recettes affichées
            })
        },
        // Gestion de l'ouverture Listbox, faisant en sorte de ne permettre l'affichage que d'une seule liste déroulante à la fois
        () => {
            if (select.isOpened) {
                selects.forEach(select => {
                    if (select.type !== 'appareil') {
                        select.close()
                    }
                })
            }
        }
    )
    selects.push(select)
    // Ajout de la liste déroulante d'appareils au DOM
    const triIngredients = document.querySelector('.tri-appareils')
    triIngredients.appendChild(select.render())
}

// Fonction prenant une liste de recettes et renvoiant une liste de tous les ustensiles de ces recettes, en minuscule.
function getUstensilsFromRecipes(recipes) {
    // La méthode `map` transforme chaque recette en un tableau d'ustensiles normalisés (en minuscules)
    const ustensils = recipes
        .map(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase()))
        .flat();

    // Création d'un nouvel ensemble (`Set`) à partir du tableau `ustensils`, ce qui élimine automatiquement les doublons avant d'utiliser `Array.from()` pour convertir l'ensemble en un tableau contenant les ustensiles uniques normalisés
    return Array.from(new Set(ustensils));
}

// Listbox : Récupération et création de la liste déroulante d'ustensiles 
function displayUstensilsSelect() {
    const ustensils = getUstensilsFromRecipes(recipes)
    // Création d'un nouvel objet 'Select' pour gérer les fonctionnalités de la liste déroulante d'ustensiles
    const select = new Select(
        Array.from(new Set(ustensils)),
        'ustensil',
        'Ustensiles',
        'Recherchez vos ustensiles',
        'tri-ustensiles',
        // Vérification pour éviter la sélection plusieurs fois d'un même ustensile
        (ustensil) => {
            if(selectedUstensiles.includes(ustensil)){
                return
            }
            selectedUstensiles.push(ustensil) // Ajout de l'ustensile sélectionné à la liste des ustensiles sélectionnés

            // Création d'un nouvel élément <li> (tag) pour représenter l'ustensile sélectionné dans une liste de tags
            const listElement = document.createElement('li')
            listElement.innerText = ustensil
            listElement.style.background = "#ED6454"
            const listElementClose = document.createElement('i')
            listElementClose.classList.add("fa", "fa-times-circle")
            listElement.appendChild(listElementClose)
            tags.appendChild(listElement)
            search() // Appel de la fonction de recherche pour filtrer les recettes en fonction des ustensiles sélectionnés

            // Gestion de l'événement de clic pour supprimer l'ustensile sélectionné
            listElement.addEventListener('click', () => {
                selectedUstensiles = selectedUstensiles
                    .filter(selectedUstensil => selectedUstensil !== ustensil)
                listElement.remove()
                search() // Réexécution de la fonction de recherche pour mettre à jour les recettes affichées
            })
        },
        // Gestion de l'ouverture Listbox, faisant en sorte de ne permettre l'affichage que d'une seule liste déroulante à la fois
        () => {
            if (select.isOpened) {
                selects.forEach(select => {
                    if (select.type !== 'ustensil') {
                        select.close()
                    }
                })
            }
        }
    )
    selects.push(select)
    // Ajout de la liste d'ustensiles d'appareils au DOM
    const triIngredients = document.querySelector('.tri-ustensiles')
    triIngredients.appendChild(select.render())
}


/* Algorithme de filtrage des recettes - Input principal - Titre et description */
// Sélection de l'élément input et ajout d'un gestionnaire d'événement de saisie
const searchBarInput = document.getElementById('searchBar-input');
searchBarInput.addEventListener('input', search);

// Fonction générique prenant une recette en paramètre et effectuant une recherche basée sur une entrée de recherche
function searchByInput(recipe) {
    // Récupérer l'entrée de recherche en vérifiant que la saisie soit < 3
    const searchInput = searchBarInput.value;
    if(searchInput.length < 3){
        return true
    }
    // Convertir l'entrée de recherche en minuscules
    const searchTerm = searchInput.toLowerCase();
    // Convertir le titre de la recette et la description de la recette en minuscules
    const recipeTitle = recipe.name.toLowerCase();
    const recipeDescription = recipe.description.toLowerCase();
    const recipeIngredients = recipe
        .ingredients
        .filter(({ingredient}) => ingredient.toLowerCase().includes(searchTerm))
        
    // Si le mot clé est inclus dans le titre ou la description de la recette, retourner true
    return recipeTitle.includes(searchTerm)
        || recipeDescription.includes(searchTerm)
        || recipeIngredients.length > 0
}

// Algorithme de recherche spécifique à l'input de la listbox Ingrédients
function searchByIngredients(recipe) {
    return recipe.ingredients
        // Filtrer les ingrédients de la recette en fonction des ingrédients sélectionnés
        .filter(ingredient => selectedIngredients.includes(ingredient.ingredient.toLowerCase()))
        // Vérifier si le nombre d'ingrédients filtrés est égal au nombre total d'ingrédients sélectionnés
        .length === selectedIngredients.length;
}

// Algorithme de recherche spécifique à l'input de la listbox Appareils
function searchByAppliances(recipe) {
    return selectedAppliances
        // Filtrer l'appareil contenu dans la recette en fonction de l'appareil sélectionné  
        .filter(appliance => appliance === recipe.appliance.toLowerCase())
        // Vérifier si le nombre d'appareils filtrés est égal au nombre total d'appareils sélectionnés
        .length === selectedAppliances.length;
}

// Algorithme de recherche spécifique à l'input de la listbox Ustensiles
function searchByUstensils(recipe) {
    return recipe.ustensils
        // Filtrer les ustensiles sélectionnés en fonction des ustensiles de la recette 
        .filter(ustensil => selectedUstensiles.includes(ustensil.toLowerCase()))
        // Vérifier si le nombre d'ustensiles filtrés est égal au nombre total d'ustensiles sélectionnés
        .length === selectedUstensiles.length;
}

// Méthode 1 - FILTER : Fonction effectuant une recherche globale sur les recettes en fonction des critères de recherche
function search() {
    // Filtrer les recettes en utilisant les fonctions de recherche spécifiques
    const filteredRecipes = recipes.filter((recipe) => {
        return searchByIngredients(recipe) &&
            searchByAppliances(recipe) &&
            searchByUstensils(recipe) &&
            searchByInput(recipe);
    });

    // Définir les données des listboxs en fonction des ingrédients, ustensiles et appareils des recettes filtrées
    selects[0].setData(getIngredientsFromRecipes(filteredRecipes))
    selects[1].setData(getAppliancesFromRecipes(filteredRecipes))
    selects[2].setData(getUstensilsFromRecipes(filteredRecipes))

    // Récupérer l'élément HTML représentant la section des cartes de recettes
    const recipeSection = document.getElementById('cards-container');

    // Vider le contenu précédent de la section des cartes de recettes
    recipeSection.innerHTML = '';

    // Si aucune recette n'a été trouvée, afficher un message
    if(filteredRecipes.length === 0){
        recipeSection.innerText = "Aucune recette n'a été trouvée"
        return
    }

    // Pour chaque recette filtrée, générer une carte de recette et l'ajouter à la section des cartes de recettes
    filteredRecipes.forEach((recipe) => {
        const recipeTemplate = recipeFactory(recipe);
        const recipeCardDOM = recipeTemplate.getRecipesCardDOM();
        recipeSection.appendChild(recipeCardDOM);
    });
}