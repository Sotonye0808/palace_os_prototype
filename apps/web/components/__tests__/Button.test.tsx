import { render, screen } from '@testing-library/react';
import { Button } from '@/components/shared/Button';

describe('Button Component', () => {
  test('renders with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('applies primary variant by default', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole('button', { name: /primary/i });
    expect(button).toHaveClass(/bg-primary/);
  });

  test('applies secondary variant when specified', () => {
    render(<Button variant=\"secondary\">Secondary</Button>);
    const button = screen.getByRole('button', { name: /secondary/i });
    expect(button).toHaveClass(/bg-secondary/);
  });

  test('applies danger variant when specified', () => {
    render(<Button variant=\"danger\">Danger</Button>);
    const button = screen.getByRole('button', { name: /danger/i });
    expect(button).toHaveClass(/bg-destructive/);
  });

  test('applies gold variant when specified', () => {
    render(<Button variant=\"gold\">Gold</Button>);
    const button = screen.getByRole('button', { name: /gold/i });
    expect(button).toHaveClass(/bg-border-gold/);
  });

  test('applies size classes correctly', () => {
    render(<Button size=\"sm\">Small</Button>);
    const button = screen.getByRole('button', { name: /small/i });
    expect(button).toHaveClass(/h-8/);
    
    render(<Button size=\"lg\">Large</Button>);
    const button2 = screen.getByRole('button', { name: /large/i });
    expect(button2).toHaveClass(/h-12/);
  });

  test('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  test('handles loading state', () => {
    render(<Button isLoading>Loading...</Button>);
    const button = screen.getByRole('button', { name: /loading.../i });
    expect(button).toHaveClass(/animate-spin/);
  });

  test('calls onClick handler', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders as link when asChild and href are provided', () => {
    render(<Button asChild href=\"/\">Link Button</Button>);
    const link = screen.getByRole('link', { name: /link button/i });
    expect(link).toHaveAttribute('href', '/');
  });
});
