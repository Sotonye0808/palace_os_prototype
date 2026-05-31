import { ReactNode } from 'react';

interface ButtonProps {
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold';
  /** Button size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Whether button is loading */
  isLoading?: boolean;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Button children (label/icon) */
  children: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Whether to render as link */
  asChild?: boolean;
  /** href if rendering as link */
  href?: string;
}

/**
 * Button component following Palace OS design system
 * Variants: primary | secondary | ghost | danger | gold (Secrets only)
 * Sizes: sm (32px) | md (40px) | lg (48px) | xl (56px)
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  children,
  onClick,
  className = '',
  asChild = false,
  href
}: ButtonProps) => {
  // Base classes
  const baseClasses = 
    inline-flex items-center justify-center gap-2 rounded-md font-medium
    transition-all focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none
    whitespace-nowrap
  ;

  // Variant classes
  const variantClasses = {
    primary: 
      bg-primary text-primary-foreground hover:bg-primary/90
      focus-visible:ring-primary focus-visible:ring-offset-background
    ,
    secondary: 
      bg-secondary text-secondary-foreground hover:bg-secondary/90
      focus-visible:ring-secondary focus-visible:ring-offset-background
    ,
    ghost: 
      hover:bg-accent hover:text-accent-foreground
      focus-visible:ring-accent focus-visible:ring-offset-background
    ,
    danger: 
      bg-destructive text-destructive-foreground hover:bg-destructive/90
      focus-visible:ring-destructive focus-visible:ring-offset-background
    ,
    gold: 
      bg-border-gold text-border-gold hover:bg-border-gold/20
      focus-visible:ring-border-gold focus-visible:ring-offset-background
    
  };

  // Size classes
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-5 text-lg',
    xl: 'h-14 px-6 text-xl'
  };

  // Loading indicator
  const loadingIndicator = isLoading ? (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  ) : null;

  // Render as link or button
  const Component = asChild && href ? 'a' : 'button';

   return (
     <Component
       className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
       variant={variant}
       size={size}
       onClick={onClick}
       disabled={disabled || isLoading}
       {...(asChild && href && { href })}
       aria-label={isLoading ? 'Loading...' : undefined}
     >
      {isLoading ? (
        <>
          {loadingIndicator}
          <span className="sr-only">Loading...</span>
        </>
      ) : (
        children
      )}
    </Component>
  );
};
