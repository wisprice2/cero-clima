import {
  AirVent,
  ArrowRight,
  BadgeCheck,
  Bolt,
  BriefcaseBusiness,
  Check,
  ClipboardCheck,
  Clock3,
  Gauge,
  Leaf,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Smartphone,
  Snowflake,
  Sparkles,
  Star,
  Wrench,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Brand } from '@/components/brand';
import { BtuSelector } from '@/components/btu-selector';
import { SiteFooter } from '@/components/site-footer';
import { SiteNavigation } from '@/components/site-navigation';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const whatsapp =
  'https://wa.me/56996809677?text=Hola%20CEROCLIMA%2C%20quiero%20cotizar%20una%20soluci%C3%B3n%20de%20climatizaci%C3%B3n.';

const trust = [
  { value: '21 años', label: 'Experiencia', icon: ShieldCheck },
  { value: 'Inverter', label: 'Tecnología eficiente', icon: Leaf },
  { value: 'Evaluación técnica', label: 'Antes de cotizar', icon: ClipboardCheck },
  { value: 'Arica a Los Lagos', label: 'Presencia técnica', icon: MapPin },
];

const pillars = [
  { title: '21 años de experiencia', icon: BadgeCheck },
  { title: 'Eficiencia según cada proyecto', icon: Gauge },
  { title: 'Climatización sustentable', icon: Leaf },
  { title: 'Atención técnica directa', icon: BriefcaseBusiness },
];

const partnerBrands = [
  { name: 'Daitsu', logo: '/images/brands/daitsu.svg', theme: 'dark' },
  { name: 'Fujitsu', logo: '/images/brands/fujitsu.svg' },
  { name: 'Clark', logo: '/images/brands/clark.svg' },
  { name: 'Midea', logo: '/images/brands/midea.svg' },
  { name: 'Hisense', logo: '/images/brands/hisense.svg' },
  { name: 'Daikin', logo: '/images/brands/daikin.png' },
  { name: 'Samsung', logo: '/images/brands/samsung.png' },
];

const services = [
  {
    title: 'Instalación',
    description: 'Soluciones residenciales y comerciales ejecutadas por técnicos especialistas.',
    icon: AirVent,
    image: '/images/proyecto-residencial-bulnes.webp',
  },
  {
    title: 'Cassette comercial',
    description: 'Distribución uniforme para oficinas, locales y recintos de mayor superficie.',
    icon: Snowflake,
    image: '/images/catalog/cassette-inverter.webp',
    product: true,
  },
  {
    title: 'Sistemas por ductos',
    description: 'Climatización discreta e integrada para proyectos comerciales.',
    icon: AirVent,
    image: '/images/catalog/ducto-inverter.webp',
    product: true,
  },
  {
    title: 'Equipos piso cielo',
    description: 'Alternativa versátil para salones, tiendas y espacios amplios.',
    icon: Gauge,
    image: '/images/catalog/cielo-piso-inverter.webp',
    product: true,
  },
  {
    title: 'Mantención y sanitización',
    description: 'Limpieza, revisión preventiva y cuidado del rendimiento del equipo.',
    icon: Sparkles,
    image: '/images/proyecto-optica-san-carlos.webp',
  },
  {
    title: 'Instalaciones eléctricas',
    description: 'Circuitos, protecciones y alimentación segura para cada proyecto.',
    icon: Bolt,
    image: '/images/instalacion-electrica-profesional.webp',
  },
];

const projects = [
  {
    title: 'Óptica San Carlos',
    image: '/images/proyecto-optica-san-carlos.webp',
    type: 'Proyecto comercial',
  },
  {
    title: 'Residencial Bulnes',
    image: '/images/proyecto-residencial-bulnes.webp',
    type: 'Climatización residencial',
  },
  {
    title: 'Proyecto Pinto',
    image: '/images/proyecto-pinto.webp',
    type: 'Instalación exterior',
  },
  {
    title: 'Chillán',
    image: '/images/proyecto-chillan.webp',
    type: 'Hogar y oficina',
  },
  {
    title: 'Proyecto Sarabia',
    image: '/images/proyecto-sarabia.webp',
    type: 'Proyecto multiunidad',
  },
];

