# V1 PROYECTO AIDE

Script.js
```javascript
let chart;

// Añade un evento al formulario para recargar la página cuando se reinicia el formulario
document.getElementById('inputForm').addEventListener('reset', function(event) {
    window.location.reload();
});

// Añade un evento al formulario para gestionar el envío de datos
document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el envío por defecto del formulario

    // Obtiene el valor de la basura recolectada y lo convierte a número
    const basuraRecolectada = parseFloat(document.getElementById('basuraRecolectada').value);
    
    // Valida que el valor ingresado sea numérico
    if (isNaN(basuraRecolectada)) {
        alert('Por favor, introduce un valor numérico válido para la basura recolectada.');
        return;
    }

    // Obtiene los datos almacenados de recolección o crea un array vacío si no existen
    let recolectionData = JSON.parse(localStorage.getItem('recolectionData')) || [];

    // Calcula el total de basura recolectada hasta el momento
    const totalBasuraRecolectada = recolectionData.reduce((total, data) => total + data.basuraRecolectada, 0);

    // Verifica si la cantidad ingresada excede el 100% permitido
    if (totalBasuraRecolectada + basuraRecolectada > 100) {
        alert(`Ya hemos cubierto un ${totalBasuraRecolectada}% del 100%. Ingresa una cantidad <= ${100 - totalBasuraRecolectada}%.`);
        return;
    }

    // Calcula el área recuperada basándose en la hipótesis de que el 90% del área se recupera cuando se recolecta el 100% de la basura
    const areaRecuperada = (totalBasuraRecolectada + basuraRecolectada) * 0.9;

    // Crea un nuevo registro de datos de recolección
    const newData = { day: recolectionData.length + 1, basuraRecolectada, areaRecuperada };
    
    // Añade el nuevo registro a los datos existentes
    recolectionData.push(newData);

    // Guarda los datos actualizados en localStorage
    localStorage.setItem('recolectionData', JSON.stringify(recolectionData));
    localStorage.setItem('chartType', document.getElementById('chartType').value);

    // Carga y muestra los datos actualizados
    loadAndDisplayData();
});

// Añade un evento al botón para limpiar los datos almacenados
document.getElementById('clearButton').addEventListener('click', function() {
    localStorage.removeItem('recolectionData'); // Elimina los datos de recolección almacenados
    localStorage.removeItem('chartType'); // Elimina el tipo de gráfico almacenado
    window.location.reload(); // Recarga la página
});

// Función que se ejecuta cuando la página se carga
window.onload = function() {
    loadAndDisplayData(); // Carga y muestra los datos al iniciar
};

// Añade un evento al tipo de gráfico para actualizar los datos cuando se cambia el tipo
document.getElementById('chartType').addEventListener('change', () => {
    localStorage.setItem('chartType', document.getElementById('chartType').value); // Guarda el nuevo tipo de gráfico
    loadAndDisplayData(); // Carga y muestra los datos con el nuevo tipo de gráfico
});

// Función para cargar y mostrar los datos almacenados
function loadAndDisplayData() {
    const recolectionData = JSON.parse(localStorage.getItem('recolectionData')) || []; // Obtiene los datos de recolección almacenados
    const chartType = localStorage.getItem('chartType') || 'bar'; // Obtiene el tipo de gráfico almacenado o usa 'bar' por defecto

    if (recolectionData.length > 0) {
        document.getElementById('basuraRecolectada').value = ''; // Limpia el campo de entrada de basura recolectada
        generateChart(chartType, recolectionData); // Genera el gráfico con los datos actuales
    }
}

// Función para generar y mostrar el gráfico
function generateChart(chartType, recolectionData) {
    const ctx = document.getElementById('chartCanvas').getContext('2d'); // Obtiene el contexto del lienzo del gráfico

    // Prepara los datos para la gráfica
    const labels = recolectionData.map(data => `Día ${data.day}`); // Etiquetas de los días
    const basuraRecolectadaData = recolectionData.map(data => data.basuraRecolectada); // Datos de basura recolectada
    const areaRecuperadaData = recolectionData.map(data => data.areaRecuperada); // Datos de área recuperada

    // Calcula el total de basura recolectada y área recuperada
    const totalBasuraRecolectada = basuraRecolectadaData.reduce((total, value) => total + value, 0);
    const totalAreaRecuperada = areaRecuperadaData[areaRecuperadaData.length - 1] || 0;

    // Destruye el gráfico anterior si existe
    if (chart) {
        chart.destroy();
    }
    chartType=='line' ? chartType= 'line' : '';

    // Crea un nuevo gráfico con los datos preparados
    chart = new Chart(ctx, {
        type: chartType, // Tipo de gráfico
        data: {
            labels: labels, // Etiquetas
            datasets: [
                {
                    label: 'Basura Recolectada (%)',
                    data: basuraRecolectadaData,
                    backgroundColor: '#0f0' // Color de la basura recolectada
                },
                {
                    label: 'Área Recuperada (%)',
                    data: areaRecuperadaData,
                    backgroundColor: '#03e4f4' // Color del área recuperada
                }
            ]
        },
        options: {
            responsive: true, // Ajuste de responsividad
            maintainAspectRatio: false, // Mantener la relación de aspecto
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Días' // Título del eje X
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Porcentaje' // Título del eje Y
                    },
                    beginAtZero: true, // Comenzar el eje Y desde cero
                    max: 100 // Valor máximo del eje Y
                }
            }
        }
    });
}
```

