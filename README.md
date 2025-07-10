# PinnaCosta
[![CI](https://github.com/<OWNER>/<REPO>/actions/workflows/ci.yml/badge.svg)](https://github.com/<OWNER>/<REPO>/actions/workflows/ci.yml)

 **Tienda online** creada con **Angular 16** para el ramo de Programación. Muestra productos de moda femenina, carrito de compras y cuenta de usuario con formularios reactivos y validaciones.

---

##  Características principales

- **Catálogo de productos** con imágenes, descripción y precio.
- **Carrito de compras**: añade/quita productos y muestra contador en el header.
- **Autenticación simulada**  
  - **Admin** (`admin@example.com` / `admin123`): acceso a panel de administración.  
  - **Usuario**: acceso a su perfil.  
- **Formularios Reactivos** con validaciones:
  - Todos los campos “obligatorios” usan `Validators.required`.
  - Email con `Validators.email`.
  - Contraseña con patrón (6–18 car., 1 mayúscula, 1 dígito).
  - Comparación password ↔ confirmPassword.
  - Fecha de nacimiento con validador mínimo 13 años.
  - Botones **Crear** / **Enviar** y **Limpiar** (`form.reset()`).
- **Pruebas unitarias** (Jasmine + Karma) cubriendo validadores y onSubmit().

---

##  Instalación

1. Clona el repositorio y entra en la carpeta:
   git clone https://github.com/Kath-Valenzula/pinna-costa-angular.git
   cd pinna-costa-angular
2. Instala las dependencias:
   npm install
3. Levanta el servidor de desarrollo:
   npx ng serve --open
4. Abre tu navegador en http://localhost:4200/.


##  Organización del proyecto
  src/app/pages/ → componentes de ruta (Login, Registro, Perfil, Catálogo, Carrito, Admin, etc.).

  src/app/shared/ → componentes compartidos (Header, Footer).

  src/app/services/ → servicios (CartService, AuthService, ProductService, UserService).

  Formularios en cada página usan Reactive Forms (FormGroup + FormControl).

##  Gestión de tareas
Trello board con las tarjetas de avance:
https://trello.com/invite/b/6841b7501513a7c851f63262/ATTI3972defad988bed90611a1ea7585c395258AECA5/pina-costa

## Scripts útiles
Desarrollo:
ng serve
Generar componente/directiva/servicio:
ng generate component my-new-component
Build producción:
ng build --prod
Pruebas unitarias:
ng test
Pruebas e2e:
ng e2e

Generar documentación del código:
npm run docs

Compilar las pruebas de Cypress con TypeScript:
`npx tsc -p cypress/tsconfig.json`
Si tu herramienta usa otra ruta, verifica que no agregue un segundo `cypress/`.

## Pruebas con navegador headless

1. Instala Chromium/Chrome y su driver:
   `sudo apt-get install -y chromium-browser chromium-chromedriver`
2. Ejecuta las pruebas unitarias en modo headless:
   `npm test -- --browsers=ChromeHeadless --watch=false`
3. Si Karma no encuentra Chrome, usa la ruta que provee Puppeteer:
   `CHROME_BIN=$(node -p "require('puppeteer').executablePath()") npm test -- --browsers=ChromeHeadless --watch=false`

## Más info
Documentación oficial de Angular: https://angular.io

Guía de estilos y mejores prácticas: https://angular.io/guide/styleguide

## Despliegue

Para publicar la aplicación en **GitHub Pages** puedes ejecutar:

## Docker

Para probar la aplicación en un contenedor Docker ejecuta en la raíz del proyecto:

```bash
docker build -t pina-costa-angular .
docker run --rm -p 8080:80 pina-costa-angular
```

No ejecutes las líneas del `Dockerfile` manualmente ni desde la carpeta `dist/`.
Usa `docker build` para procesar cada paso correctamente.

```bash
npm run deploy
```

El sitio estará disponible (tras configurar tu usuario) en:
<https://your-user.github.io/pinna-costa-angular/>


Este README incluye:

- Una descripción general y lista de **funcionalidades**.
- **Pasos de instalación** claros.
- Organización de carpetas.
- Referencia al **Trello**.
- Comandos más usados.


