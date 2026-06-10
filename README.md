# Around The U.S. - Proyecto Final

Aplicación web fullstack con autenticación y autorización de usuarios.

## Dominio

https://arounddenise19.mooo.com

## Tecnologías

- React
- Node.js + Express
- MongoDB
- JWT
- NGINX
- PM2

## Funcionalidades principales

**Control de usuarios:** Permite registrar perfiles, listar los miembros existentes y buscar usuarios específicos por ID, además de actualizar la información del perfil y el avatar.

**Control de tarjetas:** Maneja la creación de locaciones con imágenes, su eliminación y el sistema de likes/unlikes mediante operadores de Mongo para evitar duplicados en el array de interacciones.

## Estructura del proyecto

- `controllers/`: Contiene la lógica de comunicación con la base de datos y el manejo de excepciones.
- `models/`: Define los esquemas de datos para usuario y tarjeta.
- `routes/`: Organiza los puntos de acceso que reciben las peticiones.
- `middlewares/`: Autenticación JWT y manejo centralizado de errores.
- `app.js`: Configura la conexión inicial, middlewares y los enrutadores principales.

## Instalación local

1. Clonar el repositorio
2. Ejecutar `npm install`
3. Iniciar el servidor con `node app.js` — corre en el puerto 3000
