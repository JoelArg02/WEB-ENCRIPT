import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SecureFile - Encriptación de Archivos | Allpasoft",
  description: "Encripta y desencripta tus archivos de forma segura con tecnología avanzada. Desarrollado por Allpasoft.",
  keywords: "encriptación, archivos, seguridad, Allpasoft, SecureFile",
  authors: [{ name: "Allpasoft", url: "https://allpasoft.com" }],
  creator: "Allpasoft",
  publisher: "Allpasoft",
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {/* Partículas flotantes de fondo */}
        <div className="particles">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
        {children}
      </body>
    </html>
  );
}
