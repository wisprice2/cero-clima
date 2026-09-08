import Image from 'next/image';
import Link from 'next/link';

export function Brand({ homeHref = '/#inicio' }: { homeHref?: string }) {
  return (
    <Link className="brand" href={homeHref} aria-label="Cero Clima, inicio">
      <span className="brand-viewport" aria-hidden="true">
        <Image
          className="brand-image"
          src="/images/logo-cero-clima-oficial.png"
          alt=""
          width="1181"
          height="1181"
          priority
        />
      </span>
      <span className="brand-name">Cero Clima</span>
    </Link>
  );
}
