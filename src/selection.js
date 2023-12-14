
let select = document.querySelector("#selection");
let chips = document.querySelector(".chips");

let selectedFamily = [];
let selectedSolver = [];


createchip = (value, type) => {
    let chip = document.createElement("div");
    chip.innerHTML = `<input type="checkbox" value="${value}" id="${value}" class="${type}"> <label for="${value}" class="chip"> ${value}</label>`;
    chip.querySelector('input').addEventListener('change', function() {
        if (this.checked) {
            if (type == 'family') {
                selectedFamily.push(this.value);
            } else {
                selectedSolver.push(this.value);
            }
        } else {
            if (type == 'family') {
                selectedFamily = selectedFamily.filter(item => item !== this.value);
            } else {
                selectedSolver = selectedSolver.filter(item => item !== this.value);
            }
        }
        console.log('selectedFamily', selectedFamily);
        console.log('selectedSolver', selectedSolver);
    });
    return chip;
}

displayChips = (option, families, solvers) => {
    // vider chips
    chips.innerHTML = ""

    // si famille
    if (option == "family") {
        // afficher chips pour famille
        families.forEach(family => {
            let chip = createchip(family, 'family');
            chips.appendChild(chip);
        });
    }

    // si solveur
    if (option == "solver") {
        solvers.forEach(solver => {
            let chip = createchip(solver, 'solver');
            chips.appendChild(chip);
        });
    }
}

// Ajouter un gestionnaire d'événements pour détecter les changements
select.addEventListener('change', function() {
    let option = this.value;
    // Si option est undefined, définir sur "family" par défaut
    if (!option) {
        option = "family";
    }
    console.log(option);

    console.log(json);
    let data = json[2].data;

    // recup toutes les familles
    let families = new Set(data.map(item => item.family));
    families = Array.from(families);
    console.log(families);

    // recup les solveurs
    let solvers = new Set(data.map(item => item.name));
    solvers = Array.from(solvers);
    console.log(solvers);

    displayChips(option, families, solvers);
});

window.addEventListener('load', function() {
    let option = select.value;
    // Si option est undefined, définir sur "family" par défaut
    if (!option) {
        option = "family";
    }
    console.log(json);
    let data = json[2].data;

    // recup toutes les familles
    let families = new Set(data.map(item => item.family));
    families = Array.from(families);
    console.log(families);

    // recup les solveurs
    let solvers = new Set(data.map(item => item.name));
    solvers = Array.from(solvers);
    console.log(solvers);

    displayChips(option, families, solvers);
});

let checkboxes = document.querySelectorAll('input[type=checkbox]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        fetch('path/to/aquisitions.js')
        .then(response => response.text())
        .then(text => eval(text))
        .catch(err => console.error(err));
        console.log('hello');
    });
});