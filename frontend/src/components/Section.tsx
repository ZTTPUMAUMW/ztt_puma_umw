import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'light' | 'dark' | 'elevated';
}

export default function Section({ children, className = '', variant = 'default' }: SectionProps) {
  const variantClass = variant !== 'default' ? `bg-${variant}` : '';
  
  return (
    <section className={`section-component ${variantClass} ${className}`.trim()}>
      {children}
    </section>
  );
}
