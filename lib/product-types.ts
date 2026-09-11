export type ProductSegment = 'Residencial' | 'Comercial' | 'Energía térmica' | 'Accesorios';

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  title: string;
  brand: string;
  segment: ProductSegment;
  family: string;
  technology: string;
  refrigerant: string;
  capacity: string;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  models: string[];
  specs: ProductSpec[];
  datasheet?: string;
  datasheetLabel?: string;
  video?: string;
  note?: string;
};

export const productSegments: ProductSegment[] = ['Residencial', 'Comercial', 'Energía térmica', 'Accesorios'];

export function createEmptyProduct(): Product {
  return {
    slug: '',
    title: '',
    brand: 'CLARK',
    segment: 'Residencial',
    family: '',
    technology: 'Inverter',
    refrigerant: 'R32',
    capacity: '',
    image: '',
    gallery: [],
    description: '',
    features: [],
    models: [],
    specs: [],
  };
}

export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
