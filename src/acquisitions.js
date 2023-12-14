
import Chart from 'chart.js/auto';

let results = json[2].data;

console.log(selectedSolver);



chartData = [];
// Traitement pour les solveurs
selectedSolver.forEach(solver => {
    const solverData = results.filter(row => solver.includes(row.name) && row.status === "SAT");
    const averageSolverTime = solverData.reduce((accumulator, row) => accumulator + parseFloat(row.time), 0) / solverData.length;

    chartData.push({
        label: `Temps moyen pour ${solver} (SAT)`,
        data: [averageSolverTime],
    });
});

// Traitement pour les familles
selectedFamily.forEach(family => {
    const familyData = results.filter(row => family.includes(row.family) && row.status === "SAT");
    const averageFamilyTime = familyData.reduce((accumulator, row) => accumulator + parseFloat(row.time), 0) / familyData.length;

    chartData.push({
        label: `Temps moyen pour ${family} (SAT)`,
        data: [averageFamilyTime],
    });
});

new Chart(
    document.getElementById('acquisitions'),
    {
        type: 'bar',
        data: {
            labels: [...selectedSolver, ...selectedFamily],
            datasets: chartData,
        }
    }
);