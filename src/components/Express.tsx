'use client';

import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Delete } from "lucide-react";
import { CurrencySelector } from "./CurrencySelector";
import { TradeModeEnum } from "@/types/TradeModeEnum";
import { payWithPi } from "@/config/payment";
import logger from "../../logger.config.mjs"
import { PaymentDataType } from "@/constants/types";
import { AppContext } from "@/providers/AppContextProvider";
import { PaymentManagement } from "./PaymentManagement";
import { PaymentConfirmation } from "./PaymentConfirmation";
import { useToast } from "@/hooks/use-toast";
// import { createBuyOrder } from "@/services/orderApi";

interface ExpressPropType {
  tradeMode: TradeModeEnum
}
export default function ExpressTrading({ tradeMode }: ExpressPropType) {
  const { toast } = useToast();
  const [spendAmount, setSpendAmount] = useState("0.00");
  const [receiveAmount, setReceiveAmount] = useState("0.00");
  const [showPaymentManagement, setShowPaymentManagement] = useState(false);
  const [showDepositAccount, setShowDepositAccount] = useState(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const {currentUser, walletAddress, autoLoginUser} = useContext(AppContext);

  const handleNumberInput = (num: string) => {
    if (spendAmount === "0.00") {
      setSpendAmount(num);
    } else {
      setSpendAmount(prev => prev + num);
    }
    // Calculate receive amount based on exchange rate
    const numericAmount = parseFloat(spendAmount === "0.00" ? num : spendAmount + num);
    if (!isNaN(numericAmount)) {
      const usdtAmount = tradeMode === TradeModeEnum.Buy ? numericAmount / 675.45 : numericAmount * 675.45;
      setReceiveAmount(usdtAmount.toFixed(2));
    }
  };

  const handleBackspace = () => {
    if (spendAmount.length > 1) {
      setSpendAmount(prev => prev.slice(0, -1));
    } else {
      setSpendAmount("0.00");
      setReceiveAmount("0.00");
    }
  };

  const handleDecimal = () => {
    if (!spendAmount.includes(".")) {
      setSpendAmount(prev => prev + ".");
    }
  };

  const onOrderComplete = (data:any) => {
    logger.info('Pi payment successfully:', data.message);
    setSpendAmount("0.00");
    setReceiveAmount("0.00");
    setSelectedAccount("");
    toast({
      title: "Pi Payment Successful",
      description: "Your Pi has been successfully transferred.",
    });
  }

  const onOrderError = (error: Error) => {
    logger.error("Error making pi payment", error.message);
    toast({
      title: "Pi Payment Error",
      description: "Pi payment failed.",
    });
  }

  const handleSell = async () => {
    if (!currentUser) return;
    
    const newPaymentData: PaymentDataType = {
      amount: parseFloat(spendAmount),
      memo: "Sell Pi to naira4Pi",
      metadata: {
        trade_mode: tradeMode,
        trade_type: "Express",
        payment_account: selectedAccount,
        wallet_address: walletAddress || ''
      }
    }
    await payWithPi(newPaymentData, onOrderComplete, onOrderError)
  }

  const handleDepositPi = async () => {
    // Placeholder flow: skip API and show confirmation with mock details
    setIsCreatingOrder(true);
    try {
      const ngnAmount = parseFloat(spendAmount) || 1694.0;
      const placeholderDetails = {
        amount: ngnAmount,
        orderNumber: (Math.floor(Math.random() * 90000000) + 10000000).toString(),
        sellerName: "Abubakar Akuma",
        bankName: "PAYSTACK-TITAN",
        accountNumber: "9862578987",
        accountName: "AKUMAABUBAKAR",
      };

      setOrderDetails(placeholderDetails);
      setShowPaymentConfirmation(true);
      toast({
        title: "Preview Order",
        description: "Showing placeholder payment details.",
      });
    } finally {
      setIsCreatingOrder(false);
    }
  };

  if (tradeMode === TradeModeEnum.Sell && showPaymentManagement) {
    return (
      <div>
        <PaymentManagement onBack={() => setShowPaymentManagement(false)} selectedAccount={selectedAccount} setSelectedAccount={setSelectedAccount} />
      </div>
    );
  }

  if (tradeMode === TradeModeEnum.Buy && showDepositAccount ) {
    return (
      <div>
        <PaymentManagement onBack={() => setShowPaymentManagement(false)} selectedAccount={selectedAccount} setSelectedAccount={setSelectedAccount} />
      </div>
    );
  }

  if (showPaymentManagement) {
    return (
      <div>
        <PaymentManagement onBack={() => setShowPaymentManagement(false)} selectedAccount={selectedAccount} setSelectedAccount={setSelectedAccount} />
      </div>
    );
  }

  if (showPaymentConfirmation) {
    return (
      <PaymentConfirmation
        onBack={() => {
          setShowPaymentConfirmation(false);
          setOrderDetails(null);
        }}
        orderDetails={orderDetails}
      />
    );
  }

  return (
    <div className="px-4 pt-4">
      {tradeMode===TradeModeEnum.Buy ? (
        <div>
          {/* Spend Section */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">Spend</p>        
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border">
              <div className="text-3xl font-light mb-2">{spendAmount}</div>
              <CurrencySelector 
                currency="NGN"
                tradeMode={tradeMode}
                icon="₦"
              />          
            </div>
            <div className="text-xs text-muted-foreground">
              1,532.45 - 22,980,750.00 NGN
            </div>
          </div>

          {/* Receive Section */}
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-2">Receive</p>        
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border">
              <div className="text-3xl font-light mb-2">{receiveAmount}</div>
              <CurrencySelector 
                currency="PI"
                tradeMode={tradeMode}
                icon={"π"}
              />            
            </div>
            <div className="text-xs text-muted-foreground">
              1 Pi = 670.45 NGN
            </div>
          </div>
        </div>
        
      ) : (
        <div>
          {/* Spend Section */}          
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-2">Spend</p>        
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border">
              <div className="text-3xl font-light mb-2">{spendAmount}</div>
              <CurrencySelector 
                currency="PI"
                tradeMode={tradeMode}
                icon={"π"}
              />       
            </div>
            <div className="text-xs text-muted-foreground">
              1 Pi = 670.45 NGN
            </div>
          </div>

          {/* Receive Section */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">Receive</p>        
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border">
              <div className="text-3xl font-light mb-2">{receiveAmount}</div>
              <CurrencySelector 
                currency="NGN"
                tradeMode={tradeMode}
                icon="₦"
              />             
            </div>
            <div className="text-xs text-muted-foreground">
              1,532.45 - 22,980,750.00 NGN
            </div>
          </div>          
        </div>
      )
      }

      {/* Select Payment Method */}
      {tradeMode===TradeModeEnum.Buy ?
        <Button 
          variant="outline" 
          className="w-full mb-8 h-12 bg-card border-border text-muted-foreground"
          onClick={handleDepositPi}
          disabled={isCreatingOrder}
        >
          {isCreatingOrder ? "Creating Order..." : "Deposit Pi"}
        </Button> :
        <Button 
          variant="outline" 
          className="w-full mb-8 h-12 bg-card border-border hover:bg-sell text-muted-foreground"
          onClick={()=> selectedAccount ? handleSell() : setShowPaymentManagement(true)}
          >
          {selectedAccount? "Sell" : "Select payment method"}
        </Button>
      }

      {/* Numeric Keypad */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            variant="ghost"
            className="h-12 text-lg font-normal hover:bg-secondary"
            onClick={() => handleNumberInput(num.toString())}
          >
            {num}
          </Button>
        ))}
        
        <Button
          variant="ghost"
          className="h-12 text-lg font-normal hover:bg-secondary"
          onClick={handleDecimal}
        >
          .
        </Button>
        
        <Button
          variant="ghost"
          className="h-12 text-lg font-normal hover:bg-secondary"
          onClick={() => handleNumberInput("0")}
        >
          0
        </Button>
        
        <Button
          variant="ghost"
          className="h-12 text-lg font-normal hover:bg-secondary"
          onClick={handleBackspace}
        >
          <Delete size={18} />
        </Button>
      </div>
    </div>
  );
}