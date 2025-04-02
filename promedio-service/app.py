# Importa los módulos necesarios de Flask
# - Flask: para crear la app web
# - request: para acceder a los datos enviados por el cliente (JSON)
# - jsonify: para retornar respuestas en formato JSON
from flask import Flask, request, jsonify

# Crea la aplicación Flask
app = Flask(__name__)

# Define una ruta que escucha en '/calcular-promedio' usando el método POST
@app.route('/calcular-promedio', methods=['POST'])
def calcular_promedio():
    # Obtiene el cuerpo JSON enviado en la solicitud
    data = request.json

    # Extrae los valores enviados desde el microservicio de estudiantes
    promedio_acumulado = data['promedio_acumulado']
    semestre_actual = data['semestre_actual']
    resultado_notas = data['resultado_notas']

    # Calcula el nuevo promedio acumulado usando la fórmula:
    # nuevo_promedio = (promedio_acumulado * (semestre_actual - 1) + resultado_notas) / semestre_actual
    nuevo_promedio = (
        (promedio_acumulado * (semestre_actual - 1)) + resultado_notas
    ) / semestre_actual

    # Retorna el nuevo promedio en formato JSON, redondeado a 2 decimales
    return jsonify({'nuevo_promedio': round(nuevo_promedio, 2)})

# Esta condición asegura que la app se ejecute solo si se ejecuta directamente (no al ser importada)
if __name__ == '__main__':
    # Inicia el servidor Flask en todas las direcciones (0.0.0.0) y en el puerto 5001
    # Esto permite que el contenedor Docker lo exponga correctamente
    app.run(host='0.0.0.0', port=5001)
