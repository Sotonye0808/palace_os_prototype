import { ReactNode } from 'react';

interface TextareaProps {
  /** Textarea id */
  id?: string;
  /** Textarea name */
  name?: string;
  /** Textarea value */
  value: string;
  /** Textarea onChange handler */
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Textarea placeholder */
  placeholder?: string;
  /** Number of rows */
  rows?: number;
  /** Additional CSS class */
  className?: string;
  /** Whether textarea is disabled */
  disabled?: boolean;
  /** Whether textarea is required */
  required?: boolean;
}

/**
 * Textarea component following Palace OS design system
 */
export const Textarea = ({
  id,
  name,
  value,
  onChange,
  placeholder = '',
  rows = 4,
  className = '',
  disabled = false,
  required = false,
}: TextareaProps) => {
  // Base classes
  const baseClasses = `
    block w-full rounded-md border border-input bg-background px-3 py-2
    text-sm ring-offset-background file:border-0 file:bg-transparent
    file:text-sm file:focus:outline-none placeholder:text-muted-foreground
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
    focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
    resize-none
  `.trim();

  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`${baseClasses} ${className}`}
      disabled={disabled}
      required={required}
    />
  );
};