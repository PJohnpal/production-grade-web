export interface StatsResponse {
  totalSpend: number;
  totalInvoices: number;
  documentsUploaded: number;
  averageInvoiceValue: number;
}

export interface TrendData {
  month: string;
  invoiceCount: number;
  totalValue: number;
}

export interface VendorData {
  vendor: string;
  spend: number;
}

export interface CategoryData {
  category: string;
  spend: number;
}

export interface CashOutflowData {
  period: string;
  amount: number;
}

export interface InvoiceData {
  id: string;
  vendor: string;
  date: string;
  invoiceNumber: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
}

export interface ChatResponse {
  query: string;
  sql: string;
  results: any[];
  message: string;
}
