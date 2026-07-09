import React from 'react';

type iconLinkProps = {
  href: string;
  label: string;
  svg: React.ReactNode;
};

export function IconLink({ label, svg, href }: iconLinkProps) {
  return (
    <a href={href} aria-label={label} target="_blank">
      {svg}
    </a>
  );
}
