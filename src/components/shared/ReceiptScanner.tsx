import { useState, useRef } from "react";
import { Camera, Upload, X, Loader2, Check, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ReceiptScannerProps {
  onAmountDetected: (amount: number) => void;
}

const ReceiptScanner = ({ onAmountDetected }: ReceiptScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [detectedAmount, setDetectedAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processReceipt = async (file: File) => {
    setIsProcessing(true);
    setPreviewUrl(URL.createObjectURL(file));

    try {
      // Dynamic import to avoid loading Tesseract unless needed
      const Tesseract = await import("tesseract.js");
      
      const result = await Tesseract.recognize(file, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            // Could show progress here
          }
        },
      });

      const text = result.data.text;
      
      // Extract amounts from the receipt text
      // Look for common patterns: $XX.XX, Total: XX.XX, TOTAL XX.XX, etc.
      const amountPatterns = [
        /(?:total|subtotal|amount|due|paid|balance)[:\s]*\$?(\d+\.?\d*)/gi,
        /\$(\d+\.\d{2})/g,
        /(\d+\.\d{2})\s*(?:usd|dollars?)?/gi,
      ];

      const amounts: number[] = [];
      
      for (const pattern of amountPatterns) {
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          const amount = parseFloat(match[1]);
          if (amount > 0 && amount < 100000) { // Reasonable range
            amounts.push(amount);
          }
        }
      }

      // Find the largest amount (likely the total)
      if (amounts.length > 0) {
        const maxAmount = Math.max(...amounts);
        setDetectedAmount(maxAmount);
        toast.success(`Detected amount: $${maxAmount.toFixed(2)}`);
      } else {
        toast.error("Could not detect amount. Try a clearer image.");
        setDetectedAmount(null);
      }
    } catch (error) {
      console.error("OCR Error:", error);
      toast.error("Failed to scan receipt. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image too large. Please use an image under 10MB.");
        return;
      }
      processReceipt(file);
    }
  };

  const handleConfirmAmount = () => {
    if (detectedAmount) {
      onAmountDetected(detectedAmount);
      handleClose();
      toast.success("Expense added!");
    }
  };

  const handleClose = () => {
    setIsScanning(false);
    setPreviewUrl(null);
    setDetectedAmount(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!isScanning) {
    return (
      <button
        onClick={() => setIsScanning(true)}
        className="flex items-center gap-2 px-4 py-2 bg-accent/50 hover:bg-accent text-accent-foreground rounded-lg transition-colors text-sm font-medium"
      >
        <Camera className="w-4 h-4" />
        Scan Receipt
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border border-border shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" />
            Receipt Scanner
          </h3>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!previewUrl ? (
          <div className="space-y-4">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-foreground font-medium mb-1">Upload receipt image</p>
              <p className="text-sm text-muted-foreground">PNG, JPG, or HEIC up to 10MB</p>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <p className="text-xs text-muted-foreground text-center">
              Our OCR will automatically detect the total amount from your receipt.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted">
              <img
                src={previewUrl}
                alt="Receipt preview"
                className="w-full h-full object-contain"
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Scanning receipt...</p>
                  </div>
                </div>
              )}
            </div>

            {detectedAmount !== null && (
              <div className="bg-success/10 border border-success/30 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Detected Amount</p>
                <p className="text-2xl font-heading font-bold text-success">
                  ${detectedAmount.toFixed(2)}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              {detectedAmount !== null && (
                <Button
                  onClick={handleConfirmAmount}
                  className="flex-1 cta-gradient text-primary-foreground"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Add Expense
                </Button>
              )}
              {!isProcessing && !detectedAmount && (
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1"
                >
                  Try Another
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptScanner;
