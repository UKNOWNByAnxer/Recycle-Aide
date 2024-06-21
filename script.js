let chart;

// Datos de limpieza por días
const limpiezaData = [
    {
        day: "Lunes",
        total: { porcentaje: 6, area: 21.5 },
        detalles: [
            { nombre: "Tania", porcentaje: 1.6, area: 5.7 },
            { nombre: "Laila", porcentaje: 2.1, area: 7.5 },
            { nombre: "Sam", porcentaje: 1.0, area: 3.6 },
            { nombre: "Lesly", porcentaje: 1.3, area: 4.7 }
        ]
    },
    {
        day: "Martes",
        total: { porcentaje: 9, area: 32.25 },
        detalles: [
            { nombre: "Tania", porcentaje: 1.7, area: 6.1 },
            { nombre: "Laila", porcentaje: 2.8, area: 10 },
            { nombre: "Sam", porcentaje: 2.5, area: 9 },
            { nombre: "Lesly", porcentaje: 2.0, area: 7.2 }
        ]
    },
    {
        day: "Miércoles",
        total: { porcentaje: 17, area: 60.91 },
        detalles: [
            { nombre: "Tania", porcentaje: 3.2, area: 11.5 },
            { nombre: "Laila", porcentaje: 3.9, area: 14 },
            { nombre: "Sam", porcentaje: 5.1, area: 18.3 },
            { nombre: "Lesly", porcentaje: 4.8, area: 17.2 }
        ]
    },
    {
        day: "Jueves",
        total: { porcentaje: 14, area: 50.16 },
        detalles: [
            { nombre: "Tania", porcentaje: 3.2, area: 11.5 },
            { nombre: "Laila", porcentaje: 3.7, area: 13.3 },
            { nombre: "Sam", porcentaje: 2.2, area: 7.9 },
            { nombre: "Lesly", porcentaje: 4.9, area: 17.5 }
        ]
    },
    { day: "Viernes", total: { porcentaje: 0, area: 0 }, detalles: [] },
    {
        day: "Sábado",
        total: { porcentaje: 54, area: 193.5 },
        detalles: [
            { nombre: "Presidencia", porcentaje: 39, area: 139.75 },
            { nombre: "Tania, Laila, Sam y Lesly", porcentaje: 15, area: 53.75 }
        ]
    }
];

// Función que se ejecuta cuando la página se carga
window.onload = function() {
    loadAndDisplayData(); // Carga y muestra los datos al iniciar
};

// Función para cargar y mostrar los datos almacenados
function loadAndDisplayData() {
    const chartType = localStorage.getItem('chartType') || 'line'; // Obtiene el tipo de gráfico almacenado o usa 'line' por defecto

    if (limpiezaData.length > 0) {
        generateChart(chartType, limpiezaData); // Genera el gráfico con los datos actuales
    }
}

// Función para generar y mostrar el gráfico
function generateChart(chartType, limpiezaData) {
    const ctx = document.getElementById('chartCanvas').getContext('2d'); // Obtiene el contexto del lienzo del gráfico

    // Prepara los datos para la gráfica
    const labels = limpiezaData.map(data => data.day); // Etiquetas de los días

    // Crear datasets para cada persona
    const datasets = [];

    // Colores para cada persona
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

    // Nombres de las personas (aseguramos que no se repiten)
    const nombres = [...new Set(limpiezaData.flatMap(data => data.detalles.map(detalle => detalle.nombre)))];

    if (chartType === 'line' || chartType === 'bar') {
        nombres.forEach((nombre, index) => {
            const color = colors[index % colors.length];
            const porcentajeData = limpiezaData.map(data => {
                const detalle = data.detalles.find(detalle => detalle.nombre === nombre);
                return detalle ? detalle.porcentaje : 0;
            });
            const areaData = limpiezaData.map(data => {
                const detalle = data.detalles.find(detalle => detalle.nombre === nombre);
                return detalle ? detalle.area : 0;
            });

            datasets.push({
                label: `${nombre} - Porcentaje (%)`,
                data: porcentajeData,
                backgroundColor: chartType === 'line' ? `${color}55` : color,
                borderColor: color,
                fill: chartType === 'line' ? false : true // Ajusta el relleno basado en el tipo de gráfico
            });

            datasets.push({
                label: `${nombre} - Área (m2)`,
                data: areaData,
                backgroundColor: chartType === 'line' ? `${color}AA` : color,
                borderColor: color,
                fill: chartType === 'line' ? false : true // Ajusta el relleno basado en el tipo de gráfico
            });
        });
    } else {
        const totalPorcentajes = limpiezaData.map(data => data.total.porcentaje);
        const totalAreas = limpiezaData.map(data => data.total.area);
        
        datasets.push({
            label: 'Porcentaje Total (%)',
            data: totalPorcentajes,
            backgroundColor: colors,
            borderColor: '#fff',
            borderWidth: 1
        });

        datasets.push({
            label: 'Área Total (m2)',
            data: totalAreas,
            backgroundColor: colors,
            borderColor: '#fff',
            borderWidth: 1
        });
    }

    // Destruye el gráfico anterior si existe
    if (chart) {
        chart.destroy();
    }

    // Crea un nuevo gráfico con los datos preparados
    chart = new Chart(ctx, {
        type: chartType, // Tipo de gráfico
        data: {
            labels: labels, // Etiquetas
            datasets: datasets // Conjuntos de datos
        },
        options: {
            responsive: true, // Ajuste de responsividad
            maintainAspectRatio: false, // Mantener la relación de aspecto
            scales: chartType !== 'polarArea' && chartType !== 'doughnut' && chartType !== 'pie' ? {
                x: {
                    title: {
                        display: true,
                        text: 'Días' // Título del eje X
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Valores' // Título del eje Y
                    },
                    beginAtZero: true // Comenzar el eje Y desde cero
                }
            } : {} // No usar escalas para polarArea, doughnut y pie
        }
    });
}

// Añade un evento al tipo de gráfico para actualizar los datos cuando se cambia el tipo
document.getElementById('chartType').addEventListener('change', () => {
    localStorage.setItem('chartType', document.getElementById('chartType').value); // Guarda el nuevo tipo de gráfico
    loadAndDisplayData(); // Carga y muestra los datos con el nuevo tipo de gráfico
});

// Añade un evento al botón para limpiar los datos almacenados
document.getElementById('clearButton').addEventListener('click', function() {
    localStorage.removeItem('chartType'); // Elimina el tipo de gráfico almacenado
    window.location.reload(); // Recarga la página
});