const faqs = [
  {
    question: '¿Qué equipo necesito para mi espacio?',
    answer:
      'Evaluamos dimensiones, orientación, aislación y uso del espacio para recomendar la capacidad adecuada.',
  },
  {
    question: '¿Cuántos BTU necesito?',
    answer:
      'Los BTU dependen del tamaño y de la carga térmica del recinto. Una visita técnica evita elegir un equipo subdimensionado o sobredimensionado.',
  },
  {
    question: '¿La instalación está incluida?',
    answer:
      'Cada cotización detalla el alcance de la instalación: metros de tubería y canaleta, soporte, conexión eléctrica, perforaciones, altura de trabajo, puesta en marcha y cualquier condición adicional detectada en la visita técnica.',
  },
  {
    question: '¿Cuánto consume un equipo Inverter?',
    answer:
      'El consumo varía según capacidad, temperatura exterior, aislación y horas de uso. La tecnología Inverter regula el compresor para trabajar con mayor eficiencia.',
  },
  {
    question: '¿Puedo controlarlo desde mi celular?',
    answer:
      'Los equipos compatibles con Wi-Fi permiten encendido, ajuste de temperatura y programación desde una aplicación móvil.',
  },
  {
    question: '¿Realizan mantención?',
    answer:
      'Sí. Realizamos limpieza, sanitización y revisión preventiva para mantener el rendimiento del equipo.',
  },
  {
    question: '¿Dónde realizan instalaciones?',
    answer:
      'Tenemos presencia técnica desde Arica hasta la Región de Los Lagos. La disponibilidad y los plazos se coordinan según la ubicación y el alcance de cada proyecto.',
  },
];

const homepageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HVACBusiness',
      name: 'CEROCLIMA SpA',
      telephone: '+56 9 9680 9677',
      email: 'ceroclima.cl@gmail.com',
      areaServed: 'Desde Arica hasta la Región de Los Lagos, Chile',
      description: 'Instalación, mantención y asesoría en climatización residencial y comercial.',
      sameAs: [
        'https://www.instagram.com/cero_clima/',
        'https://www.facebook.com/ceroclima.climatizacion.sustentable',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
};

