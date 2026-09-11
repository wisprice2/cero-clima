import { Camera, Mail, MapPin, MessageCircle, ThumbsUp } from 'lucide-react';

import { Brand } from '@/components/brand';
import { productInquiry } from '@/lib/products';
import { SecretGate } from '@/components/secret-gate';

export function SiteFooter({
  whatsappHref = productInquiry('una solución de climatización'),
}: {
  whatsappHref?: string;
}) {
  return (
    <>
      <footer>
        <div className="shell footer-grid">
          <div className="footer-brand">
            <Brand />
            <span>CEROCLIMA SpA</span>
          </div>
          <a href={whatsappHref}><MessageCircle aria-hidden="true" />WhatsApp</a>
          <a href="mailto:ceroclima.cl@gmail.com"><Mail aria-hidden="true" />ceroclima.cl@gmail.com</a>
          <span><MapPin aria-hidden="true" />Arica a Los Lagos</span>
          <a href="https://www.instagram.com/cero_clima/" target="_blank" rel="noreferrer">
            <Camera aria-hidden="true" />Instagram
          </a>
          <a href="https://www.facebook.com/ceroclima.climatizacion.sustentable" target="_blank" rel="noreferrer">
            <ThumbsUp aria-hidden="true" />Facebook
          </a>
          <small>
            <SecretGate>RUT 77.403.503-6</SecretGate>
          </small>
        </div>
      </footer>

      <a className="floating-whatsapp" href={whatsappHref} aria-label="Cotizar por WhatsApp">
        <MessageCircle aria-hidden="true" />
      </a>
    </>
  );
}
