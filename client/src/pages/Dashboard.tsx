import { OverviewCards } from "@/components/OverviewCards";
import { InvoiceTrendChart } from "@/components/InvoiceTrendChart";
import { VendorSpendChart } from "@/components/VendorSpendChart";
import { CategorySpendChart } from "@/components/CategorySpendChart";
import { CashOutflowChart } from "@/components/CashOutflowChart";
import { InvoicesTable } from "@/components/InvoicesTable";

export default function Dashboard() {
  //todo: remove mock functionality
  const mockTrendData = [
    { month: 'Jan', invoiceCount: 42, totalValue: 105 },
    { month: 'Feb', invoiceCount: 38, totalValue: 98 },
    { month: 'Mar', invoiceCount: 51, totalValue: 132 },
    { month: 'Apr', invoiceCount: 45, totalValue: 115 },
    { month: 'May', invoiceCount: 58, totalValue: 148 },
    { month: 'Jun', invoiceCount: 62, totalValue: 162 },
  ];

  const mockVendorData = [
    { vendor: 'Acme Corp', spend: 245 },
    { vendor: 'Tech Solutions Inc', spend: 198 },
    { vendor: 'Global Supplies', spend: 167 },
    { vendor: 'Office Depot', spend: 142 },
    { vendor: 'Cloud Services Ltd', spend: 128 },
    { vendor: 'Manufacturing Co', spend: 115 },
    { vendor: 'Logistics Plus', spend: 98 },
    { vendor: 'IT Services Pro', spend: 87 },
    { vendor: 'Marketing Agency', spend: 76 },
    { vendor: 'Consulting Group', spend: 64 },
  ];

  const mockCategoryData = [
    { category: 'IT & Software', spend: 425 },
    { category: 'Office Supplies', spend: 312 },
    { category: 'Professional Services', spend: 268 },
    { category: 'Manufacturing', spend: 189 },
    { category: 'Logistics', spend: 156 },
  ];

  const mockCashOutflowData = [
    { period: 'Week 1', amount: 68 },
    { period: 'Week 2', amount: 92 },
    { period: 'Week 3', amount: 75 },
    { period: 'Week 4', amount: 88 },
  ];

  const mockInvoices = [
    { id: '1', vendor: 'Acme Corp', date: '2024-01-15', invoiceNumber: 'INV-2024-001', amount: 15420, status: 'paid' as const },
    { id: '2', vendor: 'Tech Solutions Inc', date: '2024-01-18', invoiceNumber: 'INV-2024-002', amount: 8950, status: 'paid' as const },
    { id: '3', vendor: 'Global Supplies', date: '2024-01-22', invoiceNumber: 'INV-2024-003', amount: 12300, status: 'pending' as const },
    { id: '4', vendor: 'Office Depot', date: '2024-01-25', invoiceNumber: 'INV-2024-004', amount: 4250, status: 'overdue' as const },
    { id: '5', vendor: 'Cloud Services Ltd', date: '2024-02-01', invoiceNumber: 'INV-2024-005', amount: 22100, status: 'paid' as const },
    { id: '6', vendor: 'Manufacturing Co', date: '2024-02-05', invoiceNumber: 'INV-2024-006', amount: 18700, status: 'pending' as const },
    { id: '7', vendor: 'Logistics Plus', date: '2024-02-10', invoiceNumber: 'INV-2024-007', amount: 9450, status: 'paid' as const },
    { id: '8', vendor: 'IT Services Pro', date: '2024-02-14', invoiceNumber: 'INV-2024-008', amount: 6800, status: 'pending' as const },
  ];

  return (
    <div className="p-8 max-w-screen-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Analytics Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Monitor your invoice data and spending patterns
        </p>
      </div>

      <div className="space-y-8">
        <OverviewCards
          totalSpend={1250000}
          totalInvoices={486}
          documentsUploaded={520}
          averageInvoiceValue={2572}
        />

        <InvoiceTrendChart data={mockTrendData} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <VendorSpendChart data={mockVendorData} />
          <CategorySpendChart data={mockCategoryData} />
        </div>

        <CashOutflowChart data={mockCashOutflowData} />

        <div>
          <h2 className="text-lg font-medium mb-4">Recent Invoices</h2>
          <InvoicesTable invoices={mockInvoices} />
        </div>
      </div>
    </div>
  );
}
