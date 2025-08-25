"use client";

import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { CurrencySelector } from "@/components/CurrencySelector";
import { Info } from "lucide-react";
import { AppContext } from "@/providers/AppContextProvider";
import { TradeModeEnum } from "@/types/TradeModeEnum";

export default function PostAd() {
  const { toast } = useToast();
  const { currentUser  } = useContext(AppContext);
  const [adType, setAdType] = useState("Sell");
  const [priceType, setPriceType] = useState("Fixed");
  const [loading, setLoading] = useState(true);

  if (!currentUser) {
    return <div className="text-center p-4">Loading..</div>;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Advertisement Posted",
      description: "Your trade advertisement has been successfully created.",
      duration: 3000,
    });
  };
  
  return (
    <div >
      <div className="p-4">
        <h2 className="text-lg font-medium mb-4">Set price and quantity</h2>
        
        {/* Buy/Sell Toggle */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Button 
            className={`${adType === "Buy" ? "bg-muted text-foreground" : "bg-transparent text-muted-foreground"} border border-border`}
            onClick={() => setAdType("Buy")}
          >
            Buy
          </Button>
          <Button 
            className={`${adType === "Sell" ? "bg-pi text-white" : "bg-transparent text-muted-foreground"} border border-border`}
            onClick={() => setAdType("Sell")}
          >
            Sell
          </Button>
        </div>
        
        {/* Currency Selection */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label className="text-sm text-muted-foreground mb-1 block">Currency</Label>
            <CurrencySelector 
              currency="PI"
              icon={"π"}
              tradeMode={TradeModeEnum.Sell}
            />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground mb-1 block">Fiat</Label>
            <CurrencySelector 
              currency="NGN"
              icon={"₦"}
              tradeMode={TradeModeEnum.Buy}
            />
          </div>
        </div>
        
        {/* Price Type */}
        <div className="mb-4">
          <Label className="text-sm text-muted-foreground mb-1 block">Price Type</Label>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              className={`${priceType === "Fixed" ? "bg-secondary text-foreground" : "bg-transparent text-muted-foreground"} border border-border`}
              onClick={() => setPriceType("Fixed")}
            >
              Fixed
            </Button>
            <Button 
              className={`${priceType === "Floating" ? "bg-secondary text-foreground" : "bg-transparent text-muted-foreground"} border border-border`}
              onClick={() => setPriceType("Floating")}
            >
              Floating
            </Button>
          </div>
        </div>
        
        {/* Reference Price Info */}
        <div className="bg-secondary/50 rounded-lg p-3 mb-4 text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-muted-foreground">Current Reference Price:</span>
            <span>₦1,620 / PI</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Spot Reference Price:</span>
            <span>1,599.86 NGN / PI</span>
          </div>
          
          <div className="flex items-center gap-2 mt-3 text-xs">
            <RadioGroup defaultValue="reference" className="flex">
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="reference" value="reference" />
                <Label htmlFor="reference" className="text-xs cursor-pointer">
                  Online order book
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <Info size={12} />
            <span>The above prices are for reference only</span>
          </div>
        </div>
        
        {/* Price and Quantity Inputs */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="unitPrice" className="text-sm text-muted-foreground mb-1 block">Unit Price</Label>
              <div className="relative">
                <Input 
                  id="unitPrice" 
                  placeholder="Please enter" 
                  className="input-dark pr-16" 
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  NGN
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="quantity" className="text-sm text-muted-foreground mb-1 block">Quantity</Label>
              <div className="relative">
                <Input 
                  id="quantity" 
                  placeholder="Please enter" 
                  className="input-dark pr-16" 
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <span className="text-pi">All</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-muted-foreground">USDT</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="totalAmount" className="text-sm text-muted-foreground mb-1 block">Total Amount</Label>
              <div className="relative">
                <Input 
                  id="totalAmount" 
                  placeholder="Please enter" 
                  className="input-dark pr-16" 
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  NGN
                </div>
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-pi hover:bg-pi/90 mt-4">
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
