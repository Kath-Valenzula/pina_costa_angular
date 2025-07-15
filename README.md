# PinnaCosta
[![CI](https://github.com/Kath-Valenzula/pina_costa_angular/actions/workflows/ci.yml/badge.svg)](https://github.com/Kath-Valenzula/pina_costa_angular/actions/workflows/ci.yml)

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

## Datos de ejemplo y API

Los servicios de `JsonService` consumen archivos JSON publicados en
[GitHub Pages](https://kath-valenzula.github.io/my-json-repo-pina-costa/).
Estos archivos provienen del repositorio
[`my-json-repo-pina-costa`](https://github.com/Kath-Valenzula/my-json-repo-pina-costa)
y se utilizan para simular una API sencilla.

En la carpeta `my-json-repo-pina-costa/` de este proyecto se incluyen
copias de `productos.json` y `encargos.json` para que puedas ejecutar el
proyecto sin conexión o levantar tu propio servidor con
`json-server`:

```bash
npx json-server --watch my-json-repo-pina-costa --port 3000
```

Si cambias la URL del servicio a `http://localhost:3000`, podrás probar
las operaciones CRUD de forma local.

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

```bash
npm run deploy
```

El sitio estará disponible (tras configurar tu usuario) en:
<https://your-user.github.io/pinna-costa-angular/>

### Datos JSON accesibles por HTTP

Dentro de este repositorio se incluye la carpeta `my-json-repo-pina-costa`
con los archivos `encargos.json` y `productos.json`. Puedes publicarla en
**GitHub Pages** para que el servicio `JsonService` acceda a ellos vía
HTTP:

```bash
cd my-json-repo-pina-costa
git init
git add .
git commit -m "Datos para la API"
git remote add origin https://github.com/<usuario>/my-json-repo-pina-costa.git
git push -u origin main
gh-pages -d .
```

Alternativamente, ejecuta un servidor local con `json-server` para probar
las operaciones **GET/POST/PUT/DELETE**:

```bash
npx json-server --watch my-json-repo-pina-costa --port 3000
```

Actualiza las URLs en `src/app/services/json.service.ts` si deseas apuntar
a este servidor local.


## Docker

1. **Instala Docker** en tu sistema (Docker Desktop en Windows o Docker Engine en Linux) y verifica con:

```bash
docker --version
```

2. En la **raíz** del proyecto ejecuta:

```bash
docker build -t pina-costa-angular .
docker run --rm -p 8080:80 pina-costa-angular
```

Abre <http://localhost:8080/> para ver la aplicación.

No ejecutes las líneas del `Dockerfile` de forma manual ni dentro de `dist/`. Usa `docker build` para procesar cada paso correctamente.

## Despliegue en la nube con Docker

1. Etiqueta la imagen y súbela a un registro público (Docker Hub u otro):

```bash
docker tag pina-costa-angular <usuario>/pinna-costa-angular:latest
docker push <usuario>/pinna-costa-angular:latest
```

2. En Docker Lab o cualquier plataforma que soporte contenedores
   ejecuta la imagen publicada:

```bash
docker run -d -p 80:80 <usuario>/pinna-costa-angular:latest
```

Finalmente comparte la URL pública entregada por el proveedor para
acceder a la aplicación.

Este README incluye:

- Una descripción general y lista de **funcionalidades**.
- **Pasos de instalación** claros.
- Organización de carpetas.
- Referencia al **Trello**.
- Comandos más usados.


