
export interface PaymentMethodType {
  _id?: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface PaymentAccount {
  _id?: string;
  bank_name: string;
  account_number: string;
  account_name: string;
}

export enum TradeModeEnum {
  Buy = "Buy",
  Sell = "Sell"
}