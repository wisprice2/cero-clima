export const equipment = [
  {
    title: 'Split Muro Inverter',
    category: 'Residencial · R410A',
    capacity: '9.000 a 24.000 BTU/h',
    image: '/images/catalog/split-muro-inverter-r32.webp',
    description: 'Climatización frío/calor con compresor Inverter para dormitorios, livings y oficinas.',
    features: ['Auto Start', 'Bajo nivel de ruido', 'Temporizador'],
  },
  {
    title: 'Split Muro Convencional',
    category: 'Residencial · R410A',
    capacity: '9.000 a 24.000 BTU/h',
    image: '/images/catalog/split-muro-convencional.webp',
    description: 'Alternativa mural frío/calor en cuatro capacidades para climatización de uso cotidiano.',
    features: ['Auto Start', 'Operación silenciosa', 'Temporizador'],
  },
  {
    title: 'Aire de Ventana',
    category: 'Residencial · Compacto',
    capacity: 'Formato integrado',
    image: '/images/catalog/aire-ventana.webp',
    description: 'Equipo compacto que reúne la climatización en una sola unidad para instalaciones específicas.',
    features: ['Diseño compacto', 'Control frontal', 'Solución integral'],
  },
  {
    title: 'Equipo Portátil',
    category: 'Residencial · Móvil',
    capacity: '12.000 BTU/h',
    image: '/images/catalog/aire-portatil-12000.webp',
    description: 'Solución desplazable con frío/calor, deshumidificación y funcionamiento nocturno de bajo ruido.',
    features: ['Modo dormir', 'Temporizador', 'Indicador de agua'],
  },
  {
    title: 'Cassette Inverter R32',
    category: 'Comercial · Cielo',
    capacity: '18.000 a 60.000 BTU/h',
    image: '/images/catalog/cassette-inverter.webp',
    description: 'Distribución de aire para recintos amplios con panel de cielo y bomba de condensado incorporada.',
    features: ['Refrigerante R32', 'Descongelado inteligente', 'Control remoto'],
  },
  {
    title: 'Split Ducto Inverter',
    category: 'Comercial · Oculto',
    capacity: '18.000 a 60.000 BTU/h',
    image: '/images/catalog/ducto-inverter.webp',
    description: 'Unidad interior canalizable para proyectos que requieren distribución discreta por ductos.',
    features: ['Deshumidificación', 'Auto Start', 'Termostato'],
  },
  {
    title: 'Cielo Piso Inverter R32',
    category: 'Comercial · Versátil',
    capacity: '24.000 a 60.000 BTU/h',
    image: '/images/catalog/cielo-piso-inverter.webp',
    description: 'Formato adaptable a cielo o muro bajo para locales, oficinas y salones de mayor superficie.',
    features: ['Refrigerante R32', 'Bajo nivel de ruido', 'Deshumidificación'],
  },
  {
    title: 'Cortina de Aire',
    category: 'Comercial · Accesos',
    capacity: 'Series CAC-090 / 120 / 150',
    image: '/images/catalog/cortina-de-aire.webp',
    description: 'Barrera de aire para accesos comerciales con tránsito frecuente y puertas abiertas.',
    features: ['Tres formatos', 'Instalación sobre acceso', 'Uso comercial'],
  },
];

export const thermalSolutions = [
  {
    title: 'Bombas de calor',
    label: 'Climatización y aplicaciones térmicas',
    image: '/images/catalog/bomba-de-calor.webp',
    description: 'Soluciones eficientes para calefacción y otros requerimientos térmicos, dimensionadas según las condiciones reales del proyecto.',
    features: ['Evaluación técnica', 'Dimensionamiento por proyecto', 'Instalación profesional'],
  },
  {
    title: 'Agua caliente sanitaria',
    label: 'Bombas y sistemas ACS',
    image: null,
    description: 'Configuraciones para producción de agua caliente sanitaria, definidas según demanda, acumulación disponible y condiciones de instalación.',
    features: ['Análisis de demanda', 'Integración hidráulica', 'Solución a medida'],
  },
];

export const accessories = [
  {
    title: 'Bomba de condensado',
    detail: 'Evacuación auxiliar de condensación para instalaciones donde el drenaje gravitacional no es viable.',
    image: '/images/catalog/bomba-condensado.webp',
  },
  {
    title: 'Termostato cableado',
    detail: 'Control de temperatura, modo, ventilación y programación para equipos compatibles.',
    image: '/images/catalog/termostato.webp',
  },
  {
    title: 'Soportes para equipos',
    detail: 'Soportes metálicos AF, AG y SF para el montaje seguro de unidades exteriores.',
    image: '/images/catalog/soporte-af.webp',
  },
  {
    title: 'Refrigerante R134a',
    detail: 'Bombona de refrigerante disponible como insumo técnico sujeto a evaluación y disponibilidad.',
    image: '/images/catalog/refrigerante-r134a.webp',
  },
];

export function productInquiry(product: string) {
  return `https://wa.me/56996809677?text=${encodeURIComponent(`Hola Cero Clima, quisiera cotizar ${product}. ¿Me pueden orientar sobre las opciones y la instalación?`)}`;
}
