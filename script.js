let chart;
document.getElementById('inputForm').addEventListener('reset', function(event) {
    window.location.reload();
});
document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const basuraRecolectada = parseFloat(document.getElementById('basuraRecolectada').value);
    if (isNaN(basuraRecolectada)) {
        alert('Por favor, introduce un valor numérico válido para la basura recolectada.');
        return;
    }
    let recolectionData = JSON.parse(localStorage.getItem('recolectionData')) || [];
    const totalBasuraRecolectada = recolectionData.reduce((total, data) => total + data.basuraRecolectada, 0);
    if (totalBasuraRecolectada + basuraRecolectada > 100) {
        alert(`Ya hemos cubierto un ${totalBasuraRecolectada}% del 100% ingresa una cantidad <=${100-totalBasuraRecolectada}%`);
        return;
    }
    const newData = { day: recolectionData.length + 1, basuraRecolectada, areaRecuperada: totalBasuraRecolectada + basuraRecolectada };
    recolectionData.push(newData);
    localStorage.setItem('recolectionData', JSON.stringify(recolectionData));
    localStorage.setItem('chartType', document.getElementById('chartType').value);

    loadAndDisplayData();
});

document.getElementById('clearButton').addEventListener('click', function() {
    localStorage.removeItem('recolectionData');
    localStorage.removeItem('chartType');
    window.location.reload();
});

window.onload = function() {
    loadAndDisplayData();
};

document.getElementById('chartType').addEventListener('change', () => {
    localStorage.setItem('chartType', document.getElementById('chartType').value);
    loadAndDisplayData();
});

function loadAndDisplayData() {
    const recolectionData = JSON.parse(localStorage.getItem('recolectionData')) || [];
    const chartType = localStorage.getItem('chartType') || 'bar';
    if (recolectionData.length > 0) {
        document.getElementById('basuraRecolectada').value = '';
        generateChart(chartType, recolectionData);
    }
}

function generateChart(chartType, recolectionData) {
    const ctx = document.getElementById('chartCanvas').getContext('2d');

    // Preparar los datos para la gráfica
    const labels = recolectionData.map(data => `Día ${data.day}`);
    const basuraRecolectadaData = recolectionData.map(data => data.basuraRecolectada);
    const areaRecuperadaData = recolectionData.map(data => data.areaRecuperada);

    // Calcular el total de basura recolectada y área recuperada
    const totalBasuraRecolectada = basuraRecolectadaData.reduce((total, value) => total + value, 0);
    const totalAreaRecuperada = areaRecuperadaData[areaRecuperadaData.length - 1] || 0;
    const basuraNoRecolectada = 100 - totalBasuraRecolectada;
    const areaNoRecuperada = 100 - totalAreaRecuperada;

    // Destruir el gráfico anterior si existe
    if (chart) {
        chart.destroy();
    }

    // Crear un nuevo gráfico
    chart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Basura Recolectada (%)',
                    data: basuraRecolectadaData,
                    backgroundColor: '#0f0'
                },
                {
                    label: 'Área Recuperada (%)',
                    data: areaRecuperadaData,
                    backgroundColor: '#03e4f4'
                },
                {
                    label: 'Basura No Recolectada (%)',
                    data: new Array(basuraRecolectadaData.length).fill(basuraNoRecolectada),
                    backgroundColor: '#f00'
                },
                {
                    label: 'Área No Recuperada (%)',
                    data: new Array(areaRecuperadaData.length).fill(areaNoRecuperada),
                    backgroundColor: '#f80'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Días'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Porcentaje'
                    },
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}
