// Classe générant les fonctionnalités de filtrage pour les listboxs
class Select {
    constructor(data, type, name, placeholder, className, onClickElement, onOpened) {
        // Initialisation des propriétés de l'objet
        this.data = data; // Données brutes
        this.filteredData = data; // Données filtrées (initialement identiques aux données brutes)
        this.type = type; // Type de la liste (par exemple, "ingredients", "appliances", ou "ustensils")
        this.name = name; // Nom de la liste (par exemple, "ingredient-list", "appliance-list", ou "ustensil-list")
        this.placeholder = placeholder; // Texte de l'élément de la liste servant de placeholder
        this.onClickElement = onClickElement; // Fonction de rappel à appeler lorsqu'un élément est cliqué dans la liste
        this.onOpened = onOpened; // Fonction de rappel à appeler lorsqu'une liste est ouverte (déroulée)
        this.isOpened = false; // Indicateur pour savoir si la liste est actuellement ouverte (déroulée) ou non
        this.className = className; // Classe CSS à appliquer à la liste pour le style
    }

    // Méthode créant la liste d'options déroulante des listboxs
    createListOptions() {
    // Création d'un élément <ul> pour contenir les options de la liste déroulante
    const elements = document.createElement('ul');
    elements.classList.add('listbox-options');

    // Itération sur les éléments filtrés pour créer les options de la liste
    this.filteredData.forEach(element => {
        // Création d'un élément <li> pour chaque élément de la liste
        const li = document.createElement('li');
        li.innerText = element;
        elements.appendChild(li);
        li.addEventListener('click', () => {
            // Appel de la fonction de rappel 'onClickElement' avec l'élément cliqué en tant qu'argument
            this.onClickElement(element);
        });
    });
    // Renvoi de l'élément <ul> contenant les options de la liste déroulante
    return elements;
}

    // Gestion de la fermeture de la liste d'options déroulante des listboxs
    close() {
        this.elements.style.display = "none";
        this.input.style.display = "none";
        this.spanName.style.display = 'block'
        this.chevron.classList.remove('opened')
        this.isOpened = false
    }

    // Gestion de l'ouverture de la liste d'options déroulante des listboxs
    open() {
        this.elements.style.display = "flex";
        this.input.style.display = "block";
        this.spanName.style.display = 'none'
        this.chevron.classList.add('opened')
        this.elements.classList.add('active')
        this.isOpened = true
    }

    // Mise à jour des données brutes et des données filtrées avec les nouvelles données fournies
    setData(data) {
        this.data = data;
        this.filteredData = data;
    
        // Création des éléments de la liste déroulante avec les nouvelles données
        this.elements = this.createListOptions();
        // Suppression des anciennes options de la liste déroulante
        const listboxOptions = document.querySelector(`.${this.className} .listbox-options`);
        listboxOptions.remove();
        // Ajout des nouvelles options de la liste déroulante au conteneur (divSelect)
        const divSelect = document.querySelector(`.${this.className} .listbox-div`);
        divSelect.appendChild(this.elements);
        // Si la liste déroulante était ouverte (déroulée) avant de mettre à jour les données, la réouvrir
        if (this.isOpened) {
            this.open();
        }
    }

    // Création du DOM Listbox
    render() {
        // Conteneur principal Listbox
        const divSelect = document.createElement('div')
        divSelect.classList.add('listbox-div')
        // Bouton Listbox
        const button = document.createElement('button')
        button.classList.add('listbox-button')
        button.setAttribute('aria-haspopup', 'listbox')
        button.setAttribute('aria-expanded', 'true')
        button.setAttribute('aria-selected', 'true')
        // Span affichant de nom de la Listbox
        this.spanName = document.createElement('span')
        this.spanName.innerText = this.name
        // Input de recherche 
        this.input = document.createElement('input')
        this.input.classList.add('listbox-input')
        this.input.setAttribute('placeholder', this.placeholder)
        // Div contenant le span (ingrédient/appareil/ustensile) et l'input de recherche
        const divButton = document.createElement('div')
        divButton.appendChild(this.spanName)
        divButton.appendChild(this.input)
        button.appendChild(divButton)
        // Icone d'ouverture/fermeture Listbox
        this.chevron = document.createElement('i')
        this.chevron.classList.add("fa", "fa-solid", "fa-chevron-down")
        button.appendChild(this.chevron)

        // Création des options de la liste déroulante 
        this.elements = this.createListOptions()

        // Fonction gérant le comportement d'ouverture et de fermeture de la liste déroulante d'options
        this.chevron.addEventListener('click', () => {
            if (this.isOpened) {
                this.close()
            } else {
                this.open()
            }
            this.onOpened()
        })

        // Fonction réagissant à la saisie de l'input de recherche en filtrant les options en fonction du texte saisi tout en mettant à jour la liste déroulante
        this.input.addEventListener('input', (e) => {
            this.filteredData = this.data.filter(elt => elt.includes(e.target.value.toLowerCase()))
            this.elements.remove()
            this.elements = this.createListOptions()
            divSelect.appendChild(this.elements)
            this.elements.style.display = "block";
        })
        // Ajout des éléments créés au conteneur principal
        divSelect.appendChild(button)
        divSelect.appendChild(this.elements)
        // Renvoi du conteneur principal Listbox
        return divSelect
    }
}

export default Select