import { VendorSpendChart } from '../VendorSpendChart';

export default function VendorSpendChartExample() {
  //todo: remove mock functionality
  const mockData = [
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

  return <VendorSpendChart data={mockData} />;
}
