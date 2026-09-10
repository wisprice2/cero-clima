'use client';

import { useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from '@/components/link';

const links = [
  { href: '/#servicios', label: 'Servicios' },
  { href: '/productos', label: 'Productos' },
  { href: '/#marcas', label: 'Marcas' },
  { href: '/#proyectos', label: 'Proyectos' },
  { href: '/#nosotros', label: 'Nosotros' },
  { href: '/#contacto', label: 'Contacto' },
];

export function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  return (
    <div className="site-navigation">
      <nav className="desktop-navigation" aria-label="Navegación principal">
        {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
      </nav>
      <button
        ref={toggle}
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false);
          toggle.current?.focus();
        }
        }}
        onClick={() => setOpen(!open)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        <span>Menú</span>
      </button>
      <nav
        id="mobile-navigation"
        className="mobile-navigation"
        aria-label="Navegación móvil"
        hidden={!open}
      >
        {[{ href: '/#inicio', label: 'Inicio' }, ...links].map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>
        ))}
      </nav>
    </div>
  );
}
