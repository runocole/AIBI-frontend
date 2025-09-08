import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Brain, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

const Login = () => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "Successfully signed in to your dashboard",
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.response?.data?.detail || "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
      
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:flex-1 items-center justify-center p-12 relative">
        <div className="max-w-md text-center animate-fade-in">
          <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-glow">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Welcome to
            <span className="bg-gradient-hero bg-clip-text text-transparent block mt-2">
              AI-BI Platform
            </span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Transform your data into actionable insights with our AI-powered business intelligence platform.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Trusted by 500+ enterprises worldwide</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8 animate-slide-up">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center mx-auto mb-4">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">AI-BI Platform</h1>
          </div>

          <Card className="bg-card/50 backdrop-blur border-border/50 shadow-elevated">
            <CardHeader className="space-y-1 text-center">
              <div className="flex items-center justify-center mb-2">
                <Badge variant="secondary" className="px-3 py-1">
                  <Lock className="h-3 w-3 mr-1" />
                  Secure Access
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
              <CardDescription className="text-base">
                Enter your credentials to access your intelligence dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 h-12 bg-background/50"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 h-12 bg-background/50"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-medium bg-gradient-hero hover:opacity-90 transition-opacity" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Signing in..."
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
              
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Create your account
                </Link>
              </div>

              <div className="text-center">
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  ← Back to homepage
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;