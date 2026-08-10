## Comparación con FastAPI

### Modelos: Sequelize vs SQLAlchemy/Pydantic

[Algunos puntos técnicos a considerar:]
- Sequelize define el modelo y las validaciones en un solo `define()`, mezclando estructura de tabla con reglas (allowNull, tipos, etc.)
- SQLAlchemy separa el modelo de la tabla (ORM) de la validación de datos de entrada/salida (Pydantic), lo cual da más control pero implica mantener dos definiciones distintas del "mismo" objeto.
- Pydantic aprovecha type hints de Python, lo que a muchos les resulta más legible y con mejor autocompletado.

### Manejo de errores: try/except vs .then()/.catch()

[Puntos a considerar:]
- Node/Express usa Promesas: `.then()/.catch()` (o `async/await` con `try/catch`), y los errores casi siempre se manejan manualmente dentro de cada controller con `res.status(500).send(...)`.
- FastAPI centraliza mucho mejor el manejo de errores con `HTTPException` y exception handlers globales, evitando repetir el mismo bloque try/except en cada endpoint.
- En Node es fácil olvidar un `.catch()` y que el error quede sin manejar (unhandled promise rejection); en Python, el `try/except` es más explícito y difícil de omitir sin que se note.

### Despliegue en Render

[Puntos a considerar:]
- Node necesita definir bien el `package.json` (scripts de start), variables de entorno, y a veces configurar el build command.
- FastAPI en Render suele requerir definir el comando de arranque con Uvicorn/Gunicorn y el archivo de requirements.txt.


## Cómo correr el proyecto en modo desarrollo

\`\`\`bash
NODE_ENV=development node server.js
\`\`\`

## Endpoints disponibles

| Método | Ruta                        | Protegido | Descripción                        |
|--------|-----------------------------|-----------|-------------------------------------|
| POST   | /api/auth/signup            | No        | Registro de usuario                 |
| POST   | /api/auth/signin            | No        | Login, devuelve accessToken (JWT)   |
| GET    | /api/customer/               | No        | Lista todos los clientes            |
| GET    | /api/customer/status         | No        | Lista clientes activos              |
| GET    | /api/customer/:id            | No        | Obtiene un cliente por id           |
| POST   | /api/customer/create/        | Sí        | Crea un cliente                     |
| PUT    | /api/customer/update/:id     | Sí        | Actualiza un cliente                |
| DELETE | /api/customer/delete/:id     | Sí        | Elimina un cliente                  |
| DELETE | /api/customer/delete/        | Sí        | Elimina todos los clientes          |
| POST   | /api/pago/crear-sesion       | Sí/No*    | Crea sesión de Stripe Checkout      |
| POST   | /api/pago/webhook            | N/A       | Webhook de Stripe (usa raw body)    |



## Webhook de Stripe en producción

En producción, el webhook **no debe configurarse con `stripe listen`** (eso es solo para desarrollo local).
En su lugar, debe registrarse desde el Dashboard de Stripe:

1. Developers → Webhooks → Add endpoint
2. URL: `https://<tu-app>.onrender.com/api/pago/webhook`
3. Seleccionar el evento `checkout.session.completed`
4. Copiar el signing secret generado y configurarlo como `STRIPE_WEBHOOK_SECRET`
   en las variables de entorno de Render.