import { InvoicesTable } from '../InvoicesTable';

export default function InvoicesTableExample() {
  //todo: remove mock functionality
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

  return <InvoicesTable invoices={mockInvoices} />;
}
