import { Button } from '@/components/shared/Button';
import { useBrand } from '@/src/contexts/BrandContext';
import { useAuth } from '@/lib/auth/hooks/useAuth';
import { getRoleDisplayName } from '@/lib/auth/roleUtils';

export default function AdminDashboardPage() {
  const { brandId } = useBrand();
  const { user } = useAuth();
   
  return (
    <div className=\"p-6\">
      <div className=\"mb-6\">
        <h1 className=\"text-3xl font-semibold text-text-brand\">Admin Dashboard</h1>
        {user && (
          <div className=\"flex items-center space-x-4 mt-2\">
            <span className=\"text-text-sm text-text-muted\">Logged in as:</span>
            <span className=\"text-text-primary font-medium\">
              {getRoleDisplayName(user.role as any)}
            </span>
          </div>
        )}
        <p className=\"text-text-sm text-text-muted mt-2\">
          Manage your Palace OS platform
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className=\"grid gap-6 mb-8\">
        <div className=\"sm:grid-cols-2 lg:grid-cols-4\">
          {/* Stat Card */}
          <div className=\"bg-card rounded-xl border border-border/50 p-6\">
            <div className=\"flex items-center justify-between\">
              <div>
                <h3 className=\"text-lg font-medium text-text\">Total Users</h3>
                <p className=\"text-text-sm text-text-muted\">1,234</p>
              </div>
              <div className=\"w-10 h-10 bg-primary/20 rounded-flex items-center justify-center\">\n                <span className=\"text-text-primary\">??</span>\n              </div>\n            </div>\n          </div>\n\n          <div className=\"bg-card rounded-xl border border-border/50 p-6\">\n            <div className=\"flex items-center justify-between\">\n              <div>\n                <h3 className=\"text-lg font-medium text-text\">Active Orders</h3>\n                <p className=\"text-text-sm text-text-muted\">42</p>\n              </div>\n              <div className=\"w-10 h-10 bg-primary/20 rounded-flex items-center justify-center\">\n                <span className=\"text-text-primary\">??</span>\n              </div>\n            </div>\n          </div>\n\n          <div className=\"bg-card rounded-xl border border-border/50 p-6\">\n            <div className=\"flex items-center justify-between\">\n              <div>\n                <h3 className=\"text-lg font-medium text-text\">Table Reservations</h3>\n                <p className=\"text-text-sm text-text-muted\">18</p>\n              </div>\n              <div className=\"w-10 h-10 bg-primary/20 rounded-flex items-center justify-center\">\n                <span className=\"text-text-primary\">??</span>\n              </div>\n            </div>\n          </div>\n\n          <div className=\"bg-card rounded-xl border border-border/50 p-6\">\n            <div className=\"flex items-center justify-between\">\n              <div>\n                <h3 className=\"text-lg font-medium text-text\">Event Bookings</h3>\n                <p className=\"text-text-sm text-text-muted\">156</p>\n              </div>\n              <div className=\"w-10 h-10 bg-primary/20 rounded-flex items-center justify-center\">\n                <span className=\"text-text-primary\">??</span>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      {/* Quick Actions */}\n      <div className=\"grid gap-6 mb-8\">\n        <div className=\"sm:grid-cols-2 lg:grid-cols-3\">\n          {/* Action Card */}\n          <div className=\"bg-card rounded-xl border border-border/50 p-6\">\n            <div className=\"space-y-4\">\n              <h3 className=\"text-lg font-medium text-text\">Manage Users</h3>\n              <p className=\"text-text-sm text-text-muted\">Add, edit, and remove platform users</p>\n              <Button variant=\"outline\">Manage Users</Button>\n            </div>\n          </div>\n\n          <div className=\"bg-card rounded-xl border border-border/50 p-6\">\n            <div className=\"space-y-4\">\n              <h3 className=\"text-lg font-medium text-text\">Content Management</h3>\n              <p className=\"text-text-sm text-text-muted\">Update menus, venues, and brand settings</p>\n              <Button variant=\"outline\">Manage Content</Button>\n            </div>\n          </div>\n\n          <div className=\"bg-card rounded-xl border border-border/50 p-6\">\n            <div className=\"space-y-4\">\n              <h3 className=\"text-lg font-medium text-text\">View Analytics</h3>\n              <p className=\"text-text-sm text-text-muted\">Monitor platform performance and user engagement</p>\n              <Button variant=\"outline\">View Analytics</Button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  );
}
