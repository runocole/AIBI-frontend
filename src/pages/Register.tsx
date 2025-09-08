import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Brain, User, Mail, Lock, ArrowRight, Sparkles, Shield } from 'lucide-react';

const Register = () => {
  const { user, register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please ensure both password fields match",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Weak password",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await register(email, password, name);
      toast({
        title: "Welcome to AI-BI!",
        description: "Your account has been created successfully",
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.response?.data?.detail || "Please try again with different details",
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
      <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
      
      {/* Left Side - Registration Form */}
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
                  <Sparkles className="h-3 w-3 mr-1" />
                  Free Trial
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
              <CardDescription className="text-base">
                Join thousands of businesses transforming their data into insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="pl-10 h-12 bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Business Email</Label>
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
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 h-12 bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                    "Creating account..."
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
              
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </div>

              <div className="text-center">
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  ← Back to homepage
                </Link>
              </div>
              
              <div className="text-xs text-center text-muted-foreground">
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Benefits */}
      <div className="hidden lg:flex lg:flex-1 items-center justify-center p-12 relative">
        <div className="max-w-md animate-fade-in">
          <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mb-6 shadow-glow">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-6">
            Start Your
            <span className="bg-gradient-hero bg-clip-text text-transparent block mt-1">
              Intelligence Journey
            </span>
          </h2>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span>Automated data pipelines with Python & PostgreSQL</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span>Real-time KPI dashboards and analytics</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span>AI-powered predictive analytics</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span>Conversational AI for instant insights</span>
            </li>
          </ul>
          
          <div className="mt-8 p-4 bg-accent rounded-lg">
            <p className="text-sm text-accent-foreground">
              <strong>Free 30-day trial</strong> • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;