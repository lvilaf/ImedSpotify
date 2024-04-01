# ImedSpotify

## Introducción
AppSpotify es una aplicación web diseñada para gestionar álbumes musicales. El backend está desarrollado en Node.js (versión 18) y el frontend en Angular (versión 14), con una base de datos PostgreSQL.

## Pre-requisitos
Asegúrate de tener instalado:
- Node.js (v18)
- Angular CLI (v14)
- PostgreSQL

## Instalación

### Clonar el repositorio

git clone <url-del-repositorio>

### Dependencias del Backend

Navega al directorio del backend y ejecuta el siguiente comando para instalar las dependencias necesarias:

```
cd AppSpotify

npm install
```
### Dependencias del Frontent

navega al directorio del frontend e instala las dependencias ejecutando:

```
cd AppSpotify-front

npm install -g @angular/cli@14
```
### Configuracion Base de datos

```
Inicia sesión en tu servidor PostgreSQL y crea una base de datos llamada AppSpotify.

Ejecuta el script CREATE_ALBUMS.sql para crear la tabla necesaria en tu base de datos
```

### Iniciar Backend
```
cd AppSpotify

node index.js
```
### Iniciar Frontend

```
cd AppSpotify-front

ng serve
```