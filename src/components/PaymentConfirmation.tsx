'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HelpCircle, Copy, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentConfirmationProps {
  onBack: () => void;
  orderDetails: {
    amount: number;
    orderNumber: string;
    sellerName: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}

export function PaymentConfirmation({ onBack, orderDetails }: PaymentConfirmationProps) {
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(18 * 60 + 22); // 18:22 in seconds
  const [hasPaid, setHasPaid] = useState(false);

  // Safety check for orderDetails
  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-background text-foreground p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Order details not found</p>
          <Button onClick={onBack} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} has been copied to clipboard.`,
    });
  };

  const handlePaymentConfirmation = () => {
    if (!hasPaid) {
      toast({
        title: "Warning",
        description: "Please complete the payment before confirming.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Payment Confirmed",
      description: "Seller has been notified of your payment.",
    });
    // Here you would typically update the order status
  };

  const handleMarkAsPaid = () => {
    setHasPaid(true);
    toast({
      title: "Marked as Paid",
      description: "You can now confirm your payment.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-foreground"
        >
          <ArrowLeft size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground"
        >
          <HelpCircle size={20} />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-muted rounded-full h-1">
          <div className="bg-primary h-1 rounded-full w-1/4"></div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold mb-4">Please pay the seller</h1>
        
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-3xl font-bold">₦{orderDetails.amount.toLocaleString()}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => copyToClipboard(orderDetails.amount.toString(), "Amount")}
            className="h-8 w-8"
          >
            <Copy size={16} />
          </Button>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-sm text-muted-foreground">
            Please complete payment within {formatTime(timeLeft)}s
          </span>
          <Button variant="outline" size="sm" className="relative">
            <MessageCircle size={16} className="mr-2" />
            Chat
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </Button>
        </div>
      </div>

      {/* Instructions */}
      <div className="space-y-6 mb-8">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
              1
            </span>
            <p className="text-sm">Copy transfer information/save QR code screenshot.</p>
          </div>

          {/* Bank Transfer Details */}
          <div className="bg-muted rounded-lg p-4 border-l-4 border-orange-500">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Name:</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{orderDetails.sellerName}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(orderDetails.sellerName, "Seller name")}
                    className="h-6 w-6"
                  >
                    <Copy size={14} />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Bank Number:</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{orderDetails.accountNumber}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(orderDetails.accountNumber, "Account number")}
                    className="h-6 w-6"
                  >
                    <Copy size={14} />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Bank Name:</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{orderDetails.bankName}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(orderDetails.bankName, "Bank name")}
                    className="h-6 w-6"
                  >
                    <Copy size={14} />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Bank of deposit:</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{orderDetails.accountName}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(orderDetails.accountName, "Account name")}
                    className="h-6 w-6"
                  >
                    <Copy size={14} />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Order No.:</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{orderDetails.orderNumber}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(orderDetails.orderNumber, "Order number")}
                    className="h-6 w-6"
                  >
                    <Copy size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-3">
            <span className="text-sm text-muted-foreground">Terms of trade: 24/7 Online</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
              2
            </span>
            <p className="text-sm">Transfer funds to seller</p>
          </div>

          <div className="flex items-start gap-3">
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
              3
            </span>
            <div className="space-y-2">
              <p className="text-sm">Tap [I have paid] to notify the seller</p>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  Please pay via a method supported by the seller. Please do not click [I have paid] without completing the payment, otherwise the platform will suspend the account for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {!hasPaid && (
          <Button
            variant="outline"
            className="w-full h-12 bg-muted border-border"
            onClick={handleMarkAsPaid}
          >
            Mark as Paid
          </Button>
        )}
        
        <Button
          className={`w-full h-12 ${hasPaid ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
          onClick={handlePaymentConfirmation}
          disabled={!hasPaid}
        >
          I have paid
        </Button>
      </div>
    </div>
  );
}
