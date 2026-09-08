import {
  AirVent,
  ArrowRight,
  Camera,
  BadgeCheck,
  Bolt,
  BriefcaseBusiness,
  Check,
  ClipboardCheck,
  Clock3,
  Gauge,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Smartphone,
  Snowflake,
  Sparkles,
  Star,
  ThermometerSun,
  ThumbsUp,
  Wrench,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Brand } from '@/components/brand';
import { SiteNavigation } from '@/components/site-navigation';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const whatsapp =
  'https://wa.me/56996809677?text=Hola%20Cero%20Clima%2C%20quiero%20cotizar%20una%20soluci%C3%B3n%20de%20climatizaci%C3%B3n.';

const trust = [
  { value: '19 años', label: 'Experiencia', icon: ShieldCheck },
  { value: 'Inverter', label: 'Tecnología eficiente', icon: Leaf },
  { value: 'Visita técnica', label: 'Sin costo', icon: ClipboardCheck },
  { value: 'Ñuble', label: 'Cobertura local', icon: MapPin },
];

const pillars = [
  { title: '19 años de experiencia', icon: BadgeCheck },
  { title: 'Ahorro energético', icon: Gauge },
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
    title: 'Instalación Split Inverter',
    icon: AirVent,
    image: '/images/proyecto-residencial-bulnes.png',
  },
  {
    title: 'Mantención y sanitización',
    icon: Sparkles,
    image: '/images/proyecto-optica-san-carlos.png',
  },
  {
    title: 'Evaluación y cubicación técnica',
    icon: ClipboardCheck,
    image: '/images/proyecto-chillan.png',
  },
  {
    title: 'Recambio de calefactores',
    icon: ThermometerSun,
    image: '/images/recambio-calefactores.png',
  },
  {
    title: 'Instalaciones eléctricas',
    icon: Bolt,
    image: '/images/proyecto-sarabia.png',
  },
];

