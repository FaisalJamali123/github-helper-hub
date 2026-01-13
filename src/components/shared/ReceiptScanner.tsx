import { useState, useRef, useCallback, useEffect } from "react";
import { Camera, Upload, X, Loader2, Check, Receipt, ChevronDown, ImageIcon, Crop, Zap, FlashlightOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ReceiptScannerProps {
  onAmountDetected: (amount: number) => void;
}

const ReceiptScanner = ({ onAmountDetected }: ReceiptScannerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mode, setMode] = useState<"camera" | "upload" | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [detectedAmount, setDetectedAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  
  // Camera state
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cleanup camera stream
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setIsCameraReady(true);
        };
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      toast.error("Could not access camera. Please check permissions.");
      handleClose();
    }
  };

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      
      // Stop camera
      stream?.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraReady(false);
      
      // Convert to blob and process
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "receipt-capture.jpg", { type: "image/jpeg" });
          processReceipt(file);
        }
      }, "image/jpeg", 0.9);
    }
  }, [stream]);

  const processReceipt = async (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    setPreviewUrl(URL.createObjectURL(file));

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 85));
      }, 200);

      // Dynamic import to avoid loading Tesseract unless needed
      const Tesseract = await import("tesseract.js");
      
      const result = await Tesseract.recognize(file, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text" && typeof m.progress === "number") {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });

      clearInterval(progressInterval);
      setProgress(100);

      const text = result.data.text;
      
      // Extract amounts from the receipt text
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
          if (amount > 0 && amount < 100000) {
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
      validateAndProcess(file);
    }
  };

  const validateAndProcess = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image too large. Please use an image under 10MB.");
      return;
    }
    const validTypes = ["image/jpeg", "image/png", "image/heic", "image/heif"];
    if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith(".heic")) {
      toast.error("Please upload a PNG, JPG, or HEIC image.");
      return;
    }
    processReceipt(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) validateAndProcess(file);
  }, []);

  const handleConfirmAmount = () => {
    if (detectedAmount) {
      onAmountDetected(detectedAmount);
      setThumbnailUrl(previewUrl);
      handleClose();
      toast.success("Expense added!");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setMode(null);
    setPreviewUrl(null);
    setDetectedAmount(null);
    setProgress(0);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraReady(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openMode = (selectedMode: "camera" | "upload") => {
    setShowDropdown(false);
    setMode(selectedMode);
    setIsOpen(true);
    if (selectedMode === "camera") {
      startCamera();
    }
  };

  return (
    <>
      {/* Trigger Button with Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-4 py-2 bg-accent/50 hover:bg-accent text-accent-foreground rounded-lg transition-all duration-200 text-sm font-medium group"
        >
          <Camera className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Scan Receipt
          <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", showDropdown && "rotate-180")} />
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg z-30 overflow-hidden animate-fade-in">
            <button
              onClick={() => openMode("camera")}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Camera className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">📸 Scan with Camera</p>
                <p className="text-xs text-muted-foreground">Live capture with auto-detect</p>
              </div>
            </button>
            <button
              onClick={() => openMode("upload")}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left border-t border-border"
            >
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Upload className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="font-medium text-foreground">📁 Upload Receipt</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, HEIC up to 10MB</p>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Receipt Thumbnail */}
      {thumbnailUrl && (
        <div className="mt-2 flex items-center gap-2 p-2 bg-muted/50 rounded-lg border border-border animate-fade-in">
          <img src={thumbnailUrl} alt="Receipt" className="w-10 h-10 rounded object-cover" />
          <span className="text-xs text-muted-foreground">Receipt scanned</span>
          <button onClick={() => setThumbnailUrl(null)} className="ml-auto p-1 hover:bg-muted rounded">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-card rounded-xl border border-border shadow-xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                <Receipt className="w-5 h-5 text-primary" />
                {mode === "camera" ? "Camera Capture" : "Upload Receipt"}
              </h3>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Camera Mode */}
            {mode === "camera" && !previewUrl && (
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-black">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  
                  {!isCameraReady && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  )}
                  
                  {/* Camera Overlay */}
                  {isCameraReady && (
                    <div className="absolute inset-4 border-2 border-white/50 rounded-lg pointer-events-none">
                      <div className="absolute -top-0.5 -left-0.5 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl" />
                      <div className="absolute -top-0.5 -right-0.5 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr" />
                      <div className="absolute -bottom-0.5 -left-0.5 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl" />
                      <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br" />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setFlashEnabled(!flashEnabled)}
                    className={cn(
                      "p-3 rounded-full transition-colors",
                      flashEnabled ? "bg-warning text-warning-foreground" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {flashEnabled ? <Zap className="w-5 h-5" /> : <FlashlightOff className="w-5 h-5" />}
                  </button>
                  
                  <button
                    onClick={capturePhoto}
                    disabled={!isCameraReady}
                    className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-105 transition-transform disabled:opacity-50"
                  >
                    <Camera className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={() => { handleClose(); openMode("upload"); }}
                    className="p-3 rounded-full bg-muted text-muted-foreground"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Upload Mode */}
            {mode === "upload" && !previewUrl && (
              <div className="space-y-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
                    isDragOver 
                      ? "border-primary bg-primary/10 scale-[1.02]" 
                      : "border-border hover:border-primary hover:bg-primary/5"
                  )}
                >
                  <Upload className={cn("w-10 h-10 mx-auto mb-3 transition-transform", isDragOver ? "text-primary scale-110" : "text-muted-foreground")} />
                  <p className="text-foreground font-medium mb-1">
                    {isDragOver ? "Drop your receipt here" : "Upload receipt image"}
                  </p>
                  <p className="text-sm text-muted-foreground">PNG, JPG, or HEIC up to 10MB</p>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.heic,.heif"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <p className="text-xs text-muted-foreground text-center">
                  Our OCR will automatically detect the total amount from your receipt.
                </p>
              </div>
            )}

            {/* Preview & Results */}
            {previewUrl && (
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted">
                  <img
                    src={previewUrl}
                    alt="Receipt preview"
                    className="w-full h-full object-contain"
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center">
                      <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
                      <p className="text-sm text-muted-foreground mb-2">Scanning receipt...</p>
                      {/* Progress Bar */}
                      <div className="w-3/4 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{progress}%</p>
                    </div>
                  )}
                </div>

                {detectedAmount !== null && (
                  <div className="bg-success/10 border border-success/30 rounded-lg p-4 text-center animate-scale-in">
                    <p className="text-sm text-muted-foreground mb-1">Detected Amount</p>
                    <p className="text-2xl font-heading font-bold text-success animate-pulse">
                      ${detectedAmount.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">Click "Add Expense" to apply this amount</p>
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
                      onClick={() => { setPreviewUrl(null); setDetectedAmount(null); }}
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
      )}
    </>
  );
};

export default ReceiptScanner;