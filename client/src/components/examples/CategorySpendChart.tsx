import { CategorySpendChart } from '../CategorySpendChart';

export default function CategorySpendChartExample() {
  //todo: remove mock functionality
  const mockData = [
    { category: 'IT & Software', spend: 425 },
    { category: 'Office Supplies', spend: 312 },
    { category: 'Professional Services', spend: 268 },
    { category: 'Manufacturing', spend: 189 },
    { category: 'Logistics', spend: 156 },
  ];

  return <CategorySpendChart data={mockData} />;
}