Index.html
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proyecto de Reciclaje</title>
    <meta name="title" content="Proyecto de Reciclaje" />
    <meta name="description" content="Iniciativa de reciclaje que muestra datos sobre la recolección de basura y la recuperación de áreas. Contribuye a un medio ambiente más limpio y sostenible." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.tusitiodeproyecto.com" />
    <meta property="og:title" content="Proyecto de Reciclaje" />
    <meta property="og:description" content="Iniciativa de reciclaje que muestra datos sobre la recolección de basura y la recuperación de áreas. Contribuye a un medio ambiente más limpio y sostenible." />
    <meta property="og:image" content="https://www.tusitiodeproyecto.com/images/proyecto-reciclaje.png" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://www.tusitiodeproyecto.com" />
    <meta property="twitter:title" content="Proyecto de Reciclaje" />
    <meta property="twitter:description" content="Iniciativa de reciclaje que muestra datos sobre la recolección de basura y la recuperación de áreas. Contribuye a un medio ambiente más limpio y sostenible." />
    <meta property="twitter:image" content="https://www.tusitiodeproyecto.com/images/proyecto-reciclaje.png" />
    <link rel="stylesheet" href="styles.css">
    <script src="dependencia.js"></script>
</head>    
<body>
    <form id="inputForm">
        <label for="basuraRecolectada">Cantidad de Basura Recolectada (%):</label>
        <input type="text" id="basuraRecolectada" name="basuraRecolectada" required>
        <br>
        <label for="areaRecuperada">Porcentaje de Área Recuperada (%):</label>
        <input type="text" id="areaRecuperada" name="areaRecuperada" required>
        <br>
        
        <label for="chartType">Selecciona el tipo de gráfica:</label>
        <select id="chartType" name="chartType">
            <option value="doughnut">Circular</option>
            <option value="bar">Barras</option>
            <option value="polarArea">Polar Area</option>
        </select>
        <br>
        <button type="submit">Guardar Datos</button>
        <button type="reset">Reiniciar</button>
        <button type="button" id="clearButton">Eliminar Datos</button>
    </form>
    <div id="chartContainer" style="width: 80%; margin: 0 auto;">
        <canvas id="chartCanvas"></canvas>
    </div>
    <script src="script.js"></script>
</body>
</html>
```
styles.css
```css
body {
    font-family: 'Roboto', sans-serif; 
    margin: 0; 
    padding: 0; 
    color: #fff; 
    font-size: 1em;
    /* ! Fondo */
    width: 100%;
    height: 100%;
    --s: 200px; /* control the size */
    --c1: #1d1d1d;
    --c2: #4e4f51;
    --c3: #3c3c3c;

    background: repeating-conic-gradient(
            from 30deg,
            #0000 0 120deg,
            var(--c3) 0 180deg
        )
        calc(0.5 * var(--s)) calc(0.5 * var(--s) * 0.577),
        repeating-conic-gradient(
            from 30deg,
            var(--c1) 0 60deg,
            var(--c2) 0 120deg,
            var(--c3) 0 180deg
        );
    background-size: var(--s) calc(var(--s) * 0.577);  
}

h1 {
    text-align: center; 
    margin-top: 50px; 
}

form {
    margin-bottom: 20px;
    text-align: center; 
}

label {
    margin-right: 10px;
}

input[type="text"],
input[type="number"] {
    padding: 8px 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
    border-radius: 5px;
    border: none;
    background-color: #333; 
    color: #fff; 
}

input[type="text"]:focus,
input[type="number"]:focus {
    outline: none;
    box-shadow: 0 0 15px rgb(255, 255, 255); 
}

