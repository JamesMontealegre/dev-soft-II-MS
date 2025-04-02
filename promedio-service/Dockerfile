# Usa una imagen base de Python 3.10 en versión "slim"
# (más liviana que la versión completa, ideal para producción)
FROM python:3.10-slim

# Establece el directorio de trabajo dentro del contenedor en /app
# Todo lo que hagas a continuación se ejecutará desde esa carpeta
WORKDIR /app

# Copia todos los archivos del proyecto actual al directorio de trabajo del contenedor (/app)
COPY . .

# Instala Flask dentro del contenedor usando pip
# Flask es el framework necesario para levantar el microservicio
RUN pip install flask

# Expone el puerto 5001 del contenedor para que pueda ser accedido externamente
EXPOSE 5001

# Comando que se ejecuta cuando arranca el contenedor
# Inicia la aplicación Flask ejecutando el archivo app.py
CMD ["python", "app.py"]
