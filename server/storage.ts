import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { eq, desc, sql, and, gte, sum, count } from "drizzle-orm";
import ws from "ws";
import {
  vendors,
  customers,
  invoices,
  lineItems,
  payments,
  type Vendor,
  type Customer,
  type Invoice,
  type LineItem,
  type Payment,
  type InsertVendor,
  type InsertCustomer,
  type InsertInvoice,
  type InsertLineItem,
  type InsertPayment,
} from "@shared/schema";

neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool);

export interface IStorage {
  // Vendor operations
  createVendor(vendor: InsertVendor): Promise<Vendor>;
  getVendorById(id: number): Promise<Vendor | undefined>;
  getVendorByName(name: string): Promise<Vendor | undefined>;
  getAllVendors(): Promise<Vendor[]>;

  // Customer operations
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  getCustomerById(id: number): Promise<Customer | undefined>;

  // Invoice operations
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  getInvoiceById(id: number): Promise<Invoice | undefined>;
  getAllInvoices(limit?: number, offset?: number): Promise<Invoice[]>;
  searchInvoices(searchTerm: string): Promise<Invoice[]>;
  updateInvoiceStatus(id: number, status: string): Promise<Invoice | undefined>;

  // Line item operations
  createLineItem(lineItem: InsertLineItem): Promise<LineItem>;
  getLineItemsByInvoiceId(invoiceId: number): Promise<LineItem[]>;

  // Payment operations
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPaymentsByInvoiceId(invoiceId: number): Promise<Payment[]>;

  // Analytics operations
  getStats(): Promise<{
    totalSpend: number;
    totalInvoices: number;
    documentsUploaded: number;
    averageInvoiceValue: number;
  }>;
  getInvoiceTrends(): Promise<Array<{ month: string; invoiceCount: number; totalValue: number }>>;
  getTopVendors(limit: number): Promise<Array<{ vendor: string; spend: number }>>;
  getCategorySpend(): Promise<Array<{ category: string; spend: number }>>;
  getCashOutflow(): Promise<Array<{ period: string; amount: number }>>;
}

export class DbStorage implements IStorage {
  // Vendor operations
  async createVendor(vendor: InsertVendor): Promise<Vendor> {
    const [result] = await db.insert(vendors).values(vendor).returning();
    return result;
  }

  async getVendorById(id: number): Promise<Vendor | undefined> {
    const [result] = await db.select().from(vendors).where(eq(vendors.id, id));
    return result;
  }

  async getVendorByName(name: string): Promise<Vendor | undefined> {
    const [result] = await db.select().from(vendors).where(eq(vendors.name, name));
    return result;
  }

  async getAllVendors(): Promise<Vendor[]> {
    return await db.select().from(vendors);
  }

  // Customer operations
  async createCustomer(customer: InsertCustomer): Promise<Customer> {
    const [result] = await db.insert(customers).values(customer).returning();
    return result;
  }

  async getCustomerById(id: number): Promise<Customer | undefined> {
    const [result] = await db.select().from(customers).where(eq(customers.id, id));
    return result;
  }

  // Invoice operations
  async createInvoice(invoice: InsertInvoice): Promise<Invoice> {
    const [result] = await db.insert(invoices).values(invoice).returning();
    return result;
  }

  async getInvoiceById(id: number): Promise<Invoice | undefined> {
    const [result] = await db.select().from(invoices).where(eq(invoices.id, id));
    return result;
  }

  async getAllInvoices(limit: number = 100, offset: number = 0): Promise<Invoice[]> {
    return await db
      .select()
      .from(invoices)
      .orderBy(desc(invoices.invoiceDate))
      .limit(limit)
      .offset(offset);
  }

  async searchInvoices(searchTerm: string): Promise<Invoice[]> {
    const pattern = `%${searchTerm}%`;
    return await db
      .select()
      .from(invoices)
      .where(sql`${invoices.invoiceNumber} ILIKE ${pattern}`)
      .orderBy(desc(invoices.invoiceDate));
  }

  async updateInvoiceStatus(id: number, status: string): Promise<Invoice | undefined> {
    const [result] = await db
      .update(invoices)
      .set({ status })
      .where(eq(invoices.id, id))
      .returning();
    return result;
  }

