import Chart from 'chart.js/auto';


let currentSolver = 'choco';
const pourcentageh1 = document.querySelector('.pourcentage');


async function fetchData() {
  const url = "https://www.cril.univ-artois.fr/~lecoutre/teaching/jssae/code5/results.json";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }

    const data = await response.json();
    console.log(data[2].data);
    updateChart(data);

  } catch (error) {
    console.error('Error fetching or parsing JSON:', error.message);
  }
}


function updateChart(data) {
  const ctx = document.getElementById('canvaspourcentage');

  const filteredData = data[2].data.filter(item =>
    item.name.toLowerCase().startsWith(currentSolver)
  );

  const satCount = filteredData.filter(item => item.status === 'SAT').length;
  const unsatCount = filteredData.filter(item => item.status === 'UNSAT').length;
  const unknownCount = filteredData.filter(item => item.status === 'UNKNOWN').length;

  const totalCount = satCount + unsatCount + unknownCount;

  const satPercentage = (satCount / totalCount) * 100;
  const unsatPercentage = (unsatCount / totalCount) * 100;
  const unknownPercentage = (unknownCount / totalCount) * 100;

  Chart.getChart(ctx)?.destroy();

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['SAT', 'UNSAT', 'UNKNOWN'],
      datasets: [{
        data: [satPercentage, unsatPercentage, unknownPercentage],
        backgroundColor: ['#01CDFE', '#B967FF', '#FF71CE'],
        hoverOffset: 4
      }]
    }
  });



  pourcentageh1.textContent = "Pourcentage de statut " + currentSolver;
}

const ace = document.getElementById('ace');
const choco = document.getElementById('choco');
const picat = document.getElementById('picat');
const btd = document.getElementById('btd');
const cosoco = document.getElementById('cosoco');
const funscopcad = document.getElementById('funscopcad');
const funscopglue = document.getElementById('funscopglue');
const mistral = document.getElementById('mistral');
const sat4jcp = document.getElementById('sat4jcp');
const sat4jrs = document.getElementById('sat4jrs');


ace.addEventListener('click', function() {
  currentSolver = 'ace';
  fetchData(); 
});

choco.addEventListener('click', function() {
  currentSolver = 'choco';
  fetchData(); 
});

btd.addEventListener('click', function() {
  currentSolver = 'btd';
  fetchData(); 
});

picat.addEventListener('click', function() {
  currentSolver = 'picat';
  fetchData(); 
});

cosoco.addEventListener('click', function() {
  currentSolver = 'cosoco';
  fetchData(); 
});

funscopcad.addEventListener('click', function() {
  currentSolver = 'fun-scop-cad';
  fetchData();
});

funscopglue.addEventListener('click', function() {
  currentSolver = 'fun-scop-glue';
  fetchData(); // Rechargez le graphique avec les nouvelles données
});

mistral.addEventListener('click', function() {
  currentSolver = 'mistral';
  fetchData(); // Rechargez le graphique avec les nouvelles données
});


sat4jcp.addEventListener('click', function() {
  currentSolver = 'sat4j-cp';
  fetchData(); // Rechargez le graphique avec les nouvelles données
});

sat4jrs.addEventListener('click', function() {
  currentSolver = 'sat4j-rs';
  fetchData(); // Rechargez le graphique avec les nouvelles données
});

// Appeler la fonction fetchData pour récupérer les données et mettre à jour le graphique
fetchData();