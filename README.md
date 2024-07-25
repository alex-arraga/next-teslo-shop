# Descripción del proyecto

Eccomerce de ropa donde podemos encontrar diferentes categorias de productos como ropa de 'hombres', 'mujeres', 'niños' y 'unisex' y podemos comprar dichos productos a traves de diferentes pantallas como el carrito, ordenes de compra, checkout, etc...

## Correr en dev

1. Clonar el repositorio
2. Instalar dependencias ```npm install```
3. Crear una copiar del archivo ```.env.template```, renombrarlo a ```.env ``` y cambiar el valor de sus variables para que la db local funcione
4. Levantar la base de datos ```docker compose up -d```
5. Ejecutar las migraciónes de Prisma ```npx prisma migrate dev``` para sincronizar los modelos de la DB con los de nuestro archivo `schema.prisma` 
6. Ejecutar el comando ```npm run seed``` esto borrará todos los registros de la DB (si existen) y los rellenará de información
7. Correr la app ```npm run dev``` 


## Correr en prod