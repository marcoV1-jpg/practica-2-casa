// conectar canvas con html
var lienzo = document.getElementById("milienzo");

// dibujar en 2d
var pincel = lienzo.getContext("2d");

// centro de la casa (punto blanco) 
// La casa está en el centro del canvas (150, 150)
var casaX = 150;
var casaY = 150;

// Radio máximo que puede orbitar el sol alrededor de la casa
var radioOrbita = 90;

// funcion principal
function dibujar(mouseX, mouseY) {
    // Limpiar el lienzo
    pincel.clearRect(0, 0, lienzo.width, lienzo.height);

    // Fondo del canvas (cielo)
    pincel.fillStyle = "#87CEEB"; // Azul cielo
    pincel.fillRect(0, 0, lienzo.width, lienzo.height);

    // CASA

    // Paredes de la casa
    pincel.fillStyle = "white";
    pincel.fillRect(100, 150, 200, 150);
    // Contorno de la casa
    pincel.strokeStyle = "black";
    pincel.lineWidth = 4;
    pincel.strokeRect(100, 150, 200, 150);

    // techo triangular
    pincel.beginPath();
    pincel.moveTo(100, 150);   // Esquina izquierda
    pincel.lineTo(200, 70);    // Punto superior (cumbre)
    pincel.lineTo(300, 150);   // Esquina derecha
    pincel.closePath();
    // Color del techo
    pincel.fillStyle = "brown";
    pincel.fill();
    // Contorno del techo
    pincel.strokeStyle = "black";
    pincel.lineWidth = 4;
    pincel.stroke();

    // puerta
    pincel.fillStyle = "brown";
    pincel.fillRect(175, 220, 50, 80);
    pincel.strokeStyle = "black";
    pincel.lineWidth = 3;
    pincel.strokeRect(175, 220, 50, 80);

    //     SOL QUE SIGUE AL MOUSE (como el ojo)

    // Calcular el ángulo entre la casa (centro) y el mouse
    var angulo = Math.atan2(mouseY - casaY, mouseX - casaX);

    // Calcular la distancia del mouse al centro (limitada al radio de órbita)
    var distanciaAlMouse = Math.sqrt(
        Math.pow(mouseX - casaX, 2) + Math.pow(mouseY - casaY, 2)
    );
    var distancia = Math.min(distanciaAlMouse, radioOrbita);

    // Nueva posición del sol
    var solX = casaX + Math.cos(angulo) * distancia;
    var solY = casaY + Math.sin(angulo) * distancia;

    // sol dibujado

    // Círculo principal del sol
    pincel.beginPath();
    pincel.arc(solX, solY, 22, 0, Math.PI * 2);
    pincel.fillStyle = "yellow";
    pincel.fill();

    // Contorno del sol
    pincel.strokeStyle = "black";
    pincel.lineWidth = 3;
    pincel.stroke();
}


// interaccion y eventos
lienzo.onmousemove = function(evento) {
    // Ajuste de coordenadas (para que coincidan con el canvas)
    var rect = lienzo.getBoundingClientRect();
    var mouseX = (evento.clientX - rect.left) * (lienzo.width / rect.width);
    var mouseY = (evento.clientY - rect.top) * (lienzo.height / rect.height);

    // Redibujar con las nuevas posiciones
    dibujar(mouseX, mouseY);
};

// ===== ACTIVAR AL CARGAR LA PÁGINA =====
dibujar(150, 100);