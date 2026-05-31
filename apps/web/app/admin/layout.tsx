'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/lib/auth/hooks/useAuth';
import { getAccessibleAdminSections } from '@/lib/auth/roleUtils';

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();
  const accessibleSections = getAccessibleAdminSections(user);
  
  return (
    <div className="flex min-h-screen bg-bg text-text">
      {/* Sidebar */}
      <aside className="w-64 bg-border/50 border-r border-border">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-text-brand">Admin Panel</h2>
          <nav className="mt-4 space-y-2">
            {accessibleSections.map(section => (
              <a 
                key={section.id} 
                href={section.path} 
                className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-border/70 transition-colors"
              >
                <span>{section.icon}</span>
                <span>{section.title}</span>
              </a>
            ))}
          </nav>
        </div>
       </aside>
      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}

