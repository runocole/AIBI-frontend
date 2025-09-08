import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const TopBar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="topbar flex items-center justify-between px-6 py-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">AI-BI Dashboard</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-sm text-muted-foreground">
          Welcome, {user?.name}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="flex items-center space-x-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default TopBar;