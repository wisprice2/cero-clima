'use client';

import { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

type ImageUploaderProps = {
  value: string;
  onChange: (dataUrl: string) => void;
  onClear: () => void;
  label?: string;
  maxWidth?: number;
  quality?: number;
};

/**
 * Resizes an image file client-side using canvas and returns a data URL.
 * Keeps aspect ratio, converts to WebP (with JPEG fallback).
 */
function compressImage(file: File, maxWidth: number, quality: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) { reject(new Error('Canvas no soportado')); return; }

      ctx.drawImage(img, 0, 0, width, height);

      // Try WebP first, fallback to JPEG
      let dataUrl = canvas.toDataURL('image/webp', quality);
      if (!dataUrl.startsWith('data:image/webp')) {
        dataUrl = canvas.toDataURL('image/jpeg', quality);
      }

      resolve(dataUrl);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('No se pudo cargar la imagen'));
    };

    img.src = url;
  });
}

export function ImageUploader({
  value,
  onChange,
  onClear,
  label = 'Subir imagen',
  maxWidth = 1200,
  quality = 0.82,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  async function processFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten archivos de imagen.');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError('La imagen no puede superar los 20 MB.');
      return;
    }

    setError('');
    setProcessing(true);

    try {
      const dataUrl = await compressImage(file, maxWidth, quality);
      onChange(dataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar la imagen');
    } finally {
      setProcessing(false);
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) processFile(file);
    if (inputRef.current) inputRef.current.value = '';
  }

  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) processFile(file);
  }

  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
    setDragging(true);
  }

  function handleDragLeave() {
    setDragging(false);
  }

  const isDataUrl = value.startsWith('data:');
  const hasValue = !!value;

  return (
    <div className="admin-image-uploader">
      {hasValue ? (
        <div className="admin-upload-preview">
          <img
            src={value}
            alt="Preview"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="admin-upload-preview-actions">
            <button
              type="button"
              className="admin-action-btn"
              onClick={() => inputRef.current?.click()}
              title="Reemplazar imagen"
            >
              <Upload aria-hidden="true" />
            </button>
            <button
              type="button"
              className="admin-action-btn admin-action-danger"
              onClick={onClear}
              title="Quitar imagen"
            >
              <X aria-hidden="true" />
            </button>
          </div>
          {isDataUrl && <span className="admin-upload-badge">Imagen subida</span>}
          {!isDataUrl && <span className="admin-upload-badge admin-upload-badge-path">Ruta: {value}</span>}
        </div>
      ) : (
        <div
          className={`admin-upload-dropzone ${dragging ? 'admin-upload-dragging' : ''} ${processing ? 'admin-upload-processing' : ''}`}
          onClick={() => !processing && inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
        >
          {processing ? (
            <>
              <div className="admin-upload-spinner" />
              <span>Procesando imagen...</span>
            </>
          ) : (
            <>
              <ImageIcon aria-hidden="true" />
              <span>{label}</span>
              <small>Arrastra una imagen o haz clic para seleccionar</small>
              <small>JPG, PNG, WebP · máx. 20 MB</small>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="sr-only"
        aria-label={label}
      />

      {error && <span className="admin-field-error">{error}</span>}
    </div>
  );
}
