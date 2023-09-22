// Obtenemos el elemento canvas del DOM y su contexto de dibujo 2D.
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// Variables para controlar el modo automático.
let autoMode = false;  // Indica si el modo automático está activo.
let autoModeInterval;  // Almacena el identificador del intervalo del modo automático.

/**
 * Dibuja un triángulo en el canvas.
 * @param {number} x1 - Coordenada x del primer vértice.
 * @param {number} y1 - Coordenada y del primer vértice.
 * @param {number} x2 - Coordenada x del segundo vértice.
 * @param {number} y2 - Coordenada y del segundo vértice.
 * @param {number} x3 - Coordenada x del tercer vértice.
 * @param {number} y3 - Coordenada y del tercer vértice.
 */
const drawTriangle = (x1, y1, x2, y2, x3, y3) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.stroke();
}

/**
 * Dibuja el triángulo de Sierpinski en el canvas.
 */
const draw = () => {
    // Obtiene el número de iteraciones del campo de entrada.
    let iterations = parseInt(document.getElementById('iterations').value);

    // Limpia el canvas para un nuevo dibujo.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Lista inicial de triángulos (solo el triángulo grande).
    let triangles = [[0, 600, 300, 0, 600, 600]];

    // Itera para cada nivel de detalle.
    for (let i = 0; i < iterations; i++) {
        let newTriangles = [];

        // Divide cada triángulo en 3 triángulos más pequeños.
        triangles.forEach(triangle => {
            let [x1, y1, x2, y2, x3, y3] = triangle;

            // Calcula los puntos medios de los lados del triángulo.
            let midx1 = (x1 + x2) / 2;
            let midy1 = (y1 + y2) / 2;
            let midx2 = (x2 + x3) / 2;
            let midy2 = (y2 + y3) / 2;
            let midx3 = (x1 + x3) / 2;
            let midy3 = (y1 + y3) / 2;

            // Agrega los nuevos triángulos a la lista.
            newTriangles.push([x1, y1, midx1, midy1, midx3, midy3]);
            newTriangles.push([x2, y2, midx1, midy1, midx2, midy2]);
            newTriangles.push([x3, y3, midx2, midy2, midx3, midy3]);
        });

        triangles = newTriangles;
    }

    // Dibuja todos los triángulos en la lista.
    triangles.forEach(triangle => {
        drawTriangle(...triangle);
    });
}

/**
 * Activa o desactiva el modo automático.
 */
const toggleAutoMode = () => {
    if (autoMode) {
        // Si el modo automático está activo, lo detiene.
        clearInterval(autoModeInterval);
    } else {
        // Si no está activo, lo inicia.
        autoModeInterval = setInterval(() => {
            let iterationsInput = document.getElementById('iterations');
            let iterations = parseInt(iterationsInput.value);
            if (iterations === 10) {
                iterationsInput.value = 0;
                draw();
            }
            if (iterations < 10) {
                iterations++;
                iterationsInput.value = iterations;
                draw();
            }
        }, 1000);
    }
    // Cambia el estado del modo automático.
    autoMode = !autoMode;
}

/**
 * Limpia el canvas y reinicia el número de iteraciones.
 */
const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('iterations').value = 0;
    if (autoMode) {
        toggleAutoMode();
    }
    draw();
};

// Dibuja el fractal inicial al cargar la página.
draw();
