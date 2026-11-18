# PlanoVertical

Pasa un vídeo horizontal a 9:16. Rellena el fondo con desenfoque o recorta el plano y encuadra lo que importa.

[Abre PlanoVertical](https://1ly4s0.github.io/planovertical/)

El sitio usa HTML, CSS y JavaScript. Los archivos se procesan en el navegador. La vista previa se dibuja en Canvas. El exportador guarda MP4 con vídeo H.264 y audio AAC, o WebM. La grabación tarda aproximadamente lo que dura el fragmento.

## Exportación

WebCodecs toma los fotogramas del lienzo cuando el navegador lo admite. MediaRecorder permite capturarlos en otros navegadores compatibles. Para convertir o combinar las pistas, un Web Worker puede descargar el motor [FFmpeg WebAssembly 0.12.10](https://www.npmjs.com/package/@ffmpeg/core/v/0.12.10). Comprueba la huella SHA-256 de cada recurso antes de cargarlo. El navegador descarga el codificador. Los archivos del usuario se procesan en el dispositivo.

## Desarrollo local

Desde la carpeta del proyecto, sirve los archivos con `python -m http.server 8000` y abre `http://localhost:8000/`.

La portada en español está en `index.html` y la versión en inglés en `en/index.html`. GitHub Pages sirve ambos archivos desde la raíz de `main`.
