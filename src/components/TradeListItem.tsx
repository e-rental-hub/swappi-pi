
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VerifiedBadge } from "./VerifiedBadge";
import { TradeModeEnum } from "@/types/TradeModeEnum";

interface TradeListItemProps {
  merchant?: string;
  price?: string;
  quantity?: string;
  completionRate?: string;
  avgTime?: string;
  paymentMethod?: string;
  isVerified?: boolean;
  tradeMode?: TradeModeEnum;
  onBuyClick?: () => void;
  
  // For Orders component
  id?: string;
  type?: string;
  amount?: string;
  total?: string;
  status?: "Completed" | "Processing" | "Cancelled";
  date?: string;
}

export function TradeListItem({
  merchant,
  price,
  quantity,
  completionRate,
  avgTime,
  paymentMethod = "Bank Transfer",
  isVerified = false,
  tradeMode = TradeModeEnum.Buy,
  onBuyClick,
  
  // Order-specific props
  id,
  type,
  amount,
  total,
  status,
  date
}: TradeListItemProps) {
  
  // Determine if this is an order or a trade listing
  const isOrder = !!id && !!type && !!status;
  
  // Get status color
  const getStatusColor = () => {
    if (!status) return "";
    switch (status) {
      case "Completed": return "text-green-500";
      case "Processing": return "text-yellow-500";
      case "Cancelled": return "text-red-500";
      default: return "";
    }
  };
  
  return (
    <Card className="mb-4 p-4 bg-card border-border">
      {isOrder ? (
        // Order item layout
        <>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Order #{id}</span>
            <span className={`text-sm font-medium ${getStatusColor()}`}>{status}</span>
          </div>
          
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-lg">{type} {amount}</span>
            <span className="text-xl font-bold">{price}</span>
          </div>
          
          <div className="text-sm text-muted-foreground mb-1">
            Total: {total}
          </div>
          
          <div className="text-xs text-muted-foreground">
            Date: {date}
          </div>
        </>
      ) : (
        // Trade listing layout
        <>
          <div className="flex items-center mb-2">
            {merchant && (
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs mr-2">
                {merchant.charAt(0)}
              </div>
            )}
            <span className="font-medium">{merchant}</span>
            {isVerified && <VerifiedBadge />}
          </div>
          
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-xl font-bold">{price}</span>
            {tradeMode === TradeModeEnum.Buy ? 
              <Button className="bg-buy hover:bg-buy/90 text-white" onClick={onBuyClick}>
                Buy
              </Button> : 
              <Button className="bg-sell hover:bg-sell/90 text-white" onClick={onBuyClick}>
                Sell
              </Button>
            }
          </div>
          
          <div className="text-sm text-muted-foreground mb-1">
            Quantity: {quantity}
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            {completionRate && (
              <div className="text-muted-foreground">Completion Rate: <span className="text-foreground">{completionRate}</span></div>
            )}
            {avgTime && (
              <div className="text-muted-foreground">Avg Time: <span className="text-foreground">{avgTime}</span></div>
            )}
            {paymentMethod && (
              <div className="text-muted-foreground col-span-2">Payment: <span className="text-foreground">{paymentMethod}</span></div>
            )}
          </div>
        </>
      )}
    </Card>
  );
}
