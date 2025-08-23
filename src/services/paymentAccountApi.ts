import axiosClient from "@/config/client"
import logger from '../../logger.config.mjs';
import { PaymentAccount } from "@/types";

export const addPaymentAccount = async (accountData: PaymentAccount): Promise<PaymentAccount | null> => {
  try {
    const response = await axiosClient.post('/payment-accounts', accountData);
    logger.info("Payment Account added successfully:", response.data);
    return response.data;
  }  catch (error: any) {
    logger.error("Error adding payment Account:", error.message);
    return null;
  }
}

export const getAllPaymentAccounts = async () => {
  try {
    const response = await axiosClient.get('/payment-accounts');
    return response.data;
  } catch (error: any) {
    logger.error("Error fetching payment accounts:", error.message);
    return [];
  } 
}

export const deletePaymentAccount = async (id: string): Promise<boolean> => {
  try {
    const response = await axiosClient.delete(`/payment-accounts/${id}`);
    if (response.status !== 200) {
     logger.error("Failed to delete payment Account:", response.statusText);
     return false;
    }
    logger.info("Payment Account deleted successfully:", response.data);
    return true;
  } catch (error: any) {
    logger.error("Error deleting payment Account:", error.message);
    return false;
  }
}

export const updatePaymentAccount = async (id: string, paymentAccount: PaymentAccount): Promise<PaymentAccount | null> => {
  try {
    const response = await axiosClient.put(`/payment-accounts/${id}`, paymentAccount);
    return response.data;
  } catch (error: any) {
    logger.error("Error updating payment Account:", error.message);
    return null;
  } 
}

export const getSinglePaymentAccounts = async (id: string) => {
  try {
    const response = await axiosClient.get(`/payment-accounts/${id}`);
    return response.data;
  } catch (error: any) {
    logger.error("Error fetching payment Accounts:", error.message);
    return [];
  } 
}