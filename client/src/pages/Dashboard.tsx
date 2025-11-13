import { useQuery } from "@tanstack/react-query";
import { OverviewCards } from "@/components/OverviewCards";
import { InvoiceTrendChart } from "@/components/InvoiceTrendChart";
import { VendorSpendChart } from "@/components/VendorSpendChart";
import { CategorySpendChart } from "@/components/CategorySpendChart";
import { CashOutflowChart } from "@/components/CashOutflowChart";
import { InvoicesTable } from "@/components/InvoicesTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import type {
  StatsResponse,
  TrendData,
  VendorData,
  CategoryData,
  CashOutflowData,
  InvoiceData,
} from "@/types/api";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery<StatsResponse>({
    queryKey: ["/api/stats"],
  });

  const { data: trends, isLoading: trendsLoading, error: trendsError } = useQuery<TrendData[]>({
    queryKey: ["/api/invoice-trends"],
  });

  const { data: topVendors, isLoading: vendorsLoading, error: vendorsError } = useQuery<VendorData[]>({
    queryKey: ["/api/vendors/top10"],
  });

  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery<CategoryData[]>({
    queryKey: ["/api/category-spend"],
  });

  const { data: cashOutflow, isLoading: cashOutflowLoading, error: cashOutflowError } = useQuery<CashOutflowData[]>({
    queryKey: ["/api/cash-outflow"],
  });

  const { data: invoices, isLoading: invoicesLoading, error: invoicesError } = useQuery<InvoiceData[]>({
    queryKey: ["/api/invoices"],
  });

  const hasError = statsError || trendsError || vendorsError || categoriesError || cashOutflowError || invoicesError;

  return (
    <div className="p-8 max-w-screen-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Analytics Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Monitor your invoice data and spending patterns
        </p>
      </div>

      {hasError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading data</AlertTitle>
          <AlertDescription>
            Some data failed to load. Please refresh the page or contact support if the issue persists.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-8">
        {statsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        ) : stats ? (
          <OverviewCards
            totalSpend={stats.totalSpend}
            totalInvoices={stats.totalInvoices}
            documentsUploaded={stats.documentsUploaded}
            averageInvoiceValue={stats.averageInvoiceValue}
          />
        ) : null}

        {trendsLoading ? (
          <Skeleton className="h-96" />
        ) : trends && trends.length > 0 ? (
          <InvoiceTrendChart data={trends} />
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {vendorsLoading ? (
            <Skeleton className="h-96" />
          ) : topVendors && topVendors.length > 0 ? (
            <VendorSpendChart data={topVendors} />
          ) : null}

          {categoriesLoading ? (
            <Skeleton className="h-96" />
          ) : categories && categories.length > 0 ? (
            <CategorySpendChart data={categories} />
          ) : null}
        </div>

        {cashOutflowLoading ? (
          <Skeleton className="h-96" />
        ) : cashOutflow && cashOutflow.length > 0 ? (
          <CashOutflowChart data={cashOutflow} />
        ) : null}

        <div>
          <h2 className="text-lg font-medium mb-4">Recent Invoices</h2>
          {invoicesLoading ? (
            <Skeleton className="h-96" />
          ) : invoices && invoices.length > 0 ? (
            <InvoicesTable invoices={invoices} />
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>No invoices found</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
