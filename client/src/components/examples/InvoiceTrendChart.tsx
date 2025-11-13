import { InvoiceTrendChart } from '../InvoiceTrendChart';

export default function InvoiceTrendChartExample() {
  //todo: remove mock functionality
  const mockData = [
    { month: 'Jan', invoiceCount: 42, totalValue: 105 },
    { month: 'Feb', invoiceCount: 38, totalValue: 98 },
    { month: 'Mar', invoiceCount: 51, totalValue: 132 },
    { month: 'Apr', invoiceCount: 45, totalValue: 115 },
    { month: 'May', invoiceCount: 58, totalValue: 148 },
    { month: 'Jun', invoiceCount: 62, totalValue: 162 },
  ];

  return <InvoiceTrendChart data={mockData} />;
}
