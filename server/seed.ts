import { storage } from "./storage";

const vendorNames = [
  "Acme Corp",
  "Tech Solutions Inc",
  "Global Supplies",
  "Office Depot",
  "Cloud Services Ltd",
  "Manufacturing Co",
  "Logistics Plus",
  "IT Services Pro",
  "Marketing Agency",
  "Consulting Group",
  "Software Systems",
  "Data Analytics LLC",
];

const categories = [
  "IT & Software",
  "Office Supplies",
  "Professional Services",
  "Manufacturing",
  "Logistics",
];

const statuses = ["paid", "pending", "overdue"];

function randomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split("T")[0];
}

function randomAmount(min: number, max: number): string {
  return (Math.random() * (max - min) + min).toFixed(2);
}

export async function seedDatabase() {
  console.log("Starting database seed...");

  try {
    // Create vendors
    const vendorIds: number[] = [];
    for (const name of vendorNames) {
      const vendor = await storage.createVendor({
        name,
        email: `contact@${name.toLowerCase().replace(/\s+/g, "")}.com`,
        phone: `+1-555-${Math.floor(Math.random() * 9000) + 1000}`,
        address: `${Math.floor(Math.random() * 9000) + 1000} Business St, NY`,
      });
      vendorIds.push(vendor.id);
      console.log(`Created vendor: ${name}`);
    }

    // Create a customer
    const customer = await storage.createCustomer({
      name: "My Company Inc",
      email: "accounts@mycompany.com",
      phone: "+1-555-0100",
      address: "123 Main St, New York, NY 10001",
    });
    console.log("Created customer");

    // Create invoices
    const startDate = new Date(2024, 0, 1);
    const endDate = new Date(2024, 5, 30);
    const invoiceCount = 50;

    for (let i = 1; i <= invoiceCount; i++) {
      const vendorId = vendorIds[Math.floor(Math.random() * vendorIds.length)];
      const invoiceDate = randomDate(startDate, endDate);
      const dueDate = randomDate(new Date(invoiceDate), new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
      const totalAmount = randomAmount(1000, 50000);
      const taxAmount = (parseFloat(totalAmount) * 0.08).toFixed(2);
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const category = categories[Math.floor(Math.random() * categories.length)];

      const invoice = await storage.createInvoice({
        invoiceNumber: `INV-2024-${String(i).padStart(4, "0")}`,
        vendorId,
        customerId: customer.id,
        invoiceDate,
        dueDate,
        totalAmount,
        taxAmount,
        status,
        category,
        description: `Invoice for ${category} services`,
      });

      // Create 1-3 line items for each invoice
      const numLineItems = Math.floor(Math.random() * 3) + 1;
      const lineItemTotal = parseFloat(totalAmount) - parseFloat(taxAmount);
      
      for (let j = 0; j < numLineItems; j++) {
        const quantity = Math.floor(Math.random() * 10) + 1;
        const unitPrice = (lineItemTotal / (numLineItems * quantity)).toFixed(2);
        const totalPrice = (parseFloat(unitPrice) * quantity).toFixed(2);

        await storage.createLineItem({
          invoiceId: invoice.id,
          description: `Service item ${j + 1}`,
          quantity: quantity.toString(),
          unitPrice,
          totalPrice,
        });
      }

      // Create payment for paid invoices
      if (status === "paid") {
        await storage.createPayment({
          invoiceId: invoice.id,
          paymentDate: randomDate(new Date(invoiceDate), new Date()),
          amount: totalAmount,
          paymentMethod: "Wire Transfer",
          transactionId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        });
      }

      if (i % 10 === 0) {
        console.log(`Created ${i} invoices...`);
      }
    }

    console.log(`✓ Database seeded successfully with ${invoiceCount} invoices!`);
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Run seed
seedDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