  // Line item operations
  async createLineItem(lineItem: InsertLineItem): Promise<LineItem> {
    const [result] = await db.insert(lineItems).values(lineItem).returning();
    return result;
  }

  async getLineItemsByInvoiceId(invoiceId: number): Promise<LineItem[]> {
    return await db.select().from(lineItems).where(eq(lineItems.invoiceId, invoiceId));
  }

  // Payment operations
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [result] = await db.insert(payments).values(payment).returning();
    return result;
  }

  async getPaymentsByInvoiceId(invoiceId: number): Promise<Payment[]> {
    return await db.select().from(payments).where(eq(payments.invoiceId, invoiceId));
  }

  // Analytics operations
  async getStats(): Promise<{
    totalSpend: number;
    totalInvoices: number;
    documentsUploaded: number;
    averageInvoiceValue: number;
  }> {
    const currentYear = new Date().getFullYear();
    const yearStart = `${currentYear}-01-01`;

    const [stats] = await db
      .select({
        totalSpend: sum(invoices.totalAmount),
        totalInvoices: count(),
        avgInvoiceValue: sql<number>`AVG(${invoices.totalAmount})`,
      })
      .from(invoices)
      .where(gte(invoices.invoiceDate, yearStart));

    return {
      totalSpend: Number(stats?.totalSpend || 0),
      totalInvoices: Number(stats?.totalInvoices || 0),
      documentsUploaded: Number(stats?.totalInvoices || 0),
      averageInvoiceValue: Number(stats?.avgInvoiceValue || 0),
    };
  }

  async getInvoiceTrends(): Promise<Array<{ month: string; invoiceCount: number; totalValue: number }>> {
    const results = await db
      .select({
        month: sql<string>`TO_CHAR(${invoices.invoiceDate}, 'Mon')`,
        invoiceCount: count(),
        totalValue: sum(invoices.totalAmount),
      })
      .from(invoices)
      .groupBy(sql`TO_CHAR(${invoices.invoiceDate}, 'Mon')`, sql`EXTRACT(MONTH FROM ${invoices.invoiceDate})`)
      .orderBy(sql`EXTRACT(MONTH FROM ${invoices.invoiceDate})`);

    return results.map((r) => ({
      month: r.month,
      invoiceCount: Number(r.invoiceCount),
      totalValue: Number(r.totalValue || 0),
    }));
  }

  async getTopVendors(limit: number = 10): Promise<Array<{ vendor: string; spend: number }>> {
    const results = await db
      .select({
        vendor: vendors.name,
        spend: sum(invoices.totalAmount),
      })
      .from(invoices)
      .innerJoin(vendors, eq(invoices.vendorId, vendors.id))
      .groupBy(vendors.name)
      .orderBy(desc(sum(invoices.totalAmount)))
      .limit(limit);

    return results.map((r) => ({
      vendor: r.vendor,
      spend: Number(r.spend || 0),
    }));
  }

  async getCategorySpend(): Promise<Array<{ category: string; spend: number }>> {
    const results = await db
      .select({
        category: invoices.category,
        spend: sum(invoices.totalAmount),
      })
      .from(invoices)
      .where(sql`${invoices.category} IS NOT NULL`)
      .groupBy(invoices.category)
      .orderBy(desc(sum(invoices.totalAmount)));

    return results.map((r) => ({
      category: r.category || "Uncategorized",
      spend: Number(r.spend),
    }));
  }

  async getCashOutflow(): Promise<Array<{ period: string; amount: number }>> {
    const results = await db
      .select({
        period: sql<string>`TO_CHAR(${invoices.dueDate}, 'Week W')`,
        amount: sum(invoices.totalAmount),
      })
      .from(invoices)
      .where(
        and(
          sql`${invoices.dueDate} >= CURRENT_DATE`,
          sql`${invoices.dueDate} <= CURRENT_DATE + INTERVAL '4 weeks'`
        )
      )
      .groupBy(sql`TO_CHAR(${invoices.dueDate}, 'Week W')`, sql`EXTRACT(WEEK FROM ${invoices.dueDate})`)
      .orderBy(sql`EXTRACT(WEEK FROM ${invoices.dueDate})`);

    return results.map((r) => ({
      period: r.period,
      amount: Number(r.amount || 0),
    }));
  }
}

export const storage = new DbStorage();
