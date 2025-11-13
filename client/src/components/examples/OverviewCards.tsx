import { OverviewCards } from '../OverviewCards';

export default function OverviewCardsExample() {
  return (
    <OverviewCards
      totalSpend={1250000}
      totalInvoices={486}
      documentsUploaded={520}
      averageInvoiceValue={2572}
    />
  );
}
