'use client';

import { useRef, useState } from 'react';
import { Download, Upload, RotateCcw, LogOut, Snowflake, AlertTriangle, Cloud, Check, Loader2 } from 'lucide-react';
import type { Product } from '@/lib/product-types';
import { exportProductsJSON, importProductsJSON, logout, syncCatalogWithDatabase } from '@/lib/admin-store';

type ToolbarProps = {
  products: Product[];
  hasChanges: boolean;
  onImport: (products: Product[]) => void;
  onReset: () => void;
  onLogout: () => void;
};

export function AdminToolbar({ products, hasChanges, onImport, onReset, onLogout }: ToolbarProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  async function handleSyncDb() {
    setSyncing(true);
    const res = await syncCatalogWithDatabase(products);
    setSyncing(false);
    if (res.success) {
      setSynced(true);
      setTimeout(() => setSynced(false), 3000);
    } else {
      alert('Error al sincronizar con la base de datos: ' + (res.error || 'Error desconocido'));
    }
  }

  function handleExport() {
    exportProductsJSON(products);
  }

  async function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const imported = await importProductsJSON(file);
      onImport(imported);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error al importar');
    }
    if (fileInput.current) fileInput.current.value = '';
  }

  function handleReset() {
    if (confirm('¿Restaurar el catálogo original? Se perderán todos los cambios locales.')) {
      onReset();
    }
  }

  function handleLogout() {
    logout();
    onLogout();
  }

  return (
    <header className="admin-toolbar">
      <div className="admin-toolbar-brand">
        <Snowflake aria-hidden="true" />
        <span>CEROCLIMA <strong>Admin</strong></span>
      </div>

      <div className="admin-toolbar-info">
        <span className="admin-product-count">{products.length} productos</span>
        {hasChanges && (
          <span className="admin-unsaved-badge">
            <AlertTriangle aria-hidden="true" />
            Cambios sin guardar en BD
          </span>
        )}
      </div>

      <nav className="admin-toolbar-actions">
        <button
          className="admin-btn admin-btn-primary"
          type="button"
          onClick={handleSyncDb}
          disabled={syncing}
          title="Guardar y publicar catálogo en Neon Postgres (Vercel)"
        >
          {syncing ? (
            <Loader2 aria-hidden="true" style={{ animation: 'adminSpin 1s linear infinite' }} />
          ) : synced ? (
            <Check aria-hidden="true" />
          ) : (
            <Cloud aria-hidden="true" />
          )}
          <span>{syncing ? 'Guardando...' : synced ? '¡Guardado en BD!' : 'Guardar en BD Vercel'}</span>
        </button>
        <button className="admin-btn admin-btn-ghost" type="button" onClick={handleExport} title="Exportar JSON">
          <Download aria-hidden="true" />
          <span>Exportar</span>
        </button>
        <button className="admin-btn admin-btn-ghost" type="button" onClick={() => fileInput.current?.click()} title="Importar JSON">
          <Upload aria-hidden="true" />
          <span>Importar</span>
        </button>
        <input
          ref={fileInput}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="sr-only"
          aria-label="Seleccionar archivo JSON"
        />
        <button className="admin-btn admin-btn-ghost admin-btn-warning" type="button" onClick={handleReset} title="Restaurar datos originales">
          <RotateCcw aria-hidden="true" />
          <span>Restaurar</span>
        </button>
        <button className="admin-btn admin-btn-ghost" type="button" onClick={handleLogout} title="Cerrar sesión">
          <LogOut aria-hidden="true" />
          <span>Salir</span>
        </button>
      </nav>
    </header>
  );
}
