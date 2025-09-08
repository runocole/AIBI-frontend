import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { datasetsAPI } from '@/lib/api';
import { Upload as UploadIcon, File, CheckCircle } from 'lucide-react';

interface DatasetMetadata {
  id: string;
  name: string;
  rows: number;
  columns: string[];
  upload_date: string;
}

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedDataset, setUploadedDataset] = useState<DatasetMetadata | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = [
        'text/csv',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
      ];
      
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setUploadedDataset(null);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select a CSV or Excel file",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      const result = await datasetsAPI.upload(file);
      setUploadedDataset(result);
      setFile(null);
      
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.response?.data?.detail || "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Dataset</h1>
        <p className="text-muted-foreground mt-2">
          Upload your CSV or Excel files to analyze in the dashboard
        </p>
      </div>

      <div className="grid gap-6">
        {/* Upload Section */}
        <Card className="bi-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UploadIcon className="h-5 w-5" />
              <span>File Upload</span>
            </CardTitle>
            <CardDescription>
              Select a CSV or Excel file to upload to your datasets
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file">Dataset File</Label>
              <Input
                id="file"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              <p className="text-sm text-muted-foreground">
                Supported formats: CSV, XLSX, XLS
              </p>
            </div>

            {file && (
              <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
                <File className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{file.name}</span>
                <span className="text-sm text-muted-foreground">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
            )}

            <Button 
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="w-full"
            >
              {isUploading ? "Uploading..." : "Upload Dataset"}
            </Button>
          </CardContent>
        </Card>

        {/* Success Message */}
        {uploadedDataset && (
          <Card className="bi-card border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                <span>Upload Successful</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-green-700">Dataset Name:</span>
                  <p className="text-green-600">{uploadedDataset.name}</p>
                </div>
                <div>
                  <span className="font-medium text-green-700">Rows:</span>
                  <p className="text-green-600">{uploadedDataset.rows.toLocaleString()}</p>
                </div>
              </div>
              
              <div>
                <span className="font-medium text-green-700">Columns:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {uploadedDataset.columns.map((column, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium"
                    >
                      {column}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Upload;