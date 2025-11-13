import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const invoicesQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(1000).default(100),
  offset: z.coerce.number().int().min(0).default(0),
  search: z.string().max(200).optional(),
});

const chatQuerySchema = z.object({
  query: z.string().min(1).max(1000),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Analytics endpoints
  app.get("/api/stats", async (_req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.get("/api/invoice-trends", async (_req, res) => {
    try {
      const trends = await storage.getInvoiceTrends();
      res.json(trends);
    } catch (error) {
      console.error("Error fetching invoice trends:", error);
      res.status(500).json({ error: "Failed to fetch invoice trends" });
    }
  });

  app.get("/api/vendors/top10", async (_req, res) => {
    try {
      const vendors = await storage.getTopVendors(10);
      res.json(vendors);
    } catch (error) {
      console.error("Error fetching top vendors:", error);
      res.status(500).json({ error: "Failed to fetch top vendors" });
    }
  });

  app.get("/api/category-spend", async (_req, res) => {
    try {
      const categories = await storage.getCategorySpend();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching category spend:", error);
      res.status(500).json({ error: "Failed to fetch category spend" });
    }
  });

  app.get("/api/cash-outflow", async (_req, res) => {
    try {
      const cashOutflow = await storage.getCashOutflow();
      res.json(cashOutflow);
    } catch (error) {
      console.error("Error fetching cash outflow:", error);
      res.status(500).json({ error: "Failed to fetch cash outflow" });
    }
  });

  app.get("/api/invoices", async (req, res) => {
    try {
      const validation = invoicesQuerySchema.safeParse(req.query);
      
      if (!validation.success) {
        return res.status(400).json({ error: "Invalid query parameters", details: validation.error });
      }

      const { limit, offset, search } = validation.data;

      let invoices;
      if (search) {
        invoices = await storage.searchInvoices(search);
      } else {
        invoices = await storage.getAllInvoices(limit, offset);
      }

      // Join with vendor data
      const enrichedInvoices = await Promise.all(
        invoices.map(async (invoice) => {
          const vendor = await storage.getVendorById(invoice.vendorId);
          return {
            id: invoice.id.toString(),
            vendor: vendor?.name || "Unknown",
            date: invoice.invoiceDate,
            invoiceNumber: invoice.invoiceNumber,
            amount: parseFloat(invoice.totalAmount),
            status: invoice.status as "paid" | "pending" | "overdue",
          };
        })
      );

      res.json(enrichedInvoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      res.status(500).json({ error: "Failed to fetch invoices" });
    }
  });

  app.get("/api/vendors", async (_req, res) => {
    try {
      const vendors = await storage.getAllVendors();
      res.json(vendors);
    } catch (error) {
      console.error("Error fetching vendors:", error);
      res.status(500).json({ error: "Failed to fetch vendors" });
    }
  });

  // Chat with data endpoint - placeholder for now, will connect to Vanna AI
  app.post("/api/chat-with-data", async (req, res) => {
    try {
      const validation = chatQuerySchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ error: "Invalid request body", details: validation.error });
      }

      const { query } = validation.data;

      // TODO: This will be replaced with actual Vanna AI integration
      // For now, return a mock response
      res.json({
        query,
        sql: "SELECT vendor, SUM(amount) as total_spend\nFROM invoices\nWHERE date >= CURRENT_DATE - INTERVAL '90 days'\nGROUP BY vendor\nORDER BY total_spend DESC\nLIMIT 5;",
        results: [
          { vendor: "Acme Corp", total_spend: 245000 },
          { vendor: "Tech Solutions Inc", total_spend: 198000 },
          { vendor: "Global Supplies", total_spend: 167000 },
        ],
        message: "I've analyzed your query and generated the SQL to retrieve the data.",
      });
    } catch (error) {
      console.error("Error processing chat query:", error);
      res.status(500).json({ error: "Failed to process chat query" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