button[type="submit"],
button[type="reset"],
button[type="button"] {
    
    padding: 8px 20px;
    margin-top: 10px;
    border: none;
    text-decoration: none;
    overflow: hidden;
    border-radius: 5px;
    background-color: #4c93af; 
    color: #fff; 
    cursor: pointer;
    transition: .5s;
    animation: btn-anim1 2s linear infinite;
    transition: background-color 0.3s ease; 
}

button[type="submit"]:hover,
button[type="reset"]:hover {
    background: #03e4f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e4f4, 0 0 25px #03e4f4, 0 0 50px #03e4f4, 0 0 100px #03e4f4; 
}

#chartContainer {
    /* !Animacion */
    --sp: 5s; /*** speed ***/
    animation: colors var(--sp) linear 0s infinite;
    /* ----------! */
    width: 80%;
    height: 50%;
    position: absolute;
    left: 10%;
    border: 1px solid #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); 
}

.formula {
    width: 20%;
    position: absolute;
    bottom: 100px;
    left: 40%;

}

@keyframes btn-anim1 {
    0% {
        left: -100%;
    }

    50%, 100% {
        left: 100%;
    }
}
@keyframes colors {
    100% {
        filter: hue-rotate(360deg);
    }
}
```


# V2
script.js
```javascript
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
```
index.html
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proyecto de Reciclaje</title>
    <meta name="title" content="Proyecto de Reciclaje" />
    <meta name="description" content="Iniciativa de reciclaje que muestra datos sobre la recolección de basura y la recuperación de áreas. Contribuye a un medio ambiente más limpio y sostenible." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://uknownbyanxer.github.io/Recycle-Aide" />
    <meta property="og:title" content="Proyecto de Reciclaje" />
    <meta property="og:description" content="Iniciativa de reciclaje que muestra datos sobre la recolección de basura y la recuperación de áreas. Contribuye a un medio ambiente más limpio y sostenible." />
    <meta property="og:image" content="https://uknownbyanxer.github.io/Recycle-Aide/images/proyecto-reciclaje.png" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://uknownbyanxer.github.io/Recycle-Aide" />
    <meta property="twitter:title" content="Proyecto de Reciclaje" />
    <meta property="twitter:description" content="Iniciativa de reciclaje que muestra datos sobre la recolección de basura y la recuperación de áreas. Contribuye a un medio ambiente más limpio y sostenible." />
    <meta property="twitter:image" content="https://uknownbyanxer.github.io/Recycle-Aide/images/proyecto-reciclaje.png" />
    <link rel="stylesheet" href="styles.css">
    
    <script src="dependencia.js"></script>
</head>    
<body class="container">
    <label for="chartType">Selecciona el tipo de gráfica:</label>
    <select id="chartType" name="chartType">
        <option value="line">Linear</option>
        <option value="polarArea">Polar Area</option>
        <option value="doughnut">Circular</option>
        <option value="pie">Pastel</option>
        <option value="bar">Barras</option>
    </select>
    <button type="button" id="clearButton">Eliminar cookies</button>
    <div class="chartContainer" id="chartContainer" style="width: 80%; margin: 0 auto;">
        <canvas id="chartCanvas"></canvas>
    </div>
    <script src="script.js"></script>
</body>
</html>
```
styles.css
```css
body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 1em;
    /* ! Fondo */
    --bg: radial-gradient(#333 5%, #0000 6%);
    --size: 3rem;
    width: 100%;
    height: 100%;
    background-color: #1a1a1a;
    background-image: radial-gradient(#333 5%, #0000 6%),
                      radial-gradient(#333 5%, #0000 6%);
    background-position: 0 0, calc(var(--size) / 2) calc(var(--size) / 2);
    background-size: var(--size) var(--size);
}

h1 {
    text-align: center;
    margin-top: 50px;
}

#chartContainer {
    width: 80%;
    background-color: #222;
    height: 50%;
    position: absolute;
    left: 10%;
    border: 1px solid #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.formula {
    width: 20%;
    position: absolute;
    bottom: 100px;
    left: 40%;
}

@keyframes btn-anim1 {
    0% {
        left: -100%;
    }

    50%, 100% {
        left: 100%;
    }
}

@keyframes colors {
    100% {
        filter: hue-rotate(360deg);
    }
}

/* Estilos y animaciones para select y options */
select {
    appearance: none;
    background-color: #444;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 5px;
    padding: 10px;
    font-size: 1em;
    outline: none;
    transition: background-color 0.3s ease, border-color 0.3s ease;
    cursor: pointer;
    width: 200px;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
}

select:hover {
    background-color: #555;
    border-color: #03e4f4;
}

select:focus {
    border-color: #0f0;
}

select:active {
    background-color: #222;
    border-color: #0f0;
    transform: scale(0.95);
}

option {
    background-color: #444;
    color: #fff;
}

/* Estilos y animaciones para button */
button {
    background-color: #333;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
    margin: 20px;
}

button:hover {
    background-color: #555;
    border-color: #03e4f4;
    transform: scale(1.05);
}

button:active {
    background-color: #222;
    border-color: #0f0;
    transform: scale(0.95);
}

/* !Animación
top: 10%;
--sp: 1s; // speed
animation: colors var(--sp) linear 0s infinite;
----------! */
```

