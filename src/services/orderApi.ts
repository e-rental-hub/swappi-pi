import { OrderType, OrderStatusType } from "@/constants/types";

// Mock data for demonstration - in a real app, this would come from your backend
const mockSellerInfo = {
  name: "Abubakar Akuma",
  bankName: "PAYSTACK-TITAN",
  accountNumber: "9862578987",
  accountName: "AKUMAABUBAKAR"
};

export interface CreateBuyOrderRequest {
  amount: number; // Amount in Pi
  piAmount: number; // Pi amount
  ngnAmount: number; // NGN amount
  buyerId: string;
}

export interface CreateBuyOrderResponse {
  order: OrderType;
  paymentDetails: {
    amount: number;
    orderNumber: string;
    sellerName: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}

export const createBuyOrder = async (request: CreateBuyOrderRequest): Promise<CreateBuyOrderResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generate a unique order number
  const orderNumber = Math.floor(Math.random() * 90000000) + 10000000;

  // Create mock order
  const order: OrderType = {
    _id: `order_${Date.now()}`,
    buyer_id: {
      pi_username: request.buyerId
    },
    seller_id: {
      name: mockSellerInfo.name
    },
    payment_id: `payment_${Date.now()}`,
    total_amount: { $numberDecimal: request.ngnAmount },
    status: OrderStatusType.Pending,
    is_paid: false,
    is_fulfilled: false,
    fulfillment_method: undefined,
    seller_fulfillment_description: undefined,
    buyer_fulfillment_description: "Bank transfer to seller account",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Create payment details
  const paymentDetails = {
    amount: request.ngnAmount,
    orderNumber: orderNumber.toString(),
    sellerName: mockSellerInfo.name,
    bankName: mockSellerInfo.bankName,
    accountNumber: mockSellerInfo.accountNumber,
    accountName: mockSellerInfo.accountName
  };

  return {
    order,
    paymentDetails
  };
};

export const getOrderById = async (orderId: string): Promise<OrderType | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock order data - in real app, fetch from backend
  return null;
};

export const updateOrderStatus = async (orderId: string, status: OrderStatusType): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock update - in real app, update in backend
  return true;
};
