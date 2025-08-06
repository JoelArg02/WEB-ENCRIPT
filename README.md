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

