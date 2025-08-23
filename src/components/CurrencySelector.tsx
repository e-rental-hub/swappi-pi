
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TradeModeEnum } from "@/types/TradeModeEnum";

interface CurrencySelectorProps {
  currency: string;
  tradeMode: TradeModeEnum
  icon: string;
  onClick?: () => void;
}

export function CurrencySelector({ currency, icon, onClick, tradeMode }: CurrencySelectorProps) {
  return (
    <Button 
      variant="currency" 
      className="bg-card border-border flex items-center gap-2 text-foreground" 
      onClick={onClick}
      // disabled
    >
      <div className={`w-6 h-6 rounded-full ${tradeMode===TradeModeEnum.Buy? "bg-green-700": "bg-red-500"} text-white flex items-center justify-center text-sm`}>{icon}</div>
      <span className="font-medium">{currency}</span>
    </Button>
  );
}
