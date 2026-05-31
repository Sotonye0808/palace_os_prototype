import { ReactNode } from 'react';

interface InputProps {
  /** Input type (text, email, password, etc.) */
  type?: string;
  /** Input label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value: string;
  /** Value change handler */
  onChange: (value: string) => void;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Whether input is read-only */
  readOnly?: boolean;
  /** Whether input is required */
  required?: boolean;
  /** Error message to display */
  error?: string;
  /** Additional CSS class */
  className?: string;
  /** Input ID for label association */
  id?: string;
}

/**
 * Input component following Palace OS design system
 * Supports all standard input types with proper styling, focus states, and error handling
 */
export const Input = ({
  type = 'text',
  label,
  placeholder = '',
  value,
  onChange,
  disabled = false,
  readOnly = false,
  required = false,
  error,
  className = '',
  id
}: InputProps) => {
   // Base classes
   const baseClasses = 
     block w-full rounded-md border border-input bg-background px-3 py-2
     text-sm ring-offset-background file:border-0 file:bg-transparent
     file:text-sm file:focus:outline-none placeholder:text-muted-foreground
     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
     focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
     data-[state=invalid]:border-destructive
   ;

   // Label classes
   const labelClasses = 
     ext-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50
   ;

   // Input element
   return (
     <div className="space-y-1.5">
       {label && (
         <label
           htmlFor={id}
           className={labelClasses}
         >
           {label}
           {required && <span className="text-destructive">*</span>}
         </label>
       )}
       <input
         type={type}
         id={id}
         placeholder={placeholder}
         value={value}
         onChange={e => onChange(e.target.value)}
         disabled={disabled}
         readOnly={readOnly}
         required={required}
         className={baseClasses}
         aria-invalid={!!error ? 'true' : undefined}
         aria-describedby={error ? `${id}-error` : undefined}
       />
       {error && (
         <p id={`${id}-error`} className="text-sm text-destructive">
           {error}
         </p>
       )}
     </div>
   );
};
