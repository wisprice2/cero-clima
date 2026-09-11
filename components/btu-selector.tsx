'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Calculator, Info, Ruler } from 'lucide-react';

const equipmentRanges = [
  { capacity: 9000, maxArea: 18 },
  { capacity: 12000, maxArea: 24 },
  { capacity: 18000, maxArea: 36 },
  { capacity: 24000, maxArea: 48 },
  { capacity: 36000, maxArea: 72 },
  { capacity: 48000, maxArea: 96 },
  { capacity: 60000, maxArea: 120 },
];

function formatBtu(value: number) {
  return new Intl.NumberFormat('es-CL').format(value);
}

export function BtuSelector() {
  const [area, setArea] = useState(20);

  const recommendation = useMemo(() => {
    return equipmentRanges.find((item) => area <= item.maxArea) ?? equipmentRanges.at(-1)!;
  }, [area]);

  const inquiry = `https://wa.me/56996809677?text=${encodeURIComponent(
    `Hola CEROCLIMA, necesito climatizar un espacio de ${area} m². El selector indica ${formatBtu(recommendation.capacity)} BTU/h. Quisiera confirmar la capacidad y cotizar una instalación.`,
  )}`;

  return (
    <section className="section shell btu-section" id="selector-btu" aria-labelledby="btu-title">
      <div className="btu-card glow-card">
        <div className="btu-copy">
          <span className="section-kicker">Calculadora rápida</span>
          <h2 id="btu-title">Selecciona los m² y estima tus BTU</h2>
          <p>
            Ajusta el tamaño del recinto para obtener una capacidad inicial. La recomendación definitiva se
            confirma con una evaluación técnica del espacio.
          </p>
          <div className="btu-note">
            <Info aria-hidden="true" />
            <span>Referencia inicial de 500 BTU por m² para altura estándar, ocupación habitual y aislación media.</span>
          </div>
        </div>

        <div className="btu-control-panel">
          <label htmlFor="area-range">
            <span><Ruler aria-hidden="true" /> Superficie del recinto</span>
            <strong>{area} m²</strong>
          </label>
          <input
            id="area-range"
            type="range"
            min="6"
            max="120"
            step="1"
            value={area}
            onChange={(event) => setArea(Number(event.target.value))}
            aria-valuetext={`${area} metros cuadrados`}
          />
          <div className="btu-scale" aria-hidden="true"><span>6 m²</span><span>120 m²</span></div>

          <div className="btu-result" aria-live="polite">
            <Calculator aria-hidden="true" />
            <div>
              <span>Capacidad sugerida</span>
              <strong>{formatBtu(recommendation.capacity)} BTU/h</strong>
              <small>Cobertura referencial: hasta {recommendation.maxArea} m²</small>
            </div>
          </div>

          <a className="button button-orange" href={inquiry}>
            Confirmar con un técnico <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
