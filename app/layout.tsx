import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'CEROCLIMA | Climatización sustentable en Chile',
    template: '%s | CEROCLIMA',
  },
  description:
    'Instalación, mantención y asesoría en climatización residencial y comercial, con presencia técnica desde Arica hasta Los Lagos.',
  keywords: [
    'aire acondicionado',
    'climatización',
    'instalación de aire acondicionado',
    'equipos Inverter',
    'CEROCLIMA',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'CEROCLIMA',
    title: 'CEROCLIMA | Climatización sustentable en Chile',
    description: 'Climatización residencial y comercial con presencia técnica desde Arica hasta Los Lagos.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} antialiased`}>
        <a className="skip-link" href="#contenido-principal">Saltar al contenido principal</a>
        {children}
      </body>
    </html>
  );
}
