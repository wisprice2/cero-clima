'use client';

import { useState } from 'react';
import { Lock, AlertCircle, Snowflake } from 'lucide-react';

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');

    // Tiny delay for UX feel
    await new Promise((r) => setTimeout(r, 400));

    const { authenticate } = await import('@/lib/admin-store');
    if (authenticate(password)) {
      onSuccess();
    } else {
      setError('Contraseña incorrecta');
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-wrapper">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <div className="admin-login-logo">
          <Snowflake aria-hidden="true" />
        </div>
        <h1>Panel Administrativo</h1>
        <p>CEROCLIMA — Gestión del catálogo</p>

        <label className="admin-field">
          <span>Contraseña</span>
          <div className="admin-input-group">
            <Lock aria-hidden="true" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa la contraseña"
              autoFocus
              required
            />
          </div>
        </label>

        {error && (
          <div className="admin-error">
            <AlertCircle aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        <button className="admin-btn admin-btn-primary" type="submit" disabled={loading}>
          {loading ? 'Verificando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}
