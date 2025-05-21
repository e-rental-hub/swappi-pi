
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CurrencySelectorProps {
  currency: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export function CurrencySelector({ currency, icon, onClick }: CurrencySelectorProps) {
  return (
    <Button 
      variant="outline" 
      className="bg-card border-border flex items-center gap-2 text-foreground" 
      onClick={onClick}
    >
      {icon}
      <span className="font-medium">{currency}</span>
      <ChevronDown size={18} />
    </Button>
  );
}
