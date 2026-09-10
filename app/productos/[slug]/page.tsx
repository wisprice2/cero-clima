import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/components/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Download, FileText, MessageCircle, Phone } from 'lucide-react';

import { Brand } from '@/components/brand';
import { SiteFooter } from '@/components/site-footer';
import { SiteNavigation } from '@/components/site-navigation';
import { getProduct, products, productInquiry } from '@/lib/products';

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: 'Producto no encontrado' };
  return {
    title: product.title,
    description: `${product.description} ${product.capacity}. Consulta disponibilidad e instalación.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((item) => item.slug !== product.slug && (item.family === product.family || item.segment === product.segment))
    .slice(0, 3);
  const whatsapp = productInquiry(product.title);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    brand: { '@type': 'Brand', name: product.brand },
    category: `${product.segment} > ${product.family}`,
    description: product.description,
    image: product.gallery,
  };

  return (
    <main className="product-detail-page" id="contenido-principal" tabIndex={-1}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className="site-header">
        <div className="shell header-inner">
          <Brand />
          <SiteNavigation />
          <a className="button button-whatsapp" href={whatsapp}><MessageCircle aria-hidden="true" /> Cotizar este equipo</a>
        </div>
      </header>

      <section className="product-detail-hero" id="inicio">
        <div className="shell">
          <nav className="product-breadcrumb" aria-label="Migas de pan">
            <Link href="/productos"><ArrowLeft aria-hidden="true" /> Productos</Link>
            <span>/</span>
            <span>{product.family}</span>
          </nav>
          <div className="product-detail-grid">
            <div className="product-detail-visual">
              <Image src={product.image} alt={product.title} width="1400" height="1000" priority />
              <span>Imagen referencial</span>
            </div>
            <div className="product-detail-copy">
              <div className="product-detail-meta">
                <span>{product.brand}</span><span>{product.segment}</span><span>{product.technology}</span><span>{product.refrigerant}</span>
              </div>
              <p className="section-kicker">{product.family}</p>
              <h1>{product.title}</h1>
              <p className="product-lead">{product.description}</p>
              <div className="product-capacity"><small>Capacidad o formato</small><strong>{product.capacity}</strong></div>
              <ul className="product-feature-list">
                {product.features.map((feature) => <li key={feature}><Check aria-hidden="true" />{feature}</li>)}
              </ul>
              <div className="product-detail-actions">
                <a className="button button-orange" href={whatsapp}><MessageCircle aria-hidden="true" /> Consultar disponibilidad</a>
                {product.datasheet ? (
                  <a className="button button-secondary" href={product.datasheet} download>
                    <Download aria-hidden="true" /> {product.datasheetLabel ?? 'Descargar ficha técnica'}
                  </a>
                ) : null}
              </div>
              {product.note ? <p className="product-note"><FileText aria-hidden="true" />{product.note}</p> : null}
            </div>
          </div>
        </div>
      </section>

      <section className="section shell product-information" aria-labelledby="spec-title">
        <div className="product-spec-panel">
          <span className="section-kicker">Datos principales</span>
          <h2 id="spec-title">Especificaciones para comparar</h2>
          <dl>
            {product.specs.map((spec) => (
              <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>
            ))}
          </dl>
        </div>
        <div className="product-model-panel">
          <span className="section-kicker">Modelos y variantes</span>
          <h2>Opciones documentadas</h2>
          <div className="model-list">
            {product.models.map((model) => <span key={model}>{model}</span>)}
          </div>
          <p>La disponibilidad, equivalencia comercial y configuración final se confirman al cotizar.</p>
        </div>
      </section>

      {product.gallery.length > 1 || product.video ? (
        <section className="section shell product-gallery-section" aria-labelledby="gallery-title">
          <div className="category-heading">
            <div><span className="section-kicker">Galería del equipo</span><h2 id="gallery-title">Vistas y componentes</h2></div>
            <p>Fotografías del producto y sus componentes. La apariencia puede variar según el modelo.</p>
          </div>
          <div className="product-gallery-grid">
            {product.gallery.map((image, index) => (
              <figure key={image}>
                <Image src={image} alt={`${product.title}, vista ${index + 1}`} width="1400" height="1000" />
                <figcaption>{index === 0 ? 'Vista principal' : `Vista ${index + 1}`}</figcaption>
              </figure>
            ))}
            {product.video ? (
              <figure className="product-video">
                <video controls preload="metadata" playsInline>
                  <source src={product.video} type="video/mp4" />
                  <track
                    kind="captions"
                    src="/captions/equipo-demo-es.vtt"
                    srcLang="es"
                    label="Español"
                    default
                  />
                </video>
                <figcaption>Video real del equipo</figcaption>
              </figure>
            ) : null}
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="section shell related-products" aria-labelledby="related-title">
          <div className="category-heading">
            <div><span className="section-kicker">También puedes comparar</span><h2 id="related-title">Productos relacionados</h2></div>
          </div>
          <div className="related-product-grid">
            {related.map((item) => (
              <Link href={`/productos/${item.slug}`} key={item.slug}>
                <Image src={item.image} alt="" width="520" height="380" />
                <span>{item.family} · {item.refrigerant}</span>
                <strong>{item.title}</strong>
                <small>{item.capacity}</small>
                <span className="text-link">Ver producto <ArrowRight aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="products-contact">
        <div className="shell products-contact-inner">
          <div><span className="section-kicker">Evaluación técnica</span><h2>Confirma el modelo antes de comprar</h2><p>Validamos capacidad, voltaje, condiciones de montaje y alcance de la instalación para tu proyecto.</p></div>
          <div className="products-contact-actions">
            <a className="button button-orange" href={whatsapp}><MessageCircle aria-hidden="true" /> Cotizar {product.title}</a>
            <a className="phone-link" href="tel:+56996809677"><Phone aria-hidden="true" /> +56 9 9680 9677</a>
          </div>
        </div>
      </section>

      <SiteFooter whatsappHref={whatsapp} />
    </main>
  );
}
