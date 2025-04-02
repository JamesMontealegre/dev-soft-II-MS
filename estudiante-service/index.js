// Importa Express (framework web para Node.js)
const express = require("express");
// Importa Axios para hacer peticiones HTTP a otros servicios
const axios = require("axios");
// Importa el módulo de sistema de archivos para leer/escribir archivos
const fs = require("fs");

// Inicializa la aplicación Express
const app = express();

// Middleware para permitir el uso de JSON en las peticiones
app.use(express.json());

// Nombre del archivo que actúa como base de datos
const DB_FILE = "estudiantes.json";

// Función para leer la base de datos (convierte el contenido JSON a un arreglo JS)
function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

// Función para escribir datos en la base de datos (sobrescribe el archivo)
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Ruta para crear un nuevo estudiante
app.post("/estudiantes", (req, res) => {
  const db = readDB(); // Lee los estudiantes actuales
  db.push(req.body); // Agrega el nuevo estudiante
  writeDB(db); // Guarda la lista actualizada
  res.status(201).send({ message: "Estudiante creado" }); // Responde éxito
});

// Ruta para obtener todos los estudiantes
app.get("/estudiantes", (req, res) => {
  res.send(readDB()); // Envía todos los estudiantes como respuesta
});

// Ruta para actualizar el resultado del semestre y calcular nuevo promedio
app.put("/estudiantes/:codigo", async (req, res) => {
  const db = readDB(); // Lee base de datos
  const index = db.findIndex((e) => e.codigo === req.params.codigo); // Busca por código
  if (index === -1) return res.status(404).send({ message: "No encontrado" }); // No existe

  const estudiante = db[index]; // Obtiene el estudiante
  const { resultado_notas } = req.body; // Extrae la nueva nota del semestre

  try {
    // Llama al servicio de Python para calcular el nuevo promedio acumulado
    const response = await axios.post(
      "http://promedio-service:5001/calcular-promedio",
      {
        promedio_acumulado: estudiante.promedio_acumulado,
        semestre_actual: estudiante.semestre_actual,
        resultado_notas: resultado_notas,
      }
    );

    const nuevoPromedio = response.data.nuevo_promedio; // Obtiene nuevo promedio
    estudiante.resultado_notas = resultado_notas; // Actualiza nota del semestre
    estudiante.promedio_acumulado = nuevoPromedio; // Actualiza promedio
    estudiante.semestre_actual += 1; // Sube al siguiente semestre

    db[index] = estudiante; // Actualiza en la base de datos
    writeDB(db); // Guarda los cambios

    res.send(estudiante); // Devuelve el estudiante actualizado
  } catch (error) {
    res.status(500).send({ message: "Error al calcular promedio" }); // Si falla
  }
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log("Estudiante service corriendo en http://localhost:3000");
});
