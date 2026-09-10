import type { ComponentPropsWithoutRef } from 'react';

export type LinkProps = ComponentPropsWithoutRef<'a'> & {
  href: string;
};

export function Link({ href, children, ...props }: LinkProps) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

export default Link;