function WhatsappButton({ children = 'Cotizar por WhatsApp', light = false }) {
  return (
    <a className={`button button-whatsapp${light ? ' button-light' : ''}`} href={whatsapp}>
      <MessageCircle aria-hidden="true" />
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main id="contenido-principal" tabIndex={-1}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }} />
      <header className="site-header">
        <div className="shell header-inner">
          <Brand />
          <SiteNavigation />
          <WhatsappButton />
        </div>
      </header>

      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <Image
          className="hero-image"
          src="/images/hero-cero-clima.webp"
          alt="Living moderno climatizado con aire acondicionado frío y calor"
          width="1792"
          height="1024"
        />
        <div className="hero-overlay" />
        <div className="shell hero-content">
          <div className="hero-copy">
            <div className="eyebrow">
              <Clock3 aria-hidden="true" />
              21 años de experiencia
            </div>
            <h1 id="hero-title">
              <span className="hero-copy-desktop">Climatización Inteligente y Sustentable para tu Hogar o Negocio</span>
              <span className="hero-copy-mobile">El clima ideal para tu hogar o negocio</span>
            </h1>
            <p>
              <span className="hero-copy-desktop">
                Soluciones frío/calor dimensionadas para cada espacio, con tecnología Inverter y control Wi-Fi en los modelos compatibles.
              </span>
              <span className="hero-copy-mobile">
                Soluciones frío/calor eficientes, dimensionadas e instaladas por especialistas.
              </span>
            </p>
            <div className="hero-actions">
              <WhatsappButton>Cotizar ahora</WhatsappButton>
              <Link className="button button-orange" href="/productos">
                Ver equipos
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className="hero-proof" aria-label="Indicadores de confianza">
              <span><BadgeCheck />Técnicos especialistas</span>
              <span><ClipboardCheck />Evaluación técnica</span>
              <span><Wrench />Instalación profesional</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-wrap" aria-label="Confianza CEROCLIMA">
        <div className="shell trust-bar">
          {trust.map(({ value, label, icon: Icon }) => (
            <article key={value}>
              <Icon aria-hidden="true" />
              <div><strong>{value}</strong><span>{label}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell coverage-section" aria-labelledby="coverage-title">
        <div className="coverage-card glow-card">
          <div className="coverage-copy">
            <span className="section-kicker">Cobertura nacional coordinada</span>
            <h2 id="coverage-title">Presencia técnica desde Arica hasta Los Lagos</h2>
            <p>
              Atendemos hogares, comercios y proyectos en distintas regiones de Chile. Coordinamos visitas,
              instalación y soporte técnico según la ubicación y las necesidades de cada obra.
            </p>
          </div>
          <div className="coverage-route" aria-label="Cobertura desde Arica hasta Los Lagos">
            {['Arica', 'Zona Central', 'Ñuble', 'Los Lagos'].map((place) => (
              <span key={place}><MapPin aria-hidden="true" />{place}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell" id="oferta">
        <div className="offer-card glow-card">
          <div className="offer-visual">
            <Image src="/images/split-inverter.webp" alt="Equipo Split Inverter frío y calor" width="1536" height="1024" />
          </div>
          <div className="offer-copy">
            <span className="section-kicker">Solución destacada</span>
            <h2>Aire Acondicionado<br />Split Inverter</h2>
            <div className="offer-value">Cotización según capacidad e instalación</div>
            <p>Seleccionamos el modelo y detallamos por escrito todo lo incluido antes de ejecutar el trabajo.</p>
            <ul className="check-grid">
              {['Frío / Calor', 'Tecnología Inverter', 'Capacidad calculada', 'Evaluación técnica', 'Alcance detallado'].map((item) => (
                <li key={item}><Check aria-hidden="true" />{item}</li>
              ))}
            </ul>
            <Link className="button button-orange offer-button" href="/productos">
              Comparar modelos
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <BtuSelector />

      <section className="section shell compact-section">
        <div className="section-heading centered">
          <span className="section-kicker">Servicio técnico directo</span>
          <h2>¿Por qué CEROCLIMA?</h2>
        </div>
        <div className="pillar-grid">
          {pillars.map(({ title, icon: Icon }) => (
            <article className="pillar-card" key={title}>
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="brand-section" id="marcas" aria-labelledby="brand-section-title">
        <div className="shell">
          <div className="section-heading centered brand-heading">
            <span className="section-kicker">Equipamiento multimarca</span>
            <h2 id="brand-section-title">Marcas con las que trabajamos</h2>
            <p>
              Seleccionamos equipos según las necesidades técnicas, disponibilidad y alcance de cada proyecto.
            </p>
          </div>
          <div className="brand-grid">
            {partnerBrands.map((brand) => (
              <article
                className={`brand-tile${brand.theme === 'dark' ? ' brand-tile-dark' : ''}`}
                key={brand.name}
                aria-label={brand.name}
              >
                <Image src={brand.logo} alt={`Logotipo ${brand.name}`} width="220" height="80" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell" id="servicios">
        <div className="section-heading centered">
          <span className="section-kicker">Soluciones integrales</span>
          <h2>Nuestros servicios</h2>
          <p className="services-intro">Instalación y soporte para climatización residencial y comercial.</p>
        </div>
        <div className="service-grid">
          {services.map(({ title, description, icon: Icon, image, product }) => (
            <article className={`service-card${product ? ' service-card-product' : ''}`} key={title}>
              <Image src={image} alt="" width="1024" height="1536" />
              <div className="service-shade" />
              <div className="service-content">
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell" id="productos">
        <div className="products-entry glow-card">
          <div className="products-entry-visual">
            <Image
              src="/images/catalog/cassette-inverter.webp"
              alt="Equipo de climatización Cassette Inverter"
              width="900"
              height="650"
            />
          </div>
          <div className="products-entry-copy">
            <span className="section-kicker">Catálogo CEROCLIMA</span>
            <h2>Descubre nuestros productos</h2>
            <p>
              Revisa equipos residenciales y comerciales, bombas de calor, soluciones para agua caliente
              sanitaria y accesorios de instalación.
            </p>
            <div className="products-entry-categories" aria-label="Categorías del catálogo">
              <span>Aire acondicionado</span>
              <span>Bombas de calor y ACS</span>
              <span>Accesorios y control</span>
            </div>
            <Link className="button button-orange" href="/productos">
              Ver todos los productos <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="smart-card glow-card">
          <Image src="/images/smart-home.webp" alt="Aire acondicionado conectado mediante Wi-Fi a un teléfono" width="2048" height="1024" />
          <div className="smart-copy">
            <span className="section-kicker">Tecnología Smart Home</span>
            <h2>Controla tu clima<br />desde donde estés</h2>
            <p>Enciende, programa y ajusta la temperatura desde tu teléfono.</p>
            <div className="smart-pills">
              <span><Smartphone />Control móvil</span>
              <span><Snowflake />22° de confort</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell" id="proyectos">
        <div className="section-heading centered">
          <span className="section-kicker">Instalaciones CEROCLIMA</span>
          <h2>Proyectos</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <Image src={project.image} alt={`${project.title}: ${project.type}`} width="1024" height="1536" />
              <div className="project-caption">
                <span>{project.type}</span>
                <h3>{project.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell" id="nosotros">
        <div className="about-grid">
          <div className="about-copy">
            <span className="section-kicker">Sobre CEROCLIMA</span>
            <h2>21 años de experiencia detrás de cada instalación.</h2>
            <p>Acompañamos a hogares, comercios y empresas con soluciones eficientes, seguras y sustentables.</p>
            <p>Nuestro equipo técnico trabaja desde Arica hasta Los Lagos, priorizando instalaciones profesionales, terminaciones limpias y atención directa en cada proyecto.</p>
            <div className="about-signature">
              <Wrench aria-hidden="true" />
              <span><strong>Experiencia técnica</strong><small>Climatización y electricidad</small></span>
            </div>
          </div>
          <div className="about-photo">
            <Image src="/images/proyecto-sarabia.webp" alt="Proyecto técnico de climatización ejecutado por CEROCLIMA" width="1792" height="1024" />
          </div>
        </div>
      </section>

      <section className="section shell social-faq-grid">
        <article className="testimonial-card glow-card">
          <span className="section-kicker">Testimonios</span>
          <div className="rating-row" aria-label="5 de 5 estrellas">
            {[1, 2, 3, 4, 5].map((n) => <Star key={n} aria-hidden="true" fill="currentColor" />)}
            <strong>5.0 / 5</strong>
          </div>
          <blockquote>“¡Recomendable!”</blockquote>
          <cite>— Rosa María Venegas Urra</cite>
        </article>

        <div className="faq-card" id="preguntas">
          <span className="section-kicker">Preguntas Frecuentes</span>
          <Accordion className="faq-list">
            {faqs.map((faq, index) => (
              <AccordionItem className="faq-item" key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger className="faq-trigger">{faq.question}</AccordionTrigger>
                <AccordionContent className="faq-content"><p>{faq.answer}</p></AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="final-cta" id="contacto">
        <div className="energy energy-blue" />
        <div className="energy energy-orange" />
        <div className="shell final-inner">
          <h2>¿Necesitas climatizar tu hogar o negocio?</h2>
          <p>Cuéntanos qué espacio necesitas climatizar y te orientamos.</p>
          <div className="final-actions">
            <WhatsappButton light />
            <a className="phone-link" href="tel:+56996809677"><Phone />+56 9 9680 9677</a>
          </div>
        </div>
      </section>

      <SiteFooter whatsappHref={whatsapp} />
    </main>
  );
}