const projects = [
  {
    title: 'Óptica San Carlos',
    image: '/images/proyecto-optica-san-carlos.png',
    type: 'Proyecto comercial',
  },
  {
    title: 'Residencial Bulnes',
    image: '/images/proyecto-residencial-bulnes.png',
    type: 'Climatización residencial',
  },
  {
    title: 'Proyecto Pinto',
    image: '/images/proyecto-pinto.png',
    type: 'Instalación exterior',
  },
  {
    title: 'Chillán',
    image: '/images/proyecto-chillan.png',
    type: 'Hogar y oficina',
  },
  {
    title: 'Proyecto Sarabia',
    image: '/images/proyecto-sarabia.png',
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
      'La oferta destacada considera instalación básica incluida. Confirmamos el alcance exacto después de revisar las condiciones del lugar.',
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
      'Atendemos Chillán, Chillán Viejo, San Carlos, Bulnes, Pinto y otras comunas de Ñuble, además de proyectos coordinados en Santiago.',
  },
];

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
    <main id="inicio">
      <header className="site-header">
        <div className="shell header-inner">
          <Brand />
          <SiteNavigation />
          <WhatsappButton />
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <Image
          className="hero-image"
          src="/images/hero-cero-clima.png"
          alt="Living moderno climatizado con aire acondicionado frío y calor"
          width="1792"
          height="1024"
        />
        <div className="hero-overlay" />
        <div className="shell hero-content">
          <div className="hero-copy">
            <div className="eyebrow">
              <Clock3 aria-hidden="true" />
              19 años de experiencia
            </div>
            <h1 id="hero-title">
              Climatización Inteligente y Sustentable para tu Hogar o Negocio
            </h1>
            <p>
              Equipos Split Inverter Frío/Calor con hasta 70% de ahorro energético y control por Wi-Fi.
            </p>
            <div className="hero-actions">
              <WhatsappButton />
              <a className="button button-orange" href="#oferta">
                Ver Paquetes
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
            <div className="hero-proof" aria-label="Indicadores de confianza">
              <span><BadgeCheck />Técnicos especialistas</span>
              <span><ClipboardCheck />Evaluación técnica</span>
              <span><Wrench />Instalación profesional</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-wrap" aria-label="Confianza Cero Clima">
        <div className="shell trust-bar">
          {trust.map(({ value, label, icon: Icon }) => (
            <article key={value}>
              <Icon aria-hidden="true" />
              <div><strong>{value}</strong><span>{label}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell" id="oferta">
        <div className="offer-card glow-card">
          <div className="offer-visual">
            <Image src="/images/split-inverter.png" alt="Equipo Split Inverter frío y calor" width="1536" height="1024" />
          </div>
          <div className="offer-copy">
            <span className="section-kicker">Paquete destacado</span>
            <h2>Aire Acondicionado<br />Split Inverter</h2>
            <div className="price">$399.990</div>
            <p>Equipo + instalación básica incluida</p>
            <ul className="check-grid">
              {['Frío / Calor', 'Tecnología Inverter', 'Instalación básica', 'Evaluación técnica', 'Control inteligente'].map((item) => (
                <li key={item}><Check aria-hidden="true" />{item}</li>
              ))}
            </ul>
            <a className="button button-orange offer-button" href={whatsapp}>
              Quiero cotizar
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-heading centered">
          <span className="section-kicker">Servicio técnico directo</span>
          <h2>¿Por qué Cero Clima?</h2>
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
          <h2>Nuestros Servicios</h2>
        </div>
        <div className="service-grid">
          {services.map(({ title, icon: Icon, image }) => (
            <article className="service-card" key={title}>
              <Image src={image} alt="" width="1024" height="1536" />
              <div className="service-shade" />
              <div className="service-content">
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
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
            <span className="section-kicker">Catálogo Cero Clima</span>
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
          <Image src="/images/smart-home.png" alt="Aire acondicionado conectado mediante Wi-Fi a un teléfono" width="2048" height="1024" />
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
          <span className="section-kicker">Instalaciones Cero Clima</span>
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

      <section className="section shell">
        <div className="recambio-card glow-card">
          <Image src="/images/recambio-calefactores.png" alt="Transición desde calefactor tradicional a climatización limpia" width="1792" height="1024" />
          <div className="recambio-copy">
            <span className="section-kicker orange">Aire más limpio</span>
            <h2>Recambio de calefactores</h2>
            <strong>Chillán y Chillán Viejo</strong>
            <p>Sustituye tu calefactor tradicional por una alternativa eficiente, segura y amable con el medio ambiente.</p>
            <a className="text-link" href={whatsapp}>Solicitar orientación <ArrowRight /></a>
          </div>
        </div>
      </section>

      <section className="section shell" id="nosotros">
        <div className="about-grid">
          <div className="about-copy">
            <span className="section-kicker">Sobre Cero Clima</span>
            <h2>19 años de experiencia detrás de cada instalación.</h2>
            <p>Acompañamos a hogares y negocios con soluciones eficientes, seguras y sustentables.</p>
            <p>Nuestro equipo técnico prioriza instalaciones profesionales, terminaciones limpias y atención directa en cada proyecto.</p>
            <div className="about-signature">
              <Wrench aria-hidden="true" />
              <span><strong>Experiencia técnica</strong><small>Climatización y electricidad</small></span>
            </div>
          </div>
          <div className="about-photo">
            <Image src="/images/tecnico-cero-clima.png" alt="Técnico de Cero Clima instalando un equipo Split" width="1792" height="1024" />
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
          <blockquote>“Recomendable !”</blockquote>
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

      <footer>
        <div className="shell footer-grid">
          <div className="footer-brand">
            <Brand />
            <span>Ceroclima SpA</span>
          </div>
          <a href={whatsapp}><MessageCircle />WhatsApp</a>
          <a href="mailto:ceroclima.cl@gmail.com"><Mail />ceroclima.cl@gmail.com</a>
          <span><MapPin />Ñuble / Santiago</span>
          <a href="https://www.instagram.com/cero_clima/" target="_blank" rel="noreferrer"><Camera />Instagram</a>
          <a href="https://www.facebook.com/ceroclima.climatizacion.sustentable" target="_blank" rel="noreferrer"><ThumbsUp />Facebook</a>
          <small>RUT 77.403.503-6</small>
        </div>
      </footer>

      <a className="floating-whatsapp" href={whatsapp} aria-label="Cotizar por WhatsApp">
        <MessageCircle aria-hidden="true" />
      </a>
    </main>
  );
}
