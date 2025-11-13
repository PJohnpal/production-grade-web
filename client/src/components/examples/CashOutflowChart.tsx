import { CashOutflowChart } from '../CashOutflowChart';

export default function CashOutflowChartExample() {
  //todo: remove mock functionality
  const mockData = [
    { period: 'Week 1', amount: 68 },
    { period: 'Week 2', amount: 92 },
    { period: 'Week 3', amount: 75 },
    { period: 'Week 4', amount: 88 },
  ];

  return <CashOutflowChart data={mockData} />;
}
