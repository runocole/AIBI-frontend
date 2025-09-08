import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { datasetsAPI, kpisAPI } from '@/lib/api';
import { BarChart3, TrendingUp, DollarSign, Package, Users } from 'lucide-react';

interface Dataset {
  id: string;
  name: string;
}

interface SalesSummary {
  total_sales: number;
  total_orders: number;
  average_order_value: number;
  period: string;
}

interface TopProduct {
  product_name: string;
  sales: number;
  units_sold: number;
}

const KPIs = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<string>('');
  const [salesSummary, setSalesSummary] = useState<SalesSummary | null>(null);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadDatasets();
  }, []);

  useEffect(() => {
    if (selectedDataset) {
      loadKPIs();
    }
  }, [selectedDataset]);

  const loadDatasets = async () => {
    try {
      const data = await datasetsAPI.getAll();
      setDatasets(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load datasets",
        variant: "destructive",
      });
    }
  };

  const loadKPIs = async () => {
    if (!selectedDataset) return;

    setIsLoading(true);
    try {
      const [salesData, productsData] = await Promise.all([
        kpisAPI.getSalesSummary(selectedDataset),
        kpisAPI.getTopProducts(selectedDataset),
      ]);

      setSalesSummary(salesData);
      setTopProducts(productsData);
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: "Failed to load KPIs data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">KPIs & Analytics</h1>
        <p className="text-muted-foreground mt-2">
          View key performance indicators for your datasets
        </p>
      </div>

      {/* Dataset Selection */}
      <Card className="bi-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Select Dataset</span>
          </CardTitle>
          <CardDescription>
            Choose a dataset to view its analytics and KPIs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedDataset} onValueChange={setSelectedDataset}>
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="Select a dataset" />
            </SelectTrigger>
            <SelectContent>
              {datasets.map((dataset) => (
                <SelectItem key={dataset.id} value={dataset.id}>
                  {dataset.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="text-center py-8">
          <div className="text-muted-foreground">Loading KPIs...</div>
        </div>
      )}

      {selectedDataset && !isLoading && (
        <>
          {/* Sales Summary KPIs */}
          {salesSummary && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bi-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(salesSummary.total_sales)}</div>
                  <p className="text-xs text-muted-foreground">
                    Period: {salesSummary.period}
                  </p>
                </CardContent>
              </Card>

              <Card className="bi-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{salesSummary.total_orders.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Individual orders processed
                  </p>
                </CardContent>
              </Card>

              <Card className="bi-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(salesSummary.average_order_value)}</div>
                  <p className="text-xs text-muted-foreground">
                    Per order average
                  </p>
                </CardContent>
              </Card>

              <Card className="bi-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {((salesSummary.total_orders / (salesSummary.total_orders * 1.3)) * 100).toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Estimated conversion
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Top Products */}
          {topProducts.length > 0 && (
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bi-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Top Products by Sales</span>
                  </CardTitle>
                  <CardDescription>
                    Best performing products by revenue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
                            {index + 1}
                          </Badge>
                          <div>
                            <p className="font-medium text-foreground">{product.product_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {product.units_sold.toLocaleString()} units sold
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">{formatCurrency(product.sales)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Simple Visual Chart */}
              <Card className="bi-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Sales Distribution</span>
                  </CardTitle>
                  <CardDescription>
                    Visual representation of top products
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => {
                      const maxSales = Math.max(...topProducts.map(p => p.sales));
                      const percentage = (product.sales / maxSales) * 100;
                      
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium truncate">{product.product_name}</span>
                            <span className="text-muted-foreground">{formatCurrency(product.sales)}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}

      {selectedDataset && !isLoading && !salesSummary && !topProducts.length && (
        <Card className="bi-card">
          <CardContent className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No KPI data available</h3>
            <p className="text-muted-foreground">
              This dataset doesn't have sales data or KPIs haven't been processed yet.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KPIs;