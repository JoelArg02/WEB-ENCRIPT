## 🖥️ Flujo de Uso en la Interfaz y Seguridad Frontend

La aplicación SecureFile está diseñada para que todo el proceso de encriptado y desencriptado ocurra **100% en el navegador** del usuario, garantizando máxima privacidad y control. Así es como funciona el flujo desde la interfaz:

### 1. Selección de Modo
- El usuario elige si desea **encriptar** o **desencriptar** un archivo.

### 2. Subida de Archivo
- Para encriptar: se puede subir cualquier archivo.
- Para desencriptar: solo se aceptan archivos `.encrypted` generados por la app.

### 3. Ingreso o Generación de Clave
- El usuario puede escribir su propia clave o generar una aleatoria y segura.
- La clave nunca se almacena ni se transmite, solo se usa localmente.

### 4. Proceso de Encriptado/Desencriptado
- Al hacer clic en el botón correspondiente, la app llama a las funciones `encryptFile` o `decryptFile`.
- El archivo se procesa completamente en el navegador usando Web APIs y CryptoJS.
- El estado del proceso y los mensajes se muestran en tiempo real (progreso, éxito, error).

### 5. Descarga Automática
- Una vez finalizado el proceso, el archivo resultante (encriptado o desencriptado) se descarga automáticamente.
- No se sube ningún archivo ni clave a servidores externos.

### 6. Seguridad Adicional
- El frontend nunca almacena archivos ni claves.
- Todo el procesamiento es local, lo que elimina riesgos de fuga de datos.
- El usuario tiene control total sobre sus archivos y claves.

Este enfoque client-side garantiza que la confidencialidad y privacidad de los datos dependa únicamente del usuario y su dispositivo, haciendo de SecureFile una solución segura y confiable para la protección de archivos sensibles.
# SecureFile - Aplicativo de Encriptación de Archivos 🔐

## Desarrollado por Allpasoft 💚

SecureFile es una aplicación web moderna y segura que permite encriptar y desencriptar archivos usando tecnología de encriptación de nivel militar.

