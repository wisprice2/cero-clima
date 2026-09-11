'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Product } from '@/lib/product-types';
import { slugify } from '@/lib/product-types';
import { isAuthenticated, loadProducts, saveProducts, resetProducts, hasLocalChanges, fetchCatalogFromDatabase } from '@/lib/admin-store';

import { AdminLogin } from '@/components/admin/admin-login';
import { AdminToolbar } from '@/components/admin/admin-toolbar';
import { ProductList } from '@/components/admin/product-list';
import { ProductForm } from '@/components/admin/product-form';

type View = { mode: 'list' } | { mode: 'create' } | { mode: 'edit'; slug: string };

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<View>({ mode: 'list' });
  const [changes, setChanges] = useState(false);

  useEffect(() => {
    setAuthed(isAuthenticated());
    setProducts(loadProducts());
    setChanges(hasLocalChanges());

    fetchCatalogFromDatabase().then((dbProducts) => {
      if (dbProducts && dbProducts.length > 0) {
        setProducts(dbProducts);
      }
    });
  }, []);

  const persist = useCallback((updated: Product[]) => {
    setProducts(updated);
    saveProducts(updated);
    setChanges(true);
  }, []);

  /* ── CRUD handlers ─────────────────────────────── */

  function handleSave(product: Product) {
    if (view.mode === 'edit') {
      persist(products.map((p) => (p.slug === product.slug ? product : p)));
    } else {
      persist([...products, product]);
    }
    setView({ mode: 'list' });
  }

  function handleDelete(slug: string) {
    persist(products.filter((p) => p.slug !== slug));
  }

  function handleDuplicate(slug: string) {
    const source = products.find((p) => p.slug === slug);
    if (!source) return;
    const newSlug = slugify(source.title + '-copia');
    const copy: Product = { ...source, slug: newSlug, title: source.title + ' (copia)' };
    persist([...products, copy]);
  }

  function handleImport(imported: Product[]) {
    persist(imported);
    setView({ mode: 'list' });
  }

  function handleReset() {
    const original = resetProducts();
    setProducts(original);
    setChanges(false);
    setView({ mode: 'list' });
  }

  function handleLogout() {
    setAuthed(false);
  }

  /* ── Render ─────────────────────────────── */

  if (!authed) {
    return <AdminLogin onSuccess={() => { setAuthed(true); setProducts(loadProducts()); setChanges(hasLocalChanges()); }} />;
  }

  return (
    <div className="admin-shell">
      <AdminToolbar
        products={products}
        hasChanges={changes}
        onImport={handleImport}
        onReset={handleReset}
        onLogout={handleLogout}
      />
      <main className="admin-main">
        {view.mode === 'list' && (
          <ProductList
            products={products}
            onEdit={(slug) => setView({ mode: 'edit', slug })}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
            onCreate={() => setView({ mode: 'create' })}
          />
        )}
        {view.mode === 'create' && (
          <ProductForm
            existingSlugs={products.map((p) => p.slug)}
            onSave={handleSave}
            onCancel={() => setView({ mode: 'list' })}
          />
        )}
        {view.mode === 'edit' && (
          <ProductForm
            initial={products.find((p) => p.slug === view.slug)}
            existingSlugs={products.filter((p) => p.slug !== view.slug).map((p) => p.slug)}
            onSave={handleSave}
            onCancel={() => setView({ mode: 'list' })}
          />
        )}
      </main>
    </div>
  );
}