### Documentación de las diferencias entre la V1 y la V2 del programa

#### **Versión 1 (V1)**

**1. Estructura del archivo `script.js`:**
   - Utiliza eventos de formularios para recargar la página y gestionar el envío de datos.
   - Almacena y manipula datos de recolección de basura en `localStorage`.
   - Calcula el porcentaje de basura recolectada y el área recuperada.
   - Genera gráficos utilizando `Chart.js` basándose en los datos de recolección.

**2. Estructura del archivo `styles.css`:**
   - Define estilos para el cuerpo, formularios, inputs y botones.
   - Aplica animaciones a elementos específicos.
   - Utiliza colores y gradientes para el fondo.

**3. Estructura del archivo `index.html`:**
   - Incluye un formulario para la entrada de datos de recolección.
   - Permite seleccionar el tipo de gráfico a visualizar.
   - Botones para guardar, reiniciar y eliminar datos.
   - Contenedor para el gráfico generado.

#### **Versión 2 (V2)**

**1. Estructura del archivo `script.js`:**
   - Se eliminó el formulario para la entrada de datos.
   - Datos de limpieza están predefinidos en el código.
   - Soporte para múltiples tipos de gráficos (`line`, `bar`, `polarArea`, `doughnut`, `pie`).
   - Diferentes configuraciones para los gráficos dependiendo del tipo seleccionado.
   - Datos de porcentajes y áreas se muestran de manera consistente en todos los tipos de gráficos.
   - Eventos para cambiar el tipo de gráfico y limpiar los datos almacenados.

**2. Estructura del archivo `styles.css`:**
   - Estilos para el cuerpo, selectores y botones.
   - Se mantienen las animaciones, pero con ajustes para una mejor integración.
   - Colores y estilos consistentes con el nuevo diseño del gráfico.

**3. Estructura del archivo `index.html`:**
   - Simplificación de la estructura del HTML.
   - Eliminación del formulario y entrada de datos manual.
   - Agregado de una opción para el gráfico de tipo `pie`.
   - Contenedor del gráfico más limpio y directo, con el selector de tipo de gráfico y botón para eliminar cookies.

### Diferencias Principales

**1. Entrada y Almacenamiento de Datos:**
   - **V1:** Utiliza un formulario para la entrada manual de datos y los almacena en `localStorage`.
   - **V2:** Los datos están predefinidos en el código, eliminando la necesidad de entrada manual y almacenamiento en `localStorage`.

**2. Tipos de Gráficos:**
   - **V1:** Soporta gráficos de tipo `line`, `bar`, `polarArea`, y `doughnut`.
   - **V2:** Añade soporte para gráficos de tipo `pie` y asegura que todos los tipos de gráficos muestren los mismos datos de manera coherente.

**3. Visualización y Configuración del Gráfico:**
   - **V1:** Datos y configuración del gráfico están más enfocados en el manejo dinámico basado en la entrada del usuario.
   - **V2:** Configuración del gráfico es más estática, con un enfoque en la visualización clara y coherente de los datos predefinidos.

**4. Estilos y Diseño:**
   - **V1:** Contiene más elementos de interfaz de usuario (formulario, botones, inputs).
   - **V2:** Diseño simplificado con un enfoque en la selección del tipo de gráfico y la visualización del gráfico mismo.

### Conclusión

La versión 2 del programa representa una simplificación y mejora en la visualización de los datos de limpieza. Al eliminar la entrada manual de datos y trabajar con datos predefinidos, se facilita la consistencia en la visualización de los datos a través de diferentes tipos de gráficos. La adición de un gráfico de tipo `pie` y la mejora en la consistencia de la visualización aseguran que los usuarios obtengan una experiencia clara y coherente.
