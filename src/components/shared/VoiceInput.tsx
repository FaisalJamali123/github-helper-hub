import { useState, useCallback, useEffect } from "react";
import { Mic, MicOff, Volume2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface VoiceInputProps {
  onResult: (value: string) => void;
  fieldName: string;
  isActive: boolean;
  onActiveChange: (active: boolean) => void;
}

const VoiceInput = ({ onResult, fieldName, isActive, onActiveChange }: VoiceInputProps) => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startListening = useCallback(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      toast.error("Voice input not supported. Try Chrome or Edge.");
      return;
    }

    setError(null);
    setTranscript("");

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      onActiveChange(true);
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);

      if (finalTranscript) {
        // Parse voice commands
        const text = finalTranscript.toLowerCase();
        let amount: string | null = null;

        // Match patterns like "add 500 income", "deduct 100", "500 dollars", etc.
        const addMatch = text.match(/(?:add|plus|income)\s*(\d+(?:\.\d{2})?)/);
        const deductMatch = text.match(/(?:deduct|minus|subtract|expense)\s*(\d+(?:\.\d{2})?)/);
        const numberMatch = text.match(/(\d+(?:\.\d{2})?)/);

        if (addMatch) {
          amount = addMatch[1];
        } else if (deductMatch) {
          amount = deductMatch[1];
        } else if (numberMatch) {
          amount = numberMatch[1];
        }

        if (amount) {
          onResult(amount);
          setShowConfirmation(true);
          setTimeout(() => setShowConfirmation(false), 2000);
          toast.success(`Set ${fieldName} to $${parseFloat(amount).toLocaleString()}`);
        } else {
          setError("Couldn't detect a number. Try saying a dollar amount.");
        }
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      onActiveChange(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      onActiveChange(false);
      
      if (event.error === "no-speech") {
        setError("No speech detected. Please try again.");
      } else if (event.error === "not-allowed") {
        setError("Microphone access denied.");
      } else {
        setError("Voice input error. Please try again.");
      }
    };

    recognition.start();
  }, [onResult, fieldName, onActiveChange]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    onActiveChange(false);
  }, [onActiveChange]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        className={cn(
          "p-3 rounded-lg border transition-all duration-200",
          isListening 
            ? "bg-primary text-primary-foreground border-primary animate-pulse shadow-lg shadow-primary/30" 
            : "bg-card border-border hover:border-primary hover:bg-primary/5"
        )}
        title={isListening ? "Stop listening" : "Voice input"}
      >
        {isListening ? (
          <MicOff className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </button>

      {/* Real-time transcription tooltip */}
      {isListening && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg min-w-[200px] z-20 animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <Volume2 className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs text-muted-foreground">Listening...</span>
          </div>
          <p className="text-sm text-foreground font-medium">
            {transcript || "Say an amount..."}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Try: "Add 500" or "1000 dollars"
          </p>
        </div>
      )}

      {/* Confirmation animation */}
      {showConfirmation && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-success text-success-foreground rounded-lg shadow-lg z-20 animate-scale-in">
          <span className="text-sm font-medium">✓ Applied!</span>
        </div>
      )}

      {/* Error tooltip */}
      {error && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg shadow-lg z-20 animate-fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceInput;