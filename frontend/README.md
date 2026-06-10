Around the U.Around the U.S.
Sprint 18:

! Nota: El servidor de TripleTen asignado para este sprint no responde actualmente, por lo que las tarjetas y el avatar no cargan. El código está listo y funcionará en cuanto el servidor esté disponible o se proporcione una URL actualizada.

Esta app permite a los usuarios crear una cuenta, iniciar sesión y explorar una galería de fotos. Una vez dentro, pueden agregar sus propias tarjetas con imágenes, eliminarlas, darles like y ver las fotos en tamaño completo. También pueden editar su nombre, descripción y foto de perfil directamente desde la página.

La autenticación se maneja con JWT (JSON Web Tokens) — al registrarse o iniciar sesión, el token se guarda en el localStorage para mantener la sesión activa entre visitas. Las rutas protegidas usan ese token para verificar que el usuario esté autenticado antes de mostrar el contenido. Si no hay sesión activa, la app redirige automáticamente al login.
La comunicación con el servidor se hace a través de una API REST, donde cada petición incluye el token en el header para autorización.

Tecnologías usadas: React, JavaScript, HTML5, CSS3, JWT y API REST.
Sitio web: https://denisehanono.github.io/web_project_around_auth

Denise — Sprint 18 — 2026.
