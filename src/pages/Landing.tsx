import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Brain, 
  Database, 
  Zap, 
  MessageCircle, 
  Cloud,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Shield,
  Sparkles
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Database,
      title: "Automated Data Pipelines",
      description: "Ingest and clean data efficiently using Python & PostgreSQL with zero manual intervention."
    },
    {
      icon: BarChart3,
      title: "KPI Dashboards",
      description: "Visualize revenue, churn, and top customers with FastAPI-powered interactive dashboards."
    },
    {
      icon: Brain,
      title: "Predictive Analytics",
      description: "Forecast sales and predict customer churn using Scikit-learn, Prophet & XGBoost algorithms."
    },
    {
      icon: MessageCircle,
      title: "Conversational AI",
      description: "Built-in chatbot that answers analytics questions in natural language, instantly."
    },
    {
      icon: Cloud,
      title: "Cloud Deployment",
      description: "Containerized with Docker, deployed via CI/CD pipelines on AWS for maximum scalability."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with encrypted data pipelines and role-based access control."
    }
  ];

  const stats = [
    { label: "Data Processing Speed", value: "10x Faster", icon: Zap },
    { label: "Analytics Accuracy", value: "99.5%", icon: TrendingUp },
    { label: "Enterprise Clients", value: "500+", icon: Users },
    { label: "Uptime Guarantee", value: "99.9%", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                AI-BI
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-gradient-hero hover:opacity-90">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto text-center relative">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered Business Intelligence Platform
          </Badge>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 animate-fade-in">
            Transform Your Data Into
            <span className="bg-gradient-hero bg-clip-text text-transparent block mt-2">
              Actionable Insights
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-slide-up">
            An end-to-end solution to help businesses make smarter, data-driven decisions with 
            automated pipelines, predictive analytics, and conversational AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-hero hover:opacity-90 text-lg px-8 py-6">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="mx-auto w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-3">
                  <stat.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Platform Features
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Everything You Need for
              <span className="bg-gradient-hero bg-clip-text text-transparent block mt-2">
                Data-Driven Success
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive business intelligence tools powered by cutting-edge AI technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-elevated transition-all duration-300 animate-fade-in border-0 bg-gradient-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                  <div className="flex items-center mt-4 text-primary font-medium">
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <Card className="bg-gradient-hero p-12 text-center text-white border-0">
            <CardContent className="p-0">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join hundreds of companies already using AI-BI to make smarter decisions 
                with their data. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
                  Talk to Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-hero rounded flex items-center justify-center">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg">AI-BI</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 AI-BI. All rights reserved. Empowering businesses with intelligent data.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;