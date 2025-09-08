import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Calendar, Shield } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground mt-2">
          Your account information and settings
        </p>
      </div>

      <div className="max-w-2xl">
        <Card className="bi-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Account Information</span>
            </CardTitle>
            <CardDescription>
              Your personal details and account status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Full Name</p>
                  <p className="text-muted-foreground">{user?.name || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Email Address</p>
                  <p className="text-muted-foreground">{user?.email || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Account Status</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Member Since</p>
                  <p className="text-muted-foreground">
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h3 className="font-medium text-foreground mb-3">Account ID</h3>
              <code className="px-3 py-2 bg-muted rounded text-sm font-mono break-all">
                {user?.id || 'Not available'}
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;