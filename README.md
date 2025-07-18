# MIDUSHADER

## Instalación

1. `npm install`
2. `npm run build`

## Uso

Para acceder a los controles que hay para modificar las luces, dithering, posici´øn de la cámara etc., coloca `#controls` despues de `http://localhost:4321/` quedando la URL de la siguiente manera: `http://localhost:4321/#controls`

El logo GLB se encunetra en la carpeta public/

Buscar archivo `Experience.astro` ahí esta el componente con todo lo necesario y copiar la carpeta experiece/

## Utilizarlo

En el archivo `astro.confi.mjs` se encuentra la configuracion para poder utilizar archivos `.glsl` en javascript con el plugin [`vite-plugin-glsl`](https://www.npmjs.com/package/vite-plugin-glsl).

```javascript
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import glsl from "vite-plugin-glsl"; // <- Asegúrate de instalar este plugin

export default defineConfig({
  vite: {
    plugins: [tailwindcss(), glsl()], // <- Asegúrate de incluir el plugin glsl
  },
});
```