![SecureFile](https://img.shields.io/badge/SecureFile-v1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Allpasoft](https://img.shields.io/badge/Made%20with%20💚%20by-Allpasoft-green)

## ✨ Características

- **🛡️ Encriptación Militar**: Utiliza AES-256 con salt y PBKDF2 (10,000 iteraciones)
- **🎨 Diseño Moderno**: Interfaz intuitiva con efectos glassmorphism y animaciones suaves
- **🔐 Generador de Claves**: Genera claves seguras automáticamente o valida las tuyas
- **📱 Responsive**: Funciona perfectamente en desktop, tablet y móvil
- **🌟 Efectos Visuales**: Partículas flotantes y animaciones con Framer Motion
- **📁 Soporte Universal**: Encripta cualquier tipo de archivo
- **🔄 Proceso Reversible**: Encripta y desencripta manteniendo la integridad original
- **✅ Validación Robusta**: Verifica la fortaleza de las claves y archivos
- **🏷️ Firma Allpasoft**: Todos los archivos incluyen la firma de autenticidad

## 🚀 Tecnologías Utilizadas

- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Estilos utilitarios
- **Framer Motion** - Animaciones fluidas
- **CryptoJS** - Encriptación AES-256
- **Lucide React** - Iconos modernos

## 🔧 Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/JoelArg02/WEB-ENCRIPT.git
   cd WEB-ENCRIPT
   ```

2. **Instala las dependencias**
   ```bash
   yarn install
   ```

3. **Configura las variables de entorno**
   ```bash
   # El archivo .env.local ya está configurado con:
   NEXT_PUBLIC_ENCRYPTION_SALT=AllpasoftSecure2024$!#RandomKey
   ENCRYPTION_SECRET_KEY=AP$ecur3_K3y_F0r_4llp4s0ft_2024!@#$%
   ```

4. **Inicia el servidor de desarrollo**
   ```bash
   yarn dev
   ```

5. **Abre tu navegador en** [http://localhost:3000](http://localhost:3000)

## 📖 Cómo Usar

### Encriptar un Archivo
1. Selecciona la pestaña **"Encriptar"**
2. Arrastra y suelta tu archivo o haz clic para seleccionarlo
3. Ingresa una clave segura o genera una automáticamente
4. Haz clic en **"Encriptar y Descargar"**
5. El archivo `.encrypted` se descargará automáticamente

### Desencriptar un Archivo
1. Selecciona la pestaña **"Desencriptar"**
2. Arrastra y suelta el archivo `.encrypted`
3. Ingresa la clave utilizada para encriptar
4. Haz clic en **"Desencriptar y Descargar"**
5. El archivo original se descargará automáticamente

## 🔐 Seguridad

### Algoritmo de Encriptación
- **Algoritmo**: AES-256-CBC
- **Derivación de Clave**: PBKDF2 con 10,000 iteraciones
- **Salt**: Único por archivo (SHA-256 del contenido + metadatos)
- **Vector de Inicialización**: Aleatorio de 128 bits
- **Verificación**: Firma digital Allpasoft incluida

## 🔬 Detalles Técnicos del Proceso de Encriptado

### 1. Generación y Validación de Clave
- El usuario puede generar una clave segura automáticamente o ingresar una propia. La clave debe tener al menos 12 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales. El sistema valida la fortaleza de la clave y da feedback en tiempo real.


### 2. Proceso de Encriptado (Explicación para Todos)

El proceso de encriptado está pensado para ser seguro, pero también fácil de entender. Aquí te lo explicamos paso a paso, con ejemplos y un diagrama visual:

#### 📝 Paso a Paso
1. **Seleccionas tu archivo**
   - Puede ser cualquier tipo de archivo: foto, PDF, documento, etc.
2. **Eliges o generas una clave secreta**
   - Es como una contraseña. Solo quien tenga esta clave podrá recuperar el archivo original.
3. **La app mezcla tu clave con datos únicos del archivo**
   - Así, aunque uses la misma clave en dos archivos distintos, el resultado será diferente.
4. **Se crea una "clave especial" solo para este archivo**
   - Usando técnicas avanzadas (PBKDF2 y salt), la app transforma tu clave en una clave súper segura.
5. **El archivo se convierte en "datos secretos"**
   - Se usa un método llamado AES-256, que es el estándar de seguridad usado por bancos y gobiernos.
6. **Se guarda todo en un paquete seguro**
   - El archivo encriptado incluye información para poder desencriptarlo después (pero nunca tu clave), y una firma digital que garantiza que fue creado por esta app.
7. **Descargas el archivo encriptado**
   - El archivo resultante tiene la extensión `.encrypted` y solo puede ser abierto con la clave correcta.

#### 📊 Diagrama del Proceso

```mermaid
flowchart LR
    A[Selecciona tu archivo] --> B[Elige o genera clave secreta]
    B --> C[Mezcla clave + datos únicos (salt)]
    C --> D[Deriva clave segura (PBKDF2)]
    D --> E[Encripta archivo (AES-256)]
    E --> F[Empaqueta datos + firma]
    F --> G[Descarga archivo .encrypted]
```

#### 💡 Ejemplo de Uso

1. Subes una foto llamada `vacaciones.jpg`.
2. Escribes la clave: `MiClaveSuperSecreta2025!`
3. Haces clic en "Encriptar y Descargar".
4. Descargas un archivo llamado `vacaciones.jpg.encrypted`.
5. Solo tú (o quien tenga la clave) podrá recuperar la foto original usando la app.

#### 🔒 ¿Por qué es seguro?
- Nadie puede adivinar tu clave ni desencriptar el archivo sin ella.
- Aunque alguien intercepte el archivo `.encrypted`, no podrá abrirlo sin la clave.
- Cada archivo tiene una protección única, incluso si usas la misma clave varias veces.

### 3. Proceso de Desencriptado
1. **Lectura y decodificación**: El archivo `.encrypted` se lee y decodifica desde Base64, extrayendo el paquete seguro.
2. **Verificación de firma**: Se valida que el archivo fue generado por Allpasoft comprobando la firma digital incluida.
3. **Re-derivación de clave**: Se deriva nuevamente la clave usando PBKDF2, el salt almacenado y la clave proporcionada por el usuario.
4. **Desencriptado con AES-256-CBC**: Se descifra el contenido usando la clave derivada y el IV original.
5. **Reconstrucción del archivo**: El contenido desencriptado se convierte de nuevo a ArrayBuffer y se restaura el archivo original con su nombre y tipo MIME.

### 4. Seguridad y Buenas Prácticas
- **Salt y IV únicos**: Cada archivo tiene salt e IV únicos, lo que previene ataques de repetición y análisis de patrones.
- **PBKDF2**: El uso de 10,000 iteraciones ralentiza ataques de fuerza bruta.
- **AES-256**: Estándar de cifrado robusto, ampliamente auditado y usado a nivel militar.
- **Firma digital**: Permite verificar la autenticidad y origen del archivo.
- **Sin almacenamiento de claves**: La clave nunca se almacena ni se transmite, solo se usa localmente en el navegador.

### 5. Resumen del Flujo
```
Usuario selecciona archivo → Ingresa/genera clave → Encriptar → Descarga archivo seguro
Usuario sube archivo encriptado → Ingresa clave → Desencriptar → Descarga archivo original
```

Este proceso garantiza confidencialidad, integridad y autenticidad de los archivos, haciendo que SecureFile sea una solución confiable para la protección de información sensible.

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 👨‍💻 Desarrollado por Allpasoft

- **Empresa**: Allpasoft
- **Versión**: 1.0.0
- **Año**: 2024
- **Tecnología**: Next.js + TypeScript + Tailwind CSS

---

<div align="center">
  <b>Hecho con 💚 por Allpasoft</b><br>
  <small>SecureFile v1.0.0 - Encriptación segura para todos</small>
</div>

