import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Droplets, MessageCircle, Phone } from 'lucide-react';

import { Brand } from '@/components/brand';
import { SiteNavigation } from '@/components/site-navigation';
import { accessories, equipment, productInquiry, thermalSolutions } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Productos | Cero Clima',
  description: 'Equipos de climatización, bombas de calor, agua caliente sanitaria y accesorios de Cero Clima.',
};

const whatsapp =
  'https://wa.me/56996809677?text=Hola%20Cero%20Clima%2C%20quiero%20cotizar%20una%20soluci%C3%B3n%20de%20climatizaci%C3%B3n.';

export default function ProductsPage() {
  return (
    <main className="products-page" id="inicio">
      <header className="site-header">
        <div className="shell header-inner">
          <Brand />
          <SiteNavigation />
          <a className="button button-whatsapp" href={whatsapp}>
            <MessageCircle aria-hidden="true" /> Cotizar por WhatsApp
          </a>
        </div>
      </header>

      <section className="products-hero" aria-labelledby="products-title">
        <div className="shell products-hero-inner">
          <Link className="back-link" href="/#inicio"><ArrowLeft aria-hidden="true" /> Volver al inicio</Link>
          <span className="section-kicker">Catálogo Cero Clima</span>
          <h1 id="products-title">Descubre nuestros productos</h1>
          <p>
            Soluciones residenciales y comerciales para climatización, calefacción y agua caliente.
            La capacidad y configuración final se definen mediante evaluación técnica.
          </p>
          <nav className="catalog-navigation" aria-label="Categorías del catálogo">
            <a href="#aire-acondicionado">Aire acondicionado <span>8</span></a>
            <a href="#energia-termica">Bombas de calor y ACS <span>2</span></a>
            <a href="#accesorios">Accesorios y control <span>4</span></a>
          </nav>
        </div>
      </section>

      <section className="section shell catalog-section product-category" id="aire-acondicionado">
        <div className="category-heading">
          <div>
            <span className="section-kicker">Residencial y comercial</span>
            <h2>Equipos de aire acondicionado</h2>
          </div>
          <p>Opciones murales, portátiles, de cielo, ducto y acceso comercial.</p>
        </div>
        <div className="equipment-grid">
          {equipment.map((item) => (
            <article className="equipment-card" key={item.title}>
              <div className="equipment-media">
                <Image src={item.image} alt={`Equipo ${item.title}`} width="900" height="650" />
                <span>{item.category}</span>
              </div>
              <div className="equipment-copy">
                <p className="equipment-capacity">{item.capacity}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>
                  {item.features.map((feature) => (
                    <li key={feature}><Check aria-hidden="true" />{feature}</li>
                  ))}
                </ul>
                <a className="text-link" href={productInquiry(item.title)} aria-label={`Consultar ${item.title} por WhatsApp`}>
                  Consultar este equipo <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell product-category" id="energia-termica">
        <div className="category-heading">
          <div>
            <span className="section-kicker">Energía térmica y agua</span>
            <h2>Bombas de calor y agua caliente sanitaria</h2>
          </div>
          <p>Cada sistema se dimensiona según las condiciones del proyecto y la demanda de uso.</p>
        </div>
        <div className="thermal-grid">
          {thermalSolutions.map((item, index) => (
            <article className="thermal-card" key={item.title}>
              <div className={`thermal-visual${index === 1 ? ' thermal-visual-acs' : ''}`}>
                {item.image ? (
                  <Image src={item.image} alt={`Equipo para ${item.title}`} width="900" height="650" />
                ) : (
                  <div className="thermal-icon" aria-hidden="true"><Droplets /></div>
                )}
              </div>
              <div className="thermal-copy">
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>
                  {item.features.map((feature) => (
                    <li key={feature}><Check aria-hidden="true" />{feature}</li>
                  ))}
                </ul>
                <a className="text-link" href={productInquiry(item.title)} aria-label={`Consultar ${item.title} por WhatsApp`}>
                  Evaluar esta solución <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell product-category" id="accesorios">
        <div className="category-heading">
          <div>
            <span className="section-kicker">Complementos de instalación</span>
            <h2>Accesorios y control</h2>
          </div>
          <p>Componentes para drenaje, montaje, operación y servicio técnico.</p>
        </div>
        <div className="accessory-grid">
          {accessories.map((item) => (
            <article className="accessory-card" key={item.title}>
              <div className="accessory-media">
                <Image src={item.image} alt={item.title} width="720" height="520" />
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <a className="text-link" href={productInquiry(item.title)} aria-label={`Consultar ${item.title} por WhatsApp`}>
                  Consultar disponibilidad <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="products-contact" id="contacto">
        <div className="shell products-contact-inner">
          <div>
            <span className="section-kicker">Asesoría técnica</span>
            <h2>¿No sabes cuál elegir?</h2>
            <p>Cuéntanos qué espacio necesitas climatizar y te orientamos.</p>
          </div>
          <div className="products-contact-actions">
            <a className="button button-orange" href={whatsapp}><MessageCircle aria-hidden="true" /> Hablar por WhatsApp</a>
            <a className="phone-link" href="tel:+56996809677"><Phone aria-hidden="true" /> +56 9 9680 9677</a>
          </div>
        </div>
      </section>
    </main>
  );
}
