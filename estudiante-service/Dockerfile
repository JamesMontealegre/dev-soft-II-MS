# Usa la imagen oficial de Node.js versión 18 como base
# Esta imagen ya incluye Node y npm instalados
FROM node:18

# Establece el directorio de trabajo dentro del contenedor en /app
# Todos los comandos siguientes se ejecutarán dentro de esta carpeta
WORKDIR /app

# Copia los archivos de definición de dependencias (package.json y package-lock.json)
# Esto se hace primero para aprovechar el cache de Docker y no reinstalar paquetes si no hay cambios
COPY package*.json ./

# Instala las dependencias del proyecto usando npm
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Expone el puerto 3000 para que pueda ser accedido desde el exterior del contenedor
EXPOSE 3000

# Define el comando que se ejecutará al iniciar el contenedor
# En este caso, inicia la aplicación con Node.js ejecutando el archivo index.js
CMD ["node", "index.js"]
