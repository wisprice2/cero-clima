'use client';

import { useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

interface SecretGateProps {
  children?: React.ReactNode;
}

/**
 * Componente de acceso oculto al panel administrativo.
 * Integra tres vectores discretos:
 * 1. Enlace camuflado con opacidad ultrabaja (imperceptible a simple vista).
 * 2. Easter Egg de 5 toques rápidos sobre el contenido (ideal para móviles).
 * 3. Atajo de teclado global Ctrl+Shift+A / Cmd+Shift+A en toda la aplicación.
 */
export function SecretGate({ children }: SecretGateProps) {
  const router = useRouter();
  const clicks = useRef<number[]>([]);

  const navigateToAdmin = useCallback(() => {
    router.push('/admin');
  }, [router]);

  // Detector de 5 clics rápidos en menos de 2 segundos
  const handleRapidClick = useCallback(() => {
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < 2000), now];
    if (clicks.current.length >= 5) {
      clicks.current = [];
      navigateToAdmin();
    }
  }, [navigateToAdmin]);

  // Atajo de teclado global: Ctrl + Shift + A (o Cmd + Shift + A en macOS)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        navigateToAdmin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateToAdmin]);

  return (
    <span className="secret-gate-container">
      <span
        onClick={handleRapidClick}
        className="secret-gate-trigger"
        role="button"
        tabIndex={-1}
        title=""
        style={{ cursor: 'inherit', userSelect: 'none' }}
      >
        {children}
      </span>

      {/* Enlace sutil y camuflado: imperceptible a simple vista para visitantes convencionales */}
      <a
        href="/admin"
        className="stealth-admin-link"
        aria-label="Portal de gestión"
        title=""
        tabIndex={-1}
      >
        <Lock aria-hidden="true" size={10} />
      </a>
    </span>
  );
}
