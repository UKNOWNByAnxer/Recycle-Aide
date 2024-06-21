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
