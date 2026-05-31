// apps/web/lib/auth/roleUtils.ts
import { User } from './hooks/useAuth';

// Define role hierarchy and permissions
export const ROLE_HIERARCHY = {
  super_admin: 4,
  bukka_manager: 3,
  secrets_manager: 3,
  marketer: 2,
  user: 1
} as const;

export type Role = keyof typeof ROLE_HIERARCHY;

// Check if user has at least the required role level
export const hasRole = (user: User | null, requiredRole: Role): boolean => {
  if (!user) return false;
  
  const userLevel = ROLE_HIERARCHY[user.role as Role] || 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole];
  
  return userLevel >= requiredLevel;
};

// Check if user exactly matches a role
export const isRole = (user: User | null, role: Role): boolean => {
  return user?.role === role;
};

// Get role display name
export const getRoleDisplayName = (role: Role): string => {
  const roleNames: Record<Role, string> = {
    super_admin: 'Super Administrator',
    bukka_manager: 'Bukka Manager',
    secrets_manager: 'Secrets Manager',
    marketer: 'Marketer',
    user: 'User'
  };
  
  return roleNames[role] || 'Unknown';
};

// Get accessible admin sections based on role
export const getAccessibleAdminSections = (user: User | null) => {
  if (!user) return [];
  
  const sections = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      path: '/admin/dashboard',
      requiredRole: 'user' as Role,
      icon: '📊'
    },
    {
      id: 'brand-config',
      title: 'Brand Configuration',
      path: '/admin/brand-config',
      requiredRole: 'super_admin' as Role,
      icon: '🏢'
    },
    {
      id: 'menu-config',
      title: 'Menu Configuration',
      path: '/admin/menu-config',
      requiredRole: 'bukka_manager' as Role,
      icon: '🍽️'
    },
    {
      id: 'venue-config',
      title: 'Venue Configuration',
      path: '/admin/venue-config',
      requiredRole: 'secrets_manager' as Role,
      icon: '🏨'
    },
    {
      id: 'analytics',
      title: 'Analytics',
      path: '/admin/analytics',
      requiredRole: 'marketer' as Role,
      icon: '📈'
    },
    {
      id: 'users',
      title: 'User Management',
      path: '/admin/users',
      requiredRole: 'super_admin' as Role,
      icon: '👥'
    }
  ];
  
  return sections.filter(section => hasRole(user, section.requiredRole));
};