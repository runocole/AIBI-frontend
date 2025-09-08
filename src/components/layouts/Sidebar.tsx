import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Database, BarChart3, Upload, User } from 'lucide-react';

const navigation = [
  { name: 'Datasets', href: '/dashboard/datasets', icon: Database },
  { name: 'KPIs', href: '/dashboard/kpis', icon: BarChart3 },
  { name: 'Upload', href: '/dashboard/upload', icon: Upload },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar flex flex-col w-64 h-full border-r">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">AI-BI</h1>
        <p className="text-gray-300 text-sm mt-1">Business Intelligence</p>
      </div>
      
      <nav className="flex-1 px-4 pb-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;