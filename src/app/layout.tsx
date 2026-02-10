import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jardín El Paraíso | Tu Evento Soñado en Chapala, Jalisco",
  description:
    "El jardín de eventos más exclusivo de Chapala, Jalisco. Bodas, XV Años, eventos corporativos y sociales con vista al Lago de Chapala. Agenda tu fecha hoy.",
  keywords:
    "jardín de eventos, bodas Chapala, XV años Jalisco, evento Lago Chapala, salón de fiestas, jardín El Paraíso",
  openGraph: {
    title: "Jardín El Paraíso | Eventos Inolvidables en Chapala",
    description:
      "Celebra tu evento soñado rodeado de naturaleza con vista al Lago de Chapala. Bodas, XV Años y más.",
    type: "website",
    locale: "es_MX",
  },
  robots: "index, follow",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#C9B99A",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
