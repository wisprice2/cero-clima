import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, MessageCircle, PackageSearch, Phone, Tags } from 'lucide-react';

import { Brand } from '@/components/brand';
import { BtuSelector } from '@/components/btu-selector';
import { CatalogExplorer } from '@/components/catalog-explorer';
import { SiteFooter } from '@/components/site-footer';
import { SiteNavigation } from '@/components/site-navigation';
import { products, productInquiry, productSegments } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Productos y fichas técnicas',
  description: 'Explora equipos residenciales y comerciales, bombas de calor, accesorios, modelos y fichas técnicas de CEROCLIMA.',
};

const whatsapp = productInquiry('una solución de climatización');
const datasheetCount = products.filter((product) => product.datasheet).length;

export default function ProductsPage() {
  return (
    <main className="products-page" id="contenido-principal" tabIndex={-1}>
      <header className="site-header">
        <div className="shell header-inner">
          <Brand />
          <SiteNavigation />
          <a className="button button-whatsapp" href={whatsapp}>
            <MessageCircle aria-hidden="true" /> Cotizar por WhatsApp
          </a>
        </div>
      </header>

      <section className="products-hero" id="inicio" aria-labelledby="products-title">
        <div className="shell products-hero-inner">
          <Link className="back-link" href="/#inicio"><ArrowLeft aria-hidden="true" /> Volver al inicio</Link>
          <span className="section-kicker">Catálogo CEROCLIMA</span>
          <h1 id="products-title">Descubre nuestros productos</h1>
          <p>
            Equipos residenciales y comerciales ordenados por tecnología, capacidad y aplicación.
            Compara modelos, revisa sus datos principales y descarga las fichas disponibles.
          </p>
          <div className="catalog-summary" aria-label="Resumen del catálogo">
            <span><PackageSearch aria-hidden="true" /><strong>{products.length}</strong> soluciones</span>
            <span><FileText aria-hidden="true" /><strong>{datasheetCount}</strong> fichas técnicas</span>
            <span><Tags aria-hidden="true" /><strong>{productSegments.length}</strong> categorías</span>
          </div>
          <nav className="catalog-navigation" aria-label="Accesos del catálogo">
            <a href="#selector-btu">Calcular BTU</a>
            <a href="#catalogo">Explorar catálogo <span>{products.length}</span></a>
            <a href="#asesoria">Asesoría técnica</a>
          </nav>
        </div>
      </section>

      <BtuSelector />
      <CatalogExplorer />

      <section className="products-contact" id="asesoria">
        <div className="shell products-contact-inner">
          <div>
            <span className="section-kicker">Asesoría técnica</span>
            <h2>¿No sabes cuál elegir?</h2>
            <p>Cuéntanos las dimensiones, ubicación y uso del espacio. Revisamos capacidad, alimentación y alcance de la instalación antes de cotizar.</p>
          </div>
          <div className="products-contact-actions">
            <a className="button button-orange" href={whatsapp}><MessageCircle aria-hidden="true" /> Hablar por WhatsApp</a>
            <a className="phone-link" href="tel:+56996809677"><Phone aria-hidden="true" /> +56 9 9680 9677</a>
          </div>
        </div>
      </section>

      <SiteFooter whatsappHref={whatsapp} />
    </main>
  );
}
