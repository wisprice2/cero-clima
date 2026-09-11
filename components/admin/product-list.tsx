'use client';

import { useState, useMemo } from 'react';
import { Search, Plus, Pencil, Copy, Trash2, FileText, Image as ImageIcon, Video, SlidersHorizontal } from 'lucide-react';
import type { Product } from '@/lib/product-types';
import { productSegments } from '@/lib/product-types';

type ProductListProps = {
  products: Product[];
  onEdit: (slug: string) => void;
  onDuplicate: (slug: string) => void;
  onDelete: (slug: string) => void;
  onCreate: () => void;
};

export function ProductList({ products, onEdit, onDuplicate, onDelete, onCreate }: ProductListProps) {
  const [query, setQuery] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('Todos');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchSegment = segmentFilter === 'Todos' || p.segment === segmentFilter;
      const matchQuery = !q || [p.title, p.brand, p.slug, p.family, p.technology].join(' ').toLowerCase().includes(q);
      return matchSegment && matchQuery;
    });
  }, [products, query, segmentFilter]);

  const segmentCounts = useMemo(() => {
    const counts: Record<string, number> = { Todos: products.length };
    for (const s of productSegments) counts[s] = 0;
    for (const p of products) counts[p.segment] = (counts[p.segment] || 0) + 1;
    return counts;
  }, [products]);

  function handleDelete(product: Product) {
    if (confirm(`¿Eliminar "${product.title}"? Esta acción no se puede deshacer.`)) {
      onDelete(product.slug);
    }
  }

  return (
    <div className="admin-product-list">
      <div className="admin-list-header">
        <h2>Catálogo de Productos</h2>
        <button className="admin-btn admin-btn-primary" type="button" onClick={onCreate}>
          <Plus aria-hidden="true" /> Nuevo producto
        </button>
      </div>

      <div className="admin-list-controls">
        <label className="admin-search">
          <Search aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, marca o slug..."
          />
        </label>
        <div className="admin-segment-tabs">
          {['Todos', ...productSegments].map((s) => (
            <button
              key={s}
              type="button"
              className={segmentFilter === s ? 'active' : ''}
              onClick={() => setSegmentFilter(s)}
            >
              {s} <span>{segmentCounts[s] || 0}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="admin-list-count">
        <SlidersHorizontal aria-hidden="true" />
        <span>{filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}</span>
      </div>

      {filtered.length === 0 ? (
        <div className="admin-empty">
          <p>No se encontraron productos.</p>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Segmento</th>
                <th>Tecnología</th>
                <th>Capacidad</th>
                <th>Media</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.slug}>
                  <td className="admin-td-product">
                    <strong>{product.title}</strong>
                    <small>{product.brand} · {product.family}</small>
                    <code>{product.slug}</code>
                  </td>
                  <td>
                    <span className={`admin-badge admin-badge-${product.segment.toLowerCase().replace(/\s|é/g, '')}`}>
                      {product.segment}
                    </span>
                  </td>
                  <td>{product.technology}</td>
                  <td><small>{product.capacity}</small></td>
                  <td className="admin-td-media">
                    {product.image && <ImageIcon aria-label="Tiene imagen" />}
                    {product.datasheet && <FileText aria-label="Tiene ficha" />}
                    {product.video && <Video aria-label="Tiene video" />}
                  </td>
                  <td className="admin-td-actions">
                    <button type="button" onClick={() => onEdit(product.slug)} title="Editar" className="admin-action-btn">
                      <Pencil aria-hidden="true" />
                    </button>
                    <button type="button" onClick={() => onDuplicate(product.slug)} title="Duplicar" className="admin-action-btn">
                      <Copy aria-hidden="true" />
                    </button>
                    <button type="button" onClick={() => handleDelete(product)} title="Eliminar" className="admin-action-btn admin-action-danger">
                      <Trash2 aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
