import type { Product } from './product-types';
import { products as defaultProducts } from './products';

const STORAGE_KEY = 'ceroclima_admin_products';
const AUTH_KEY = 'ceroclima_admin_auth';
const ADMIN_PASSWORD = 'CEROCLIMA_ADMIN';

/* ── Authentication ─────────────────────────────────────────────── */

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

export function authenticate(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function logout(): void {
  sessionStorage.removeItem(AUTH_KEY);
}

/* ── Product persistence (localStorage) ─────────────────────────── */

export function loadProducts(): Product[] {
  if (typeof window === 'undefined') return defaultProducts;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as Product[];
    } catch {
      return [...defaultProducts];
    }
  }
  return [...defaultProducts];
}

export function saveProducts(products: Product[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function resetProducts(): Product[] {
  localStorage.removeItem(STORAGE_KEY);
  return [...defaultProducts];
}

export function hasLocalChanges(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

/* ── Export / Import ─────────────────────────────────────────────── */

export function exportProductsJSON(products: Product[]): void {
  const json = JSON.stringify(products, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `products-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function importProductsJSON(file: File): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (!Array.isArray(data)) {
          reject(new Error('El archivo debe contener un array de productos.'));
          return;
        }
        // Basic structural validation
        for (const item of data) {
          if (!item.slug || !item.title || !item.segment) {
            reject(new Error(`Producto inválido: falta slug, title o segment.`));
            return;
          }
        }
        resolve(data as Product[]);
      } catch {
        reject(new Error('El archivo no contiene JSON válido.'));
      }
    };
    reader.onerror = () => reject(new Error('Error al leer el archivo.'));
    reader.readAsText(file);
  });
}

/* ── Neon / Vercel Database Synchronization ─────────────────────── */

export async function syncCatalogWithDatabase(products: Product[]): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: ADMIN_PASSWORD,
        products,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { success: false, error: data.error || `Error ${res.status}` };
    }

    saveProducts(products);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error de conexión con el servidor' };
  }
}

export async function fetchCatalogFromDatabase(): Promise<Product[] | null> {
  try {
    const res = await fetch('/api/products', { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      saveProducts(data);
      return data as Product[];
    }
    return null;
  } catch {
    return null;
  }
}

export { defaultProducts };

