'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/components/link';
import { ArrowRight, Check, Columns3, FileDown, Search, SlidersHorizontal, Trash2, X } from 'lucide-react';

import { products, productSegments, productInquiry } from '@/lib/products';
import type { Product } from '@/lib/products';

const all = 'Todos';

function ProductCard({
  product,
  selected,
  compareLimitReached,
  onToggleCompare,
}: {
  product: Product;
  selected: boolean;
  compareLimitReached: boolean;
  onToggleCompare: (slug: string) => void;
}) {
  return (
    <article className="equipment-card catalog-product-card">
      <div className="equipment-media">
        <Image src={product.image} alt={product.title} width="900" height="650" />
        <span>{product.brand} · {product.family}</span>
      </div>
      <div className="equipment-copy">
        <div className="product-card-meta">
          <span>{product.segment}</span>
          <span>{product.technology}</span>
          <span>{product.refrigerant}</span>
        </div>
        <p className="equipment-capacity">{product.capacity}</p>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <ul>
          {product.features.slice(0, 3).map((feature) => (
            <li key={feature}><Check aria-hidden="true" />{feature}</li>
          ))}
        </ul>
        <div className="product-card-actions">
          <Link className="text-link" href={`/productos/${product.slug}`}>
            Ver detalles <ArrowRight aria-hidden="true" />
          </Link>
          {product.datasheet ? (
            <a className="sheet-link" href={product.datasheet} download>
              <FileDown aria-hidden="true" /> Ficha PDF
            </a>
          ) : null}
          <button
            className="compare-card-button"
            type="button"
            aria-pressed={selected}
            disabled={compareLimitReached && !selected}
            onClick={() => onToggleCompare(product.slug)}
            title={compareLimitReached && !selected ? 'Puedes comparar hasta 3 productos' : undefined}
          >
            <Columns3 aria-hidden="true" /> {selected ? 'Seleccionado' : 'Comparar'}
          </button>
        </div>
      </div>
    </article>
  );
}

export function CatalogExplorer() {
  const [items, setItems] = useState<Product[]>(products);
  const [segment, setSegment] = useState<string>(all);
  const [technology, setTechnology] = useState(all);
  const [refrigerant, setRefrigerant] = useState(all);
  const [query, setQuery] = useState('');
  const [comparison, setComparison] = useState<string[]>([]);
  const comparisonDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch(() => {});
  }, []);

  const technologies = useMemo(() => [all, ...Array.from(new Set(items.map((p) => p.technology)))], [items]);
  const refrigerants = useMemo(() => [all, ...Array.from(new Set(items.map((p) => p.refrigerant)))], [items]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('es');
    return items.filter((product) => {
      const searchable = [
        product.title,
        product.brand,
        product.family,
        product.capacity,
        product.refrigerant,
        ...product.models,
      ].join(' ').toLocaleLowerCase('es');

      return (segment === all || product.segment === segment)
        && (technology === all || product.technology === technology)
        && (refrigerant === all || product.refrigerant === refrigerant)
        && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [items, query, refrigerant, segment, technology]);

  const hasFilters = segment !== all || technology !== all || refrigerant !== all || query.length > 0;
  const selectedProducts = items.filter((product) => comparison.includes(product.slug));
  const toggleComparison = (slug: string) => {
    setComparison((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      return current.length < 3 ? [...current, slug] : current;
    });
  };
  const reset = () => {
    setSegment(all);
    setTechnology(all);
    setRefrigerant(all);
    setQuery('');
  };

  return (
    <section className="section shell catalog-explorer" id="catalogo" aria-labelledby="catalog-title">
      <div className="category-heading catalog-explorer-heading">
        <div>
          <span className="section-kicker">Catálogo técnico</span>
          <h2 id="catalog-title">Encuentra la solución adecuada</h2>
        </div>
        <p>Filtra por aplicación, tecnología o refrigerante. Selecciona “Comparar” en dos o tres equipos para revisarlos lado a lado.</p>
      </div>

      <div className="catalog-toolbar" aria-label="Filtros del catálogo">
        <label className="catalog-search">
          <Search aria-hidden="true" />
          <span className="sr-only">Buscar productos</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por equipo, serie o modelo"
          />
        </label>
        <label>
          <span>Tecnología</span>
          <select value={technology} onChange={(event) => setTechnology(event.target.value)}>
            {technologies.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Refrigerante</span>
          <select value={refrigerant} onChange={(event) => setRefrigerant(event.target.value)}>
            {refrigerants.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>

      <fieldset className="segment-filter">
        <legend className="sr-only">Filtrar por aplicación</legend>
        {[all, ...productSegments].map((item) => (
          <button
            type="button"
            key={item}
            className={segment === item ? 'active' : ''}
            onClick={() => setSegment(item)}
            aria-pressed={segment === item}
          >
            {item}
            <span>{item === all ? products.length : products.filter((product) => product.segment === item).length}</span>
          </button>
        ))}
      </fieldset>

      <div className="catalog-results-bar" aria-live="polite">
        <span><SlidersHorizontal aria-hidden="true" />{filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}</span>
        {hasFilters ? <button type="button" onClick={reset}><X aria-hidden="true" /> Limpiar filtros</button> : null}
      </div>

      {filtered.length ? (
        <div className="equipment-grid catalog-results">
          {filtered.map((product) => (
            <ProductCard
              product={product}
              key={product.slug}
              selected={comparison.includes(product.slug)}
              compareLimitReached={comparison.length >= 3}
              onToggleCompare={toggleComparison}
            />
          ))}
        </div>
      ) : (
        <div className="catalog-empty">
          <h3>No encontramos productos con esos filtros.</h3>
          <p>Prueba otra tecnología, refrigerante o término de búsqueda.</p>
          <button className="button button-orange" type="button" onClick={reset}>Ver todo el catálogo</button>
        </div>
      )}

      <dialog className="comparison-dialog" ref={comparisonDialog} aria-labelledby="comparison-title">
        <div className="comparison-dialog-inner">
          <div className="comparison-dialog-header">
            <div>
              <span className="section-kicker">Comparación rápida</span>
              <h3 id="comparison-title">Equipos seleccionados</h3>
              <p>Contrasta capacidad, tecnología, refrigerante y modelos antes de solicitar una cotización.</p>
            </div>
            <button
              className="dialog-close"
              type="button"
              aria-label="Cerrar comparación"
              onClick={() => comparisonDialog.current?.close()}
            >
              <X aria-hidden="true" />
            </button>
          </div>

          <div className="comparison-grid">
            {selectedProducts.map((product) => (
              <article key={product.slug}>
                <button
                  className="comparison-remove"
                  type="button"
                  onClick={() => {
                    if (selectedProducts.length === 1) comparisonDialog.current?.close();
                    toggleComparison(product.slug);
                  }}
                  aria-label={`Quitar ${product.title} de la comparación`}
                >
                  <X aria-hidden="true" />
                </button>
                <Image src={product.image} alt="" width="420" height="300" />
                <span>{product.brand} · {product.family}</span>
                <h4>{product.title}</h4>
                <dl>
                  <div><dt>Capacidad</dt><dd>{product.capacity}</dd></div>
                  <div><dt>Tecnología</dt><dd>{product.technology}</dd></div>
                  <div><dt>Refrigerante</dt><dd>{product.refrigerant}</dd></div>
                  <div><dt>Modelos</dt><dd>{product.models.slice(0, 4).join(', ')}</dd></div>
                </dl>
                <Link className="text-link" href={`/productos/${product.slug}`}>Ver detalles <ArrowRight aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </div>
      </dialog>

      {selectedProducts.length ? (
        <aside className="comparison-dock" aria-live="polite" aria-label="Productos seleccionados para comparar">
          <div>
            <Columns3 aria-hidden="true" />
            <span><strong>{selectedProducts.length}</strong> de 3 seleccionados</span>
          </div>
          <div className="comparison-dock-actions">
            <button type="button" onClick={() => setComparison([])} aria-label="Limpiar comparación">
              <Trash2 aria-hidden="true" />
            </button>
            <button
              className="button button-orange"
              type="button"
              disabled={selectedProducts.length < 2}
              onClick={() => comparisonDialog.current?.showModal()}
            >
              Comparar {selectedProducts.length > 1 ? selectedProducts.length : ''}
            </button>
          </div>
        </aside>
      ) : null}

      <div className="catalog-guidance glow-card">
        <div>
          <span className="section-kicker">¿Necesitas comparar modelos?</span>
          <h3>Te ayudamos a validar capacidad, alimentación y condiciones de instalación.</h3>
        </div>
        <a className="button button-whatsapp" href={productInquiry('una solución de climatización')}>
          Solicitar orientación <ArrowRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
