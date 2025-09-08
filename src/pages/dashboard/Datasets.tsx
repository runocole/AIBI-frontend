import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { datasetsAPI } from '@/lib/api';
import { Database, Calendar, BarChart, Eye } from 'lucide-react';

interface Dataset {
  id: string;
  name: string;
  rows: number;
  columns: string[];
  upload_date: string;
  size_mb: number;
}
interface DatasetDetail {
  id: string;
  name: string;
  rows: number;
  columns: string[];
  upload_date: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  summary: Record<string, any>; 
}


const Datasets = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<DatasetDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  useEffect(() => {
    loadDatasets();
  }, []);

  const loadDatasets = async () => {
    try {
      const data = await datasetsAPI.getAll();
      setDatasets(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load datasets",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const viewDatasetDetail = async (datasetId: string) => {
    setIsLoadingDetail(true);
    try {
      const data = await datasetsAPI.getById(datasetId);
      setSelectedDataset(data);
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: "Failed to load dataset details",
        variant: "destructive",
      });
    } finally {
      setIsLoadingDetail(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading datasets...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Datasets</h1>
        <p className="text-muted-foreground mt-2">
          Manage and view your uploaded datasets
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Datasets List */}
        <div className="lg:col-span-2">
          <Card className="bi-table">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Your Datasets</span>
              </CardTitle>
              <CardDescription>
                {datasets.length} dataset{datasets.length !== 1 ? 's' : ''} available
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {datasets.length === 0 ? (
                <div className="text-center py-12">
                  <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No datasets</h3>
                  <p className="text-muted-foreground">
                    Upload your first dataset to get started
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Rows</TableHead>
                      <TableHead>Columns</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {datasets.map((dataset) => (
                      <TableRow key={dataset.id}>
                        <TableCell className="font-medium">{dataset.name}</TableCell>
                        <TableCell>{dataset.rows.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {dataset.columns.length} cols
                          </Badge>
                        </TableCell>
                        <TableCell>{dataset.size_mb.toFixed(1)} MB</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">
                              {new Date(dataset.upload_date).toLocaleDateString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewDatasetDetail(dataset.id)}
                            disabled={isLoadingDetail}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Dataset Detail */}
        <div>
          {selectedDataset ? (
            <Card className="bi-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart className="h-5 w-5" />
                  <span>Dataset Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground">{selectedDataset.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedDataset.rows.toLocaleString()} rows
                  </p>
                </div>

                <div>
                  <h5 className="font-medium text-sm mb-2">Columns</h5>
                  <div className="space-y-1">
                    {selectedDataset.columns.map((column, index) => (
                      <div
                        key={index}
                        className="px-2 py-1 bg-muted rounded text-xs"
                      >
                        {column}
                      </div>
                    ))}
                  </div>
                </div>

                {selectedDataset.summary && (
                  <div>
                    <h5 className="font-medium text-sm mb-2">Summary</h5>
                    <div className="space-y-2 text-xs">
                      {Object.entries(selectedDataset.summary).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-muted-foreground">{key}:</span>
                          <span className="font-mono">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="bi-card">
              <CardContent className="text-center py-12">
                <BarChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Select a dataset to view details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Datasets;