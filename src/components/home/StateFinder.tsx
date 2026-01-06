import { useState } from "react";
import { MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const states = [
  { name: "Alabama", rate: "5.0%" },
  { name: "Alaska", rate: "0%" },
  { name: "Arizona", rate: "2.5%" },
  { name: "Arkansas", rate: "4.4%" },
  { name: "California", rate: "13.3%" },
  { name: "Colorado", rate: "4.4%" },
  { name: "Connecticut", rate: "6.99%" },
  { name: "Delaware", rate: "6.6%" },
  { name: "Florida", rate: "0%" },
  { name: "Georgia", rate: "5.49%" },
  { name: "Hawaii", rate: "11%" },
  { name: "Idaho", rate: "5.8%" },
  { name: "Illinois", rate: "4.95%" },
  { name: "Indiana", rate: "3.15%" },
  { name: "Iowa", rate: "5.7%" },
  { name: "Kansas", rate: "5.7%" },
  { name: "Kentucky", rate: "4.5%" },
  { name: "Louisiana", rate: "4.25%" },
  { name: "Maine", rate: "7.15%" },
  { name: "Maryland", rate: "5.75%" },
  { name: "Massachusetts", rate: "5%" },
  { name: "Michigan", rate: "4.25%" },
  { name: "Minnesota", rate: "9.85%" },
  { name: "Mississippi", rate: "5%" },
  { name: "Missouri", rate: "4.95%" },
  { name: "Montana", rate: "5.9%" },
  { name: "Nebraska", rate: "5.84%" },
  { name: "Nevada", rate: "0%" },
  { name: "New Hampshire", rate: "0%" },
  { name: "New Jersey", rate: "10.75%" },
  { name: "New Mexico", rate: "5.9%" },
  { name: "New York", rate: "10.9%" },
  { name: "North Carolina", rate: "5.25%" },
  { name: "North Dakota", rate: "2.5%" },
  { name: "Ohio", rate: "3.75%" },
  { name: "Oklahoma", rate: "4.75%" },
  { name: "Oregon", rate: "9.9%" },
  { name: "Pennsylvania", rate: "3.07%" },
  { name: "Rhode Island", rate: "5.99%" },
  { name: "South Carolina", rate: "6.5%" },
  { name: "South Dakota", rate: "0%" },
  { name: "Tennessee", rate: "0%" },
  { name: "Texas", rate: "0%" },
  { name: "Utah", rate: "4.65%" },
  { name: "Vermont", rate: "8.75%" },
  { name: "Virginia", rate: "5.75%" },
  { name: "Washington", rate: "0%" },
  { name: "West Virginia", rate: "6.5%" },
  { name: "Wisconsin", rate: "7.65%" },
  { name: "Wyoming", rate: "0%" },
];

const StateFinder = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showList, setShowList] = useState(false);
  const [selectedState, setSelectedState] = useState<typeof states[0] | null>(null);
  const [showResult, setShowResult] = useState(false);

  const filteredStates = states.filter((state) =>
    state.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSelectState = (state: typeof states[0]) => {
    setSelectedState(state);
    setSearchValue(state.name);
    setShowList(false);
    setShowResult(false);
  };

  const handleCheckRate = () => {
    if (selectedState) {
      setShowResult(true);
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-xl p-6 w-full max-w-sm border border-border">
      <div className="flex items-center space-x-2 mb-6">
        <MapPin className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-semibold text-foreground">Find Your State Tax Rate</h3>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <label htmlFor="stateInput" className="block text-sm text-muted-foreground mb-2">
            Choose Your State
          </label>
          <Input
            id="stateInput"
            type="text"
            placeholder="Start typing..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setShowList(true);
              setShowResult(false);
            }}
            onFocus={() => setShowList(true)}
            className="calc-input"
          />
          
          {showList && searchValue && filteredStates.length > 0 && (
            <ul className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {filteredStates.map((state) => (
                <li
                  key={state.name}
                  className="px-4 py-3 hover:bg-muted cursor-pointer transition-colors text-foreground"
                  onClick={() => handleSelectState(state)}
                >
                  {state.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <Button
          onClick={handleCheckRate}
          disabled={!selectedState}
          className="w-full py-6 text-lg font-semibold"
        >
          Check Tax Rate
        </Button>

        {showResult && selectedState && (
          <div className="bg-secondary rounded-lg p-4 fade-in">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{selectedState.name} Tax Rate:</span>
              <span className="text-2xl font-bold text-primary">{selectedState.rate}</span>
            </div>
            {selectedState.rate === "0%" && (
              <p className="text-success text-sm mt-2 flex items-center">
                <Check className="w-4 h-4 mr-1" />
                No state income tax!
              </p>
            )}
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center mt-4">
          ✓ All 50 states supported<br />
          ✓ 2026 tax rates included
        </p>
      </div>
    </div>
  );
};

export default StateFinder;
