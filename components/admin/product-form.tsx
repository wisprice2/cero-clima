'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Save, Eye, AlertCircle } from 'lucide-react';
import { ImageUploader } from '@/components/admin/image-uploader';
import type { Product, ProductSpec } from '@/lib/product-types';
import { productSegments, slugify, createEmptyProduct } from '@/lib/product-types';

type ProductFormProps = {
  initial?: Product;
  existingSlugs: string[];
  onSave: (product: Product) => void;
  onCancel: () => void;
};

export function ProductForm({ initial, existingSlugs, onSave, onCancel }: ProductFormProps) {
  const isEditing = !!initial;
  const [product, setProduct] = useState<Product>(initial ?? createEmptyProduct());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [autoSlug, setAutoSlug] = useState(!isEditing);

  // Auto-generate slug from title
  useEffect(() => {
    if (autoSlug && product.title) {
      setProduct((prev) => ({ ...prev, slug: slugify(prev.title) }));
    }
  }, [product.title, autoSlug]);

  function updateField<K extends keyof Product>(key: K, value: Product[K]) {
    setProduct((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!product.slug.trim()) errs.slug = 'El slug es obligatorio.';
    else if (!isEditing && existingSlugs.includes(product.slug)) errs.slug = 'Este slug ya existe.';
    if (!product.title.trim()) errs.title = 'El título es obligatorio.';
    if (!product.brand.trim()) errs.brand = 'La marca es obligatoria.';
    if (!product.family.trim()) errs.family = 'La familia es obligatoria.';
    if (!product.description.trim()) errs.description = 'La descripción es obligatoria.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (validate()) {
      onSave(product);
    }
  }

  /* ── List field helpers ─────────────────────────────── */

  function addFeature() {
    updateField('features', [...product.features, '']);
  }
  function updateFeature(index: number, value: string) {
    const updated = [...product.features];
    updated[index] = value;
    updateField('features', updated);
  }
  function removeFeature(index: number) {
    updateField('features', product.features.filter((_, i) => i !== index));
  }

  function addModel() {
    updateField('models', [...product.models, '']);
  }
  function updateModel(index: number, value: string) {
    const updated = [...product.models];
    updated[index] = value;
    updateField('models', updated);
  }
  function removeModel(index: number) {
    updateField('models', product.models.filter((_, i) => i !== index));
  }

  function addSpec() {
    updateField('specs', [...product.specs, { label: '', value: '' }]);
  }
  function updateSpec(index: number, field: keyof ProductSpec, value: string) {
    const updated = [...product.specs];
    updated[index] = { ...updated[index], [field]: value };
    updateField('specs', updated);
  }
  function removeSpec(index: number) {
    updateField('specs', product.specs.filter((_, i) => i !== index));
  }

  function addGalleryImage() {
    updateField('gallery', [...product.gallery, '']);
  }
  function updateGalleryImage(index: number, value: string) {
    const updated = [...product.gallery];
    updated[index] = value;
    updateField('gallery', updated);
  }
  function removeGalleryImage(index: number) {
    updateField('gallery', product.gallery.filter((_, i) => i !== index));
  }

  /* ── Field error helper ─────────────────────────────── */

  function FieldError({ field }: { field: string }) {
    if (!errors[field]) return null;
    return <span className="admin-field-error"><AlertCircle aria-hidden="true" /> {errors[field]}</span>;
  }

  return (
    <form className="admin-product-form" onSubmit={handleSubmit}>
      <div className="admin-form-header">
        <button className="admin-btn admin-btn-ghost" type="button" onClick={onCancel}>
          <ArrowLeft aria-hidden="true" /> Volver
        </button>
        <h2>{isEditing ? `Editar: ${initial?.title}` : 'Nuevo producto'}</h2>
        <div className="admin-form-header-actions">
          {product.slug && (
            <a
              className="admin-btn admin-btn-ghost"
              href={`/productos/${product.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Eye aria-hidden="true" /> Preview
            </a>
          )}
          <button className="admin-btn admin-btn-primary" type="submit">
            <Save aria-hidden="true" /> {isEditing ? 'Guardar cambios' : 'Crear producto'}
          </button>
        </div>
      </div>

      {/* ── Identification ─────────────────────────────── */}
      <fieldset className="admin-fieldset">
        <legend>Identificación</legend>
        <div className="admin-form-grid">
          <label className="admin-field">
            <span>Título *</span>
            <input type="text" value={product.title} onChange={(e) => updateField('title', e.target.value)} placeholder="Split Muro Inverter R32" />
            <FieldError field="title" />
          </label>
          <label className="admin-field">
            <span>Slug {autoSlug && <small>(auto)</small>}</span>
            <input
              type="text"
              value={product.slug}
              onChange={(e) => { setAutoSlug(false); updateField('slug', e.target.value); }}
              placeholder="split-muro-inverter-r32"
              readOnly={isEditing}
            />
            <FieldError field="slug" />
          </label>
          <label className="admin-field">
            <span>Marca *</span>
            <input type="text" value={product.brand} onChange={(e) => updateField('brand', e.target.value)} placeholder="CLARK" />
            <FieldError field="brand" />
          </label>
        </div>
      </fieldset>

      {/* ── Classification ─────────────────────────────── */}
      <fieldset className="admin-fieldset">
        <legend>Clasificación</legend>
        <div className="admin-form-grid">
          <label className="admin-field">
            <span>Segmento</span>
            <select value={product.segment} onChange={(e) => updateField('segment', e.target.value as Product['segment'])}>
              {productSegments.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="admin-field">
            <span>Familia *</span>
            <input type="text" value={product.family} onChange={(e) => updateField('family', e.target.value)} placeholder="Split muro" />
            <FieldError field="family" />
          </label>
          <label className="admin-field">
            <span>Tecnología</span>
            <input type="text" value={product.technology} onChange={(e) => updateField('technology', e.target.value)} placeholder="Inverter" />
          </label>
          <label className="admin-field">
            <span>Refrigerante</span>
            <input type="text" value={product.refrigerant} onChange={(e) => updateField('refrigerant', e.target.value)} placeholder="R32" />
          </label>
          <label className="admin-field">
            <span>Capacidad</span>
            <input type="text" value={product.capacity} onChange={(e) => updateField('capacity', e.target.value)} placeholder="9.000 a 36.000 BTU/h" />
          </label>
        </div>
      </fieldset>

      {/* ── Content ─────────────────────────────── */}
      <fieldset className="admin-fieldset">
        <legend>Contenido</legend>
        <label className="admin-field admin-field-full">
          <span>Descripción *</span>
          <textarea
            value={product.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Descripción del producto..."
            rows={3}
          />
          <FieldError field="description" />
        </label>
        <label className="admin-field admin-field-full">
          <span>Nota (opcional)</span>
          <input type="text" value={product.note ?? ''} onChange={(e) => updateField('note', e.target.value || undefined)} placeholder="Nota al pie del producto" />
        </label>
      </fieldset>

      {/* ── Features ─────────────────────────────── */}
      <fieldset className="admin-fieldset">
        <legend>Características</legend>
        <div className="admin-dynamic-list">
          {product.features.map((feature, i) => (
            <div key={i} className="admin-dynamic-row">
              <input type="text" value={feature} onChange={(e) => updateFeature(i, e.target.value)} placeholder={`Característica ${i + 1}`} />
              <button type="button" className="admin-action-btn admin-action-danger" onClick={() => removeFeature(i)} title="Quitar"><Trash2 aria-hidden="true" /></button>
            </div>
          ))}
          <button type="button" className="admin-btn admin-btn-ghost" onClick={addFeature}><Plus aria-hidden="true" /> Agregar característica</button>
        </div>
      </fieldset>

      {/* ── Models ─────────────────────────────── */}
      <fieldset className="admin-fieldset">
        <legend>Modelos / Variantes</legend>
        <div className="admin-dynamic-list">
          {product.models.map((model, i) => (
            <div key={i} className="admin-dynamic-row">
              <input type="text" value={model} onChange={(e) => updateModel(i, e.target.value)} placeholder={`Modelo ${i + 1}`} />
              <button type="button" className="admin-action-btn admin-action-danger" onClick={() => removeModel(i)} title="Quitar"><Trash2 aria-hidden="true" /></button>
            </div>
          ))}
          <button type="button" className="admin-btn admin-btn-ghost" onClick={addModel}><Plus aria-hidden="true" /> Agregar modelo</button>
        </div>
      </fieldset>

      {/* ── Specs ─────────────────────────────── */}
      <fieldset className="admin-fieldset">
        <legend>Especificaciones técnicas</legend>
        <div className="admin-dynamic-list">
          {product.specs.map((spec, i) => (
            <div key={i} className="admin-dynamic-row admin-spec-row">
              <input type="text" value={spec.label} onChange={(e) => updateSpec(i, 'label', e.target.value)} placeholder="Etiqueta" />
              <input type="text" value={spec.value} onChange={(e) => updateSpec(i, 'value', e.target.value)} placeholder="Valor" />
              <button type="button" className="admin-action-btn admin-action-danger" onClick={() => removeSpec(i)} title="Quitar"><Trash2 aria-hidden="true" /></button>
            </div>
          ))}
          <button type="button" className="admin-btn admin-btn-ghost" onClick={addSpec}><Plus aria-hidden="true" /> Agregar especificación</button>
        </div>
      </fieldset>

      {/* ── Media ─────────────────────────────── */}
      <fieldset className="admin-fieldset">
        <legend>Multimedia</legend>

        <div className="admin-field admin-field-full">
          <span className="admin-field-label">Imagen principal</span>
          <ImageUploader
            value={product.image}
            onChange={(dataUrl) => updateField('image', dataUrl)}
            onClear={() => updateField('image', '')}
            label="Subir imagen principal"
            maxWidth={1400}
          />
        </div>

        <div className="admin-gallery-section">
          <span className="admin-field-label">Galería</span>
          <div className="admin-gallery-grid">
            {product.gallery.map((img, i) => (
              <div key={i} className="admin-gallery-item">
                <ImageUploader
                  value={img}
                  onChange={(dataUrl) => updateGalleryImage(i, dataUrl)}
                  onClear={() => removeGalleryImage(i)}
                  label={`Vista ${i + 1}`}
                  maxWidth={1400}
                />
              </div>
            ))}
            <button type="button" className="admin-gallery-add" onClick={addGalleryImage}>
              <Plus aria-hidden="true" />
              <span>Agregar imagen</span>
            </button>
          </div>
        </div>

        <div className="admin-form-grid" style={{ marginTop: '1.25rem' }}>
          <label className="admin-field">
            <span>Ficha técnica (PDF)</span>
            <input type="text" value={product.datasheet ?? ''} onChange={(e) => updateField('datasheet', e.target.value || undefined)} placeholder="/fichas/mi-equipo.pdf" />
          </label>
          <label className="admin-field">
            <span>Etiqueta del botón de ficha</span>
            <input type="text" value={product.datasheetLabel ?? ''} onChange={(e) => updateField('datasheetLabel', e.target.value || undefined)} placeholder="Descargar ficha técnica" />
          </label>
          <label className="admin-field">
            <span>Video (opcional)</span>
            <input type="text" value={product.video ?? ''} onChange={(e) => updateField('video', e.target.value || undefined)} placeholder="/videos/mi-equipo.mp4" />
          </label>
        </div>
      </fieldset>

      {/* ── Submit ─────────────────────────────── */}
      <div className="admin-form-footer">
        <button className="admin-btn admin-btn-ghost" type="button" onClick={onCancel}>Cancelar</button>
        <button className="admin-btn admin-btn-primary" type="submit">
          <Save aria-hidden="true" /> {isEditing ? 'Guardar cambios' : 'Crear producto'}
        </button>
      </div>
    </form>
  );
}
